import dbConnection from "@/db/dbConnection";
import User from '@/models/userModel'
import {NextRequest,NextResponse} from 'next/server'
dbConnection();

export async function POST(request:NextRequest) {
    try {
        const reqBoody =  await request.json() 
        const {token} = reqBoody;
        console.log(token)
       const user =  await User.findOne({verifyToken:token,verifiTokenExpiry:{$gt:new Date()}})
       if(!user){
        return NextResponse.json({ error:'invalid token'},
            {status:400}
           )
       }

       user.isVerifiend=true
       user.verifyToken=undefined
       user.verifiTokenExpiry=undefined
       await user.save()

       return NextResponse.json({ message:"User Verified Successfully" },
            {status:400}
           )
    } catch (error:any) {
        return NextResponse.json({ error:error.message},
            {status:500}
           )
    }
}
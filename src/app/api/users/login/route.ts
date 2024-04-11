import dbConnection from "@/db/dbConnection";
import User from '@/models/userModel'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'

import jwt from 'jsonwebtoken'

dbConnection();

export async function POST(req:NextRequest) {
    try {
        const reqBody = await req.json()
        const {email,password}=reqBody;
        console.log(req.body)
        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({ error:'user does not exist.'},
                {status:400}
               )
        }
        const  isPasswordValid=await bcryptjs.compare(password,user.password)
        if (!isPasswordValid) {
            return NextResponse.json({ error:'check your credentials.'},
                {status:400}
               )
        }

        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }
       const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1h'})
      const response =  NextResponse.json({
        success:true,
        message:"Logged In success"
       })
       response.cookies.set("token",token,{
        httpOnly:true
       })

       return response
    } catch (error:any) {
        return NextResponse.json({ error:error.message},
            {status:500}
           )
    }
}
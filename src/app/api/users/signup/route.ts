import dbConnection from "@/db/dbConnection";
import User from '@/models/userModel'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import sendEmail from "@/helpers/nodeMailer";
dbConnection();

export async function POST(req:NextRequest,res: NextResponse) {
  try {
   
  const reqBody =  await req.json();
  const {username,email,password}:any=reqBody
 
  if(!username || !email || !password){
    return NextResponse.json({
        success:false,
        message:"All fields are required"
    },{status:400})
  }

  console.log(password)

  const user = await User.findOne({email})
  if(user){
    return NextResponse.json(
        {error:"user already exists"},
        {status:400}
    )
  }
  const salt  = await bcryptjs.genSalt(10)
  const hashPassword = await bcryptjs.hash(password,salt)
 const newUser = await User.create({
    username,
    email,
   password: hashPassword
  })

 const saveUser =  await newUser.save()

 //send verification mail
    await sendEmail({email,emailType:"VERIFY",userId:saveUser._id})
    return NextResponse.json({
        message:'user register successfully',
        success:true,
        saveUser
    },)
  } catch (error:any) {
     return NextResponse.json({ error:error.message},
        {status:500}
       )
  } 
}
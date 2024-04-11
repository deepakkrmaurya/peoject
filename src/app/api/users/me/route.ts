import dbConnection from "@/db/dbConnection";
import User from '@/models/userModel'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'

import jwt from 'jsonwebtoken'
import { getDataFromToken } from "@/getDataFromToken/getData";

dbConnection();

export async function GET(req:NextRequest) {
    try {
        const userId =await getDataFromToken(req)
        const user = await User.findById(userId).select('-password')
        if (!user) {
             return NextResponse.json({
                success:false, 
                error:"User not found"
             })
        } 
        return NextResponse.json({
            success:true, 
            user
         })
    } catch (error:any) {
        return NextResponse.json({
            success:false, 
            error:error.message
         },{status:500})
    }
}
import dbConnection from "@/db/dbConnection";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'


dbConnection();

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const response = NextResponse.json({
            message: "logout successfully",
            success: true
        },
            { status: 500 }
        )
       
        response.cookies.set('token','',{
            httpOnly:true,
            expires: new Date(0)
        })
        return response
    } catch (error:any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}
'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
const VerifyEmailpage = () => {
    const [token,setToken]=useState('')
    const [verified,setverified]=useState(false)
    const [error,seterror]=useState(false)
    const verifiedUserEmail = async()=>{
       try {
        axios.post('/api/users/verifyemail',{token})
        setverified(true)
       } catch (error:any) {
        seterror(true)
        console.log(error.response.data)
       }
    }

    useEffect(()=>{
     const urlToken =  window.location.search.split("=")[1]
     setToken(urlToken || "")
    },[])

    useEffect(()=>{
        if(token.length>0){
            verifiedUserEmail()
        }
    },[token])
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen py-2'>
       <h1 className=' text-4xl'>verify Email</h1>
       <h1 className=' py-1 px-2 bg-orange-500 text-2xl text-black mt-3'>
        {token ? `${token}`: "No token"}
       </h1>
       {
        verified && (
            <div>
                <h1 className=' mt-2 text-orange-500'>Verification Successful!</h1>
                <Link className=' px-3 py-1 mt-2 inline-block border  ' href='/login'>Login</Link>
            </div>
        )
       }
       {
        error && (
            <div>
                <h1>Error</h1>
            </div>
        )
       }
    </div>
  )
}

export default VerifyEmailpage

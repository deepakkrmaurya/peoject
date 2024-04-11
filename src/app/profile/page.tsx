'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import Link from 'next/link'

const ProfilePage = () => {
   
    const [data,setdata]=useState('nothing')
    const getUserData = async()=>{
     const res =  await axios.get('/api/users/me')
     console.log(res.data.user)
     setdata(res.data.user._id)
    }

    const logout = async()=>{
        try {
            await axios.get('/api/users/logout')
            toast.success( "Logged out successfully")
            // router.push("/login")
        } catch (error:any) {
            toast.error(error.message)
        }
    }
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen bg-gray-600'>
      <h1>profile</h1><hr/>
      <h2>{data==='nothing'?"Nothing": <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button onClick={logout} className=' border mt-4 px-8 py-1'>Logout</button>
      <button onClick={getUserData} className=' border mt-4 px-8 py-1'>get User Details</button>
    </div>
  )
}

export default ProfilePage

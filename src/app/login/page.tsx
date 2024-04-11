'use client'
 
import { useRouter } from 'next/navigation'
import axios from "axios";
import Link from "next/link";

import React, {  useEffect } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter()
  const [user, setuser] = React.useState({
      email: "",
      password: "",
     
  })

  const [buttonDisabled, setDisabled] = React.useState(false)
  const [loading, setloading] = React.useState(false)
  const onLogin = async () => {
      try {
          setloading(true)
          const res = await axios.post('/api/users/login', user)
          console.log('signup success', res.data)
          router.push("/profile")
          toast.success("Login Successfully")
      } catch (error: any) {
          console.log('signup failed' + error)
          toast.error(error.message)
      }
  }
  useEffect(() => {
      if (user.email.length > 0 && user.password.length > 0) {
          setDisabled(false)
      } else {
          setDisabled(true)
      }
  }, [user])
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen bg-gray-600'>
            <h1 className=' text-2xl text-orange-500 font-semibold'>{loading ? 'Wait Login....' : "Login"}</h1>
            <div>
                <label htmlFor="">email:</label><br />
                <input type="text"
                    value={user.email}
                    onChange={(e) => { setuser({ ...user, email: e.target.value }) }}
                    className=' py-1 px-2 rounded text-black outline-none' placeholder='username' />
            </div>
            <div>
                <label htmlFor="">password:</label><br />
                <input type="text"
                    value={user.password}
                    onChange={(e) => { setuser({ ...user, password: e.target.value }) }}
                    className=' py-1 px-2 rounded text-black outline-none' placeholder='username' />
            </div>

            <button onClick={onLogin} className=' border mt-4 px-8 py-1'>{buttonDisabled ? "No Login":"Login"}</button>
            <Link href='/signup'>visit signup page</Link>
        </div>
  )
}

export default LoginPage 


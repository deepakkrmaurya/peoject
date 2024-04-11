'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignupPage = () => {
    const router = useRouter()
    const [user, setuser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setDisabled] = useState(false)
    const [loading, setloading] = useState(false)
    const onSignup = async () => {
        try {
            setloading(true)
            const res = await axios.post('/api/users/signup', user)
            console.log('signup success', res.data)
            router.push("/login")
            toast.success("Account Created Successfully! Please Login Now.")
        } catch (error: any) {
            console.log('signup failed' + error)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [user])
    return (
        <div className=' flex flex-col items-center justify-center min-h-screen bg-gray-600'>
            <h1>{loading ? 'processing' : "Create Account"}</h1>
            {/* <SlInput label="What is your name?" /> */}
            <div>
                <label htmlFor="">username:</label><br />
                <input type="text"
                    value={user.username}
                    onChange={(e) => { setuser({ ...user, username: e.target.value }) }}
                    className=' py-1 px-2 rounded text-black outline-none' placeholder='username' />
            </div>
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

            <button onClick={onSignup} className=' border mt-4 px-8 py-1'>{buttonDisabled ? "No Signup":"Signup"}</button>
            <Link href='/login'>visit login page</Link>
        </div>
    )
}

export default SignupPage

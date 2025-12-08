"use client"

import { redirect } from 'next/navigation'
import { loginAction } from '../actions/auth'
import React, { useState } from 'react'

const LoginForm = () => {
    const [ unknownError, setUnknownError ] = useState(null)
    const [ emailError, setEmailError ] = useState(null)
    const [ passwordError, setPasswordError ] = useState(null)

    const handleLogin = async (formData) => {
        setEmailError(null)
        setPasswordError(null)
        setUnknownError(null)

        const res = await loginAction({
            email: formData.get("email"),
            password: formData.get("password")
        })

        if (res.status) {
            redirect("/")
        } else {
            if(res.errorType == 'email') {
                setEmailError(res.message)
            }
            else if(res.errorType == 'password') {
                setPasswordError(res.message)
            }
            else {
                setUnknownError(res.message)
            }
        }
    }
  return (
    <form action={handleLogin} className='space-y-6'>
      <div>
        <label htmlFor="email"
        className={`text-[13px] ml-0.5 font-medium ${emailError || unknownError ? "text-red-600" : "text-black"}`}>
            {
                emailError ? emailError : unknownError ? unknownError : "Email"
            }
        </label>
        <input id='email' type="email" name='email' placeholder='Enter you email' required
        className='w-full mt-0.5 border-b border-b-gray-300 p-2 text-sm text-black focus:outline-none focus:border-b-black'  />
      </div>
      <div>
        <label htmlFor="password"
        className={`text-[13px] ml-0.5 text-black font-medium ${passwordError ? "text-red-600" : "text-black"}`}>
            {
                passwordError ? passwordError : "Password"
            }
        </label>
        <input id='password' type="password" name='password' placeholder='Enter your password' required
        className='w-full mt-0.5 border-b border-b-gray-300 p-2 text-sm text-black focus:outline-none focus:border-b-black'  />
      </div>
      <button type='submit' className='w-full text-white bg-blue-600 rounded-md py-2 cursor-pointer text-sm'>Login</button>
    </form>
  )
}

export default LoginForm

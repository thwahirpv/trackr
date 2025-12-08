"use client"

import React, { useState } from 'react'
import { registerAction } from '../actions/auth'
import { redirect } from 'next/navigation'


const RegisterForm = () => {
    const [ unknownError, setUnknownError ] = useState(null)
    const [ nameError, setNameError ] = useState(null)
    const [ emailError, setEmailError ] = useState(null)
    const [ passwordError, setPasswordError ] = useState(null)

    const handleResiter = async (formData) => {
        setNameError(null)
        setEmailError(null)
        setPasswordError(null)
        setUnknownError(null)

        if(formData.get('name').length < 3) {
            setNameError("Name must be at least 3 characters!")
            return
        }
        else if(formData.get('email').length > 4 && !formData.get('email').includes('@')) {
            setEmailError("Invalid Email Address!")
            return
        }
        else if(formData.get('password').length < 4 || formData.get('password').length > 8) {
            setPasswordError("Password must be between 4 and 8 characters!")
            return
        }

        const res = await registerAction({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        })

        if(res.status) {
            redirect("/login")
        }
        else {
            if(res.errorType == 'email') {
                setEmailError(res.message)
            }
            else {
                setUnknownError(res.message)
            }
        }
    }
  return (
    <form action={handleResiter} className='space-y-6'>
      <div>
        <label htmlFor="name"
        className={`text-[13px] ml-0.5 font-medium ${nameError || unknownError ? 'text-red-600' : 'text-black'}`}>
            {
                nameError ? nameError : unknownError ? unknownError : "Name"
            }
        </label>
        <input id='name' type="text" name='name' placeholder='Enter you name' required
        className='w-full mt-0.5 border-b border-b-gray-300 p-2 text-sm text-black focus:outline-none focus:border-b-black'  />
      </div>
      <div>
        <label htmlFor="email"
        className={`text-[13px] ml-0.5 font-medium ${emailError ? 'text-red-600' : 'text-black'}`}>
            {
                emailError ? emailError : "Email"
            }
        </label>
        <input id='email' type="email" name='email' placeholder='Enter you email' required
        className='w-full mt-0.5 border-b border-b-gray-300 p-2 text-sm text-black focus:outline-none focus:border-b-black'  />
      </div>
      <div>
        <label htmlFor="password"
        className={`text-[13px] ml-0.5 font-medium ${passwordError ? 'text-red-600' : 'text-black'}`}>
            {
                passwordError ? passwordError : "Password"
            }
        </label>
        <input id='password' type="password" name='password' placeholder='Enter your password' required
        className='w-full mt-0.5 border-b border-b-gray-300 p-2 text-sm text-black focus:outline-none focus:border-b-black'  />
      </div>
      <button type='submit' className='w-full text-white bg-blue-600 rounded-md py-2 cursor-pointer text-sm'>Register</button>
    </form>
  )
}

export default RegisterForm

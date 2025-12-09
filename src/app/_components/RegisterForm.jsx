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
            password: formData.get("password"),
            applicationGoal: formData.get("goal")
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
    <form action={handleResiter} className='space-y-4'>
      <div className="space-y-2">
        <label htmlFor="name"
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${nameError || unknownError ? 'text-destructive' : 'text-foreground'}`}>
            {
                nameError ? nameError : unknownError ? unknownError : "Name"
            }
        </label>
        <input 
            id='name' 
            type="text" 
            name='name' 
            placeholder='Enter your name' 
            required
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'  
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email"
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${emailError ? 'text-destructive' : 'text-foreground'}`}>
            {
                emailError ? emailError : "Email"
            }
        </label>
        <input 
            id='email' 
            type="email" 
            name='email' 
            placeholder='Enter your email' 
            required
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'  
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password"
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${passwordError ? 'text-destructive' : 'text-foreground'}`}>
            {
                passwordError ? passwordError : "Password"
            }
        </label>
        <input 
            id='password' 
            type="password" 
            name='password' 
            placeholder='Enter your password' 
            required
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'  
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="goal" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
            Monthly Application Goal
        </label>
        <input 
            id='goal' 
            type="number" 
            name='goal' 
            placeholder='e.g. 50' 
            defaultValue={50}
            min={1}
            required
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'  
        />
      </div>

      <button type='submit' className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-full mt-2 cursor-pointer'>
        Register
      </button>
    </form>
  )
}

export default RegisterForm

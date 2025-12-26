"use client"

import { redirect } from 'next/navigation'
import { loginAction } from '../actions/auth'
import React, { useState } from 'react'

const LoginForm = () => {
    const [ unknownError, setUnknownError ] = useState(null)
    const [ emailError, setEmailError ] = useState(null)
    const [ passwordError, setPasswordError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)
    const [email, setEmail] = useState('thwahirpv@gmail.com')
    const [password, setPassword] = useState('123456')

    const handleLogin = async (e) => {
        e.preventDefault()
        
        setIsLoading(true)

        setEmailError(null)
        setPasswordError(null)
        setUnknownError(null)

        if (!email) {
            setEmailError("Email is required")
            setIsLoading(false)
            return
        }

        if (!password) {
            setPasswordError("Password is required")
            setIsLoading(false)
            return
        }

        const res = await loginAction({
            email: email,
            password: password
        })

        if (res.status) {
            redirect("/")
        } else {
            setIsLoading(false)
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
    <form onSubmit={handleLogin} className='space-y-4'>
      <div className="space-y-2">
        <label htmlFor="email"
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${emailError || unknownError ? "text-red-500" : "text-foreground"}`}>
            {
                emailError ? emailError : unknownError ? unknownError : "Email"
            }
        </label>
        <input 
            id='email' 
            type="email" 
            name='email' 
            placeholder='Enter your email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'  
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password"
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${passwordError ? "text-red-500" : "text-foreground"}`}>
            {
                passwordError ? passwordError : "Password"
            }
        </label>
        <input 
            id='password' 
            type="password" 
            name='password' 
            placeholder='Enter your password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'  
        />
      </div>
      <button 
        type='submit' 
        disabled={isLoading}
        className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-full mt-2 cursor-pointer'
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}

export default LoginForm

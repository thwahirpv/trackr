import React from 'react'
import LoginForm from '@/app/_components/LoginForm'
import Link from 'next/link'
const Login = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-muted/40'>
      <div className='min-w-[360px] max-w-[400px] bg-card text-card-foreground rounded-lg border border-border px-6 py-6 shadow-sm space-y-6'>
        <div className="flex flex-col space-y-2 text-center">
            <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
            <p className="text-sm text-muted-foreground">
                Enter your details to access your dashboard
            </p>
        </div>
        <LoginForm />
        <div className='py-3'>
            <p className='text-sm text-muted-foreground text-center'>
                {"Don't have an account?"}
                <Link href="/register" className="ml-1 font-medium text-primary hover:underline">Register</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Login

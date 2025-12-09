import RegisterForm from '@/app/_components/RegisterForm'
import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-muted/40'>
      <div className='min-w-[360px] max-w-[400px] bg-card text-card-foreground rounded-lg border border-border px-6 py-6 shadow-sm space-y-6'>
         <div className="flex flex-col space-y-2 text-center">
            <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
            <p className="text-sm text-muted-foreground">
                Enter your information to get started
            </p>
        </div>
        <RegisterForm />
        <div className='py-3'>
            <p className='text-sm text-muted-foreground text-center'>
                {"I already have an account."}
                <Link href="/login" className="ml-1 font-medium text-primary hover:underline">Login</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Register

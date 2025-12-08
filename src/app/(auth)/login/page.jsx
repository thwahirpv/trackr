import React from 'react'
import LoginForm from '@/app/_components/LoginForm'
import Link from 'next/link'
const Login = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='min-w-[360px] max-w-[400px] bg-white rounded-md px-6 py-6 shadow-md space-y-9'>
        <h1 className='text-black font-bold text-2xl'>Login</h1>
        <LoginForm />
        <div className='py-3'>
            <p className='text-sm text-black text-center'>
                {"Don't have an account?"}
                <Link href="/register" className=" ml-1 text-sm hover:underline text-blue-500">Register.</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Login

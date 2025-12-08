import RegisterForm from '@/app/_components/RegisterForm'
import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='min-w-[360px] max-w-[400px] bg-white rounded-md px-6 py-6 shadow-md space-y-9'>
        <h1 className='text-black font-bold text-2xl'>Register</h1>
        <RegisterForm />
        <div className='py-3'>
            <p className='text-sm text-black text-center'>
                {"I already have an account."}
                <Link href="/login" className=" ml-1 text-sm hover:underline text-blue-500">Login.</Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Register

"use client"

import React from 'react'
import { logOutAction } from '../actions/auth'
import { redirect } from 'next/navigation'

const Logout = () => {
  const handleLogout = async () => {
    await logOutAction()
    redirect("/login")
  }

  return (
    <button 
    onClick={handleLogout}
    className='text-red-500 text-sm cursor-pointer'>
        Logout
    </button>
  )
}

export default Logout

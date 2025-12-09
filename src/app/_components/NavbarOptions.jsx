"use client"

import Link from 'next/link'
import React from 'react'
import { SlMenu } from "react-icons/sl";
import { GrClose } from "react-icons/gr";
import { useState } from 'react';
import Logout from './Logout';





const NavbarOptions = ({session}) => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div>
        <div>
            <Link href="/" className="flex flex-col">
                <span className="font-bold text-2xl tracking-tighter bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Trackr
                </span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest -mt-1">
                    Your journey to hired
                </span>
            </Link>
        </div>
      </div>
      <div className='block md:hidden'>
        <button 
        onClick={() => setIsOpen(!isOpen)}
        className='text-foreground transition-all duration-400 ease-in-out'>
            {
                isOpen ? <GrClose /> : <SlMenu />
            }
        </button>
      </div>
      <div className={`absolute md:static right-0 w-full md:w-auto ${isOpen ? "top-[64px] border-b border-border" : "-top-[400px]"} transition-all duration-300 ease-in-out z-10 bg-background md:bg-transparent`}>
        <div className='flex flex-col md:flex-row items-center gap-x-6 gap-y-4 p-6 md:p-0'> 
            <Link className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary' href='/login' >
                Login
            </Link>
            <Link className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full md:w-auto' href='/register' >
                Register
            </Link>
        </div>
      </div>
    </header>
  )
}

export default NavbarOptions

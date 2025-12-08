"use client"

import Link from 'next/link'
import React from 'react'
import { SlMenu } from "react-icons/sl";
import { GrClose } from "react-icons/gr";
import { useState } from 'react';
import Logout from './Logout';


const navOptions = [
    {
        key: 1004,
        name: "Contacts", 
        href: "/contacts", 
        isNeedAuth: true,
        isCurrent: false,
    },
    {
        key: 1001,
        name: "Login", 
        href: "/login", 
        isNeedAuth: false,
        isCurrent: false
    },
    {
        key: 1002,
        name: "Register",
        href: "/register",
        isNeedAuth: false,
        isCurrent: false,
    },  
    {
        key: 1003,
        name: "Logout",
        href : "/logout",
        isNeedAuth: true,
        isCurrent: false
    }, 
    
]


const NavbarOptions = ({session}) => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='flex flex-row  justify-between items-center h-[64px] w-full bg-white shadow-md px-8'>
      <div>
        <div>
            <Link  
            href="/"
            className='text-primary font-bold text-xl flex items-center'>
                <span className="mr-2">🚀</span> Trackr
            </Link>
        </div>
      </div>
      <div className='block md:hidden'>
        <button 
        onClick={() => setIsOpen(!isOpen)}
        className='text-black transition-all duration-400 ease-in-out'>
            {
                isOpen ? <GrClose /> : <SlMenu />
            }
        </button>
      </div>
      <div className={`absolute md:static right-8 ${isOpen ? "top-[80px]" : "-top-[100px]"} transition-all duration-400 ease-in-out z-10`}>
        <div className='flex flex-col md:flex-row gap-x-8 gap-y-4 md:gap-y-0 bg-white md:bg-transparent p-5 rounded-md'> 
            {
                session ? (
                    <>
                        <Logout />
                    </>
                ) : (
                    <>
                        <Link className='text-black text-sm cursor-pointer' href='/login' >
                            Login
                        </Link>
                        <Link className='text-black text-sm cursor-pointer' href='/register' >
                            Register
                        </Link>
                        
                    </>
                )
            }
        </div>
      </div>
    </div>
  )
}

export default NavbarOptions

import React from 'react'
import NavbarOptions from './NavbarOptions';
import { getSession } from '@/lib/session';


const Navbar = async () => {
    const session = await getSession()

    if (session) return null; // Hide legacy navbar for logged-in users who have Sidebar
    return (
    <NavbarOptions session={session} />
  )
}

export default Navbar

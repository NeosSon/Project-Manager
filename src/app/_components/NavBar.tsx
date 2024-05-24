"use client";
import React, { useState } from 'react'
import { getServerAuthSession } from '../../server/auth';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/trpc/react';
const NavBar =  () => {
    const [menuOpen, setmenuOpen] = useState(false)
    
    const session = api.user.getInfo.useQuery();
  return (
    <div>
        <nav className="flex justify-between p-4 w-full bg-slate-100 text-slate-950 items-center">
                <h1>Project Manager</h1>
            <div className='flex'>
            <Link href={session.data?.user ? "api/auth/signout" : "api/auth/signin"} className='hover:bg-slate-400 hover:rounded-lg p-4'>
                {session.data?.user ? "Sign out" : "Sign in"}
            </Link>
            <img src={session ? session.data?.image ?? '/user.png' : '/user.png'} width={50} height={50} className='rounded-full cursor-pointer' onClick={() => setmenuOpen(prev => !prev)}/>
            </div>
            {menuOpen && 
            <div className='absolute top-16 right-0 bg-slate-100 p-4 rounded-lg'>
                Hello
            </div>}
        </nav>
    </div>
  )
}

export default NavBar

import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'


async function Header() {

 const session = await getServerSession(authOptions)
 console.log("session header", session)

 return (
  <div className=' px-5 py-1 shadow-md flex justify-between'>
   <div className=" flex items-center gap-2">
    <Image src="/market.png" alt="Logo" width={80} height={80} />
    <DropdownMenu>
     <DropdownMenuTrigger asChild>
      <h2 className=' hidden md:flex gap-2 items-center border rounded-full p-2 px-6 bg-slate-200 cursor-pointer'>
       <LayoutGrid className=' w-5 h-5' />Menu
      </h2>
     </DropdownMenuTrigger>
     <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
       <Link href={"/dashboard"}>
        Dashboard
       </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
       <Link href={"/serverComponent"}>
        Server Component
       </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>...</DropdownMenuItem>
      <DropdownMenuItem>...</DropdownMenuItem>
     </DropdownMenuContent>
    </DropdownMenu>
    <div className=" md:flex gap-3 items-center border rounded-full p-2 px-5 hidden bg-slate-200 md:w-40 lg:w-64">
     <Search />
     <input type='text' placeholder='search' className=' bg-transparent outline-none' />
    </div>
   </div>
   <div className=" flex items-center gap-2">
    {session?.user && (
     <p className='font-bold text-sm text-green-700'>
      <span className=' text-xs font-semibold'>Hi </span>
      {session.user.name}
     </p>
    )}
    <h2 className='flex items-center gap-2 text-sm'>
     <ShoppingBag />
     0
    </h2>
    {!session?.user ? (
     <Link href={"/login"}>
      <button className=' btn btn-xs md:btn-sm btn-success' >Login</button>
     </Link>
    ) : (
     <Link href={"/api/auth/signout"}>
      <button className=' btn btn-xs md:btn-sm btn-success' >Logout</button>
     </Link>
    )
    }

   </div>
  </div>
 )
}

export default Header

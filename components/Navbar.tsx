"use client"
import { LogIn, MenuIcon, Plus, Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { User } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from './ModeToggle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuSubContent } from './ui/dropdown-menu'
import Sidebar from './Sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useModal } from '@/hooks/useModel'

export default function Navbar({currentUser} : {currentUser: User | null}) {
  const router = useRouter();
  const {theme, setTheme} = useTheme();
  const fullname: string[] = currentUser !== null ? currentUser.name.split(" ") : []
  const [isMid, setIsMid] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const {onOpen} = useModal()

  useEffect(() => {
    if (window.innerWidth > 760) {
      setIsMid(true)
    } else {
      setIsMid(false)
    }
  }, [setIsMid])
  return (
    <div className='w-full sticky top-0'>
    <div className='w-full p-2 bg-white dark:bg-neutral-800 shadow-2xl dark:shadow-neutral-700 h-[60px] flex flex-row justify-between items-center gap-2'>
      {isOpen ? <X className='md:hidden transition' size={18} onClick={() => setOpen((value) => !value)} /> : <MenuIcon className='md:hidden transition' size={18} onClick={() => setOpen((value) => !value)} />}
      <div className='hidden md:flex flex-row gap-1 items-center dark:text-white text-black' onClick={() => router.push("/")}>
      </div>
      <div className='flex md:hidden flex-row gap-1 items-center dark:text-white text-black' onClick={() => router.push("/")}>
        <span className='w-5 h-5 outline-none md:text-lg text-sm dark:border-white border-black rounded-full border-[1px] border-solid flex justify-center items-center text-center'>?</span>
        <span className='md:text-lg text-base font-bold'>Questiony</span>
      </div>
      <div className='hidden md:flex flex-row justify-center items-center w-[50%]'>
        <input type='search' className='p-2 h-[40px] rounded-l-md w-full dark:bg-neutral-700 bg-neutral-300 focus:outline-none' placeholder='Search' />
        <button className='dark:bg-neutral-700 bg-neutral-300 rounded-r-md h-[40px] p-2'><Search size={18} /></button>
      </div>
      <div className='hidden flex-row gap-2 justify-center items-center md:flex'>
        <ModeToggle />
                     {currentUser !== null ? (
                      <div className='flex flex-row gap-2 items-center justify-center'>
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
          <Button variant={"link"} className='m-1 p-1'><Plus size={18} /></Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add Question</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

                                  <DropdownMenu>
            <DropdownMenuTrigger>
                        <Avatar>
  <AvatarImage src={currentUser.image ?? ""} />
  <AvatarFallback>{fullname[0].charAt(0)} {fullname[1].charAt(0)}</AvatarFallback>
</Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
                      </div>
        ) : (
          <Button variant={"link"} className='m-1 p-1' onClick={() => onOpen("Login")}><LogIn size={18} /></Button>
        )}
      </div>

      <div className='md:hidden flex flex-row gap-2'>
        {currentUser !== null ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
                        <Avatar>
  <AvatarImage src={currentUser.image ?? ""} />
  <AvatarFallback>{fullname[0].charAt(0)} {fullname[1].charAt(0)}</AvatarFallback>
</Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant={"link"} onClick={() => onOpen("Login")} className='m-1 p-1'><LogIn size={18} /></Button>
        )}
      </div>
    </div>
    <div className={` md:hidden fixed top-0 left-0 w-[90%] transition-all ease-in-out duration-500 ${isOpen ? 'translate-x-[0%]' : '-translate-x-[110%]'}`}>
      <Sidebar currentUser={currentUser} mobile={true} set={setOpen} />
    </div>
    </div>
  )
}

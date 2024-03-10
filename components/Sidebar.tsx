"use client"

import { User } from '@prisma/client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LOGO from "../public/logo.png"
import DLOGO from "../public/dark.png"
import { FileQuestionIcon, Home, Save, Tag, Users, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { ModeToggle } from './ModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import ProfiEImage from './Profi.eImage'

export default function Sidebar({currentUser, mobile, set} : {currentUser: User | null, mobile: boolean, set?: React.Dispatch<React.SetStateAction<boolean>>}) {
  const {theme} = useTheme()
  const [isMid, setIsMid] = useState(false);
  const router = useRouter()
  const path = usePathname()
  const [innerHeight, setI] = useState(0)

    useEffect(() => {
    if (window.innerWidth > 760) {
      setIsMid(true)
    } else {
      setIsMid(false)
    }
  }, [setIsMid])

  useEffect(() => {
    setI(window.innerHeight);
  }, [])

  const route = (route: string) => {
    router.push(route)
  }
  const fullname: string[] = currentUser !== null ? currentUser.name.split(" ") : []

  return (
    <>
    <div className={`md:w-[20%] w-[90%] shadow-2xl dark:shadow-neutral-700 bg-white dark:bg-neutral-800 md:min-h-[100vh] md:max-h-[100vh] min-h-[90vh] max-h-[90vh] overflow-y-scroll noScroll transition-all ease-in-out duration-500 fixed top-[0vh] left-0 flex flex-col justify-start items-center gap-5 overflow-x-hidden`}>
      <div className='flex flex-row justify-between items-center gap-2 w-full sticky top-0 left-0 bg-white dark:bg-neutral-800 h-[60px] py-2 z-15'>
        <div className='flex flex-row gap-1 flex-1 justify-center items-center dark:text-white text-black cursor-pointer'  onClick={() => router.push('/')}>
        <span className='w-5 h-5 outline-none md:text-lg text-sm dark:border-white border-black rounded-full border-[1px] border-solid flex justify-center items-center text-center'>?</span>
        <span className='md:text-lg text-base font-bold'>Questiony</span>
      </div>
      {mobile && set !== undefined && (<X onClick={() => set(false)} size={18} />)}
      </div>

      <div className='w-full ml-[15%]'>
        <button onClick={() => route("/")} className={` ${path === '/' ? "w-full p-2 transition ease-in-out duration-200 rounded-md flex justify-center items-center gap-2  backdrop-blur-md dark:bg-white/30 bg-black/30 " : "w-full p-2 transition ease-in-out duration-200 rounded-md flex justify-center items-center gap-2 dark:hover:bg-neutral-700 hover:bg-neutral-200"}`}>
          <Home size={18} />
          <span className='text-base font-bold'>Home</span>
          </button>
          <button onClick={() => route("/questions")} className={`${path?.includes('/questions') ? "w-full p-2 transition ease-in-out duration-200 rounded-md flex justify-center items-center gap-2  backdrop-blur-md dark:bg-white/30 bg-black/30 " : "w-full p-2 transition ease-in-out duration-200 rounded-md flex justify-center items-center gap-2 dark:hover:bg-neutral-700 hover:bg-neutral-200 "}`}>
          <FileQuestionIcon size={18} />
          <span className='text-base font-bold'>Questions</span>
          </button>
          <button onClick={() => route("/tags")} className={`${path === '/tags' ? "w-full p-2 transition ease-in-out duration-200 rounded-md flex justify-center items-center gap-2  backdrop-blur-md dark:bg-white/30 bg-black/30 " : "w-full p-2 transition ease-in-out duration-200 rounded-md flex justify-center items-center gap-2 dark:hover:bg-neutral-700 hover:bg-neutral-200 "}`}>
          <Tag size={18} />
          <span className='text-base font-bold'>Tags</span>
          </button>
      </div>

      <div className='w-full ml-[15%]'>
        <button onClick={() => route("/saves")} className={` ${path === '/saves' ? "w-full p-2 transition ease-in-out duration-200 rounded-md flex justify-center items-center gap-2  backdrop-blur-md dark:bg-white/30 bg-black/30 " : "w-full p-2 transition ease-in-out duration-200 rounded-md flex justify-center items-center gap-2 dark:hover:bg-neutral-700 hover:bg-neutral-200"}`}>
          <Save size={18} />
          <span className='text-base font-bold'>Saves</span>
          </button>
          <button onClick={() => route("/users")} className={`${path?.includes('/users') ? "w-full p-2 transition ease-in-out duration-200 rounded-md flex justify-center items-center gap-2  backdrop-blur-md dark:bg-white/30 bg-black/30 " : "w-full p-2 transition ease-in-out duration-200 rounded-md flex justify-center items-center gap-2 dark:hover:bg-neutral-700 hover:bg-neutral-200 "}`}>
          <Users size={18} />
          <span className='text-base font-bold'>Users</span>
          </button>
      </div>

   
    </div>
    <div className='h-[100vh] flex md:hidden'>
      <div className='md:hidden fixed bottom-0 left-0 md:w-[20%] w-[90%] p-2 shadow-2xl dark:shadow-neutral-700 bg-white dark:bg-neutral-900 h-[10vh] transition-all ease-in-out duration-500 flex flex-row justify-cneter items-center gap-2 my-auto'>
        <ModeToggle />
        {currentUser && (
          <div className='flex flex-row justify-center items-center flex-1 w-full gap-2 z-10'>
<ProfiEImage currentUser={currentUser} fullname={fullname} />
            <span className='text-base font-semibold'>{currentUser.name}</span>
          </div>
        )}
      </div>
      </div>
      </>
  )
}

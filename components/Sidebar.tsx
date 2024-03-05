"use client"

import { User } from '@prisma/client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LOGO from "../public/logo.png"
import DLOGO from "../public/dark.png"
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Sidebar({currentUser, mobile, set} : {currentUser: User | null, mobile: boolean, set?: React.Dispatch<React.SetStateAction<boolean>>}) {
  const {theme} = useTheme()
  const [isMid, setIsMid] = useState(false);
  const router = useRouter()

    useEffect(() => {
    if (window.innerWidth > 760) {
      setIsMid(true)
    } else {
      setIsMid(false)
    }
  }, [setIsMid])

  return (
    <div className='md:w-[20%] w-[90%] p-2 shadow-2xl dark:shadow-neutral-700 bg-white dark:bg-neutral-800 min-h-[100vh] max-h-[100vh] overflow-y-scroll noScroll transition-all ease-in-out duration-500 fixed top-0 left-0'>
      <div className='flex flex-row justify-between items-center gap-2 w-full'>
        <div className='flex flex-row gap-1 items-center dark:text-white text-black cursor-pointer'  onClick={() => router.push('/')}>
        <span className='w-5 h-5 outline-none md:text-lg text-sm dark:border-white border-black rounded-full border-[1px] border-solid flex justify-center items-center text-center'>?</span>
        <span className='md:text-lg text-base font-bold'>Questiony</span>
      </div>
      {mobile && set !== undefined && (<X onClick={() => set(false)} size={18} />)}
      </div>
    </div>
  )
}

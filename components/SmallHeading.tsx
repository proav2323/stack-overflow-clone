"use client"
import React from 'react'

export default function SmallHeading({title, subtitle, center}: {title: string, subtitle?: string, center?: boolean}) {
  return (
     <div className={`${center ? "text-center" : "text-start"} flex flex-col justify-center items-center`}>
        <div className=' text-base md:text-lg font-bold'>{title}</div>
        <div className='font-light text-neutral-500 mt-2 ts-sm'>{subtitle}</div>
     </div>
  )
}
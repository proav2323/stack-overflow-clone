"use client"

import { userWithT } from '@/types'
import React from 'react'
import { Card, CardContent } from './ui/card'
import ProfiEImage from './Profi.eImage'

export default function UserCard({user}: {user: userWithT}) {
  const fullname: string[] = user.name.split(" ")
  const smallAbout = user.about ? user.about?.length >= 25 ? user.about.slice(0, 25-1) + "..." : user.about  : ""
  return (
    <Card>
        <CardContent className='flex flex-row justify-center items-center px-4 py-4 gap-2 cursor-pointer'>
                  <ProfiEImage fullname={fullname} currentUser={user} />
                  <div className='flex flex-col justify-start items-center'>
                    <span className='dark:text-neutral-700 text-neutral-300 text-lg font-bold'>{user.name}</span>
                    {user.about && (
                        <span className='text-base dark:text-neutral-500 text-neutral-200 font-semibold'>{smallAbout}</span>
                    )}
                  </div>
        </CardContent>
    </Card>
  )
}

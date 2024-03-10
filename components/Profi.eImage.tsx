"use client"

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User } from '@prisma/client'

export default function ProfiEImage({currentUser, fullname}: {currentUser: User, fullname: string[]}) {
  return (
                            <Avatar>
  <AvatarImage src={currentUser.image ?? ""} />
  <AvatarFallback>{fullname[0].charAt(0)} {fullname[1].charAt(0)}</AvatarFallback>
</Avatar>
  )
}

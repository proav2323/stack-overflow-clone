"use client"

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { User } from '@prisma/client'

export default function ProfiEImage({currentUser, fullname, small = false}: {currentUser: User, fullname: string[], small?: boolean}) {
  return (
<Avatar className={`${small ? "w-10" : ""}`}>
  <AvatarImage src={currentUser.image ?? ""} />
  <AvatarFallback>{fullname[0].charAt(0)} {fullname[1].charAt(0)}</AvatarFallback>
</Avatar>
  )
}

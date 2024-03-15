"use client"

import { userWithT } from '@/types'
import React from 'react'
import UserCard from './UserCard'

export default function UsersList({users}: {users: userWithT[]}) {
  return (
    <div className='mt-10 flex-row flex-wrap flex w-[95%] gap-2 justify-start items-center'>
           {users.map((user) => (
            <UserCard key={user.id} user={user} />
           ))}
    </div>
  )
}

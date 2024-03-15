import getSearchUsers from '@/actions/getFilteredUsers'
import SearchUsers from '@/components/SearchUsers'
import UsersList from '@/components/UsersList'
import { userWithT } from '@/types'
import React from 'react'

export default async function page({searchParams}: {searchParams: {searchU: string}}) {
    const users: userWithT[] = await getSearchUsers(searchParams.searchU)
  return (
    <div className='flex flex-col justify-start items-start gap-2 w-[95%]'>
       <SearchUsers url="/users" />
       <UsersList users={users} />
    </div>
  )
}

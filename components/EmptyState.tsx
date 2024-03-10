"use cleint"
import React from 'react'
import { Button } from './ui/button'
import Heading from './Heading'
import { useRouter } from 'next/navigation'
import { url } from 'inspector'

export default function EmptyState({title, subtitle, showButton = false, url}: {title: string, subtitle: string, onClick?: () => void, showButton: boolean, url: string}) {
    const router = useRouter();
  return (
        <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
        <Heading center title={title} subtitle={subtitle} />
        <div className='w-48 mt-4'>
            {showButton && (
                <Button onClick={() => router.push(url)} >Remove all filters</Button>
            )}
        </div>
    </div>
  )
}
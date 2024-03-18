"use client"

import { RepliesWithA, commentWithA, userWithT } from '@/types'
import React, { useState } from 'react'
import ProfiEImage from './Profi.eImage'
import { timeAgo } from './QuestionCard'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { PenIcon, Trash } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function ReplyCard({comment, currentUser, questionId, url}: {comment: RepliesWithA, currentUser: userWithT | null,  questionId: string, url: string}) {
    const fullName = comment.replyedBy.name.split(" ")
    const [commentT, setComment] = useState(comment.text)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

        const Delete = () => {
            if (loading) {
                return;
            } else {
        setLoading(true);
            }
        axios.delete(url).then((data) => {
           toast.success("reply deleted")
           router.refresh();
        }).catch((err: any) => {
            toast.error(err.response.data)
        }).finally(() => {
            setLoading(false)
    })
    }

        const updateComment = () => {
        if (commentT === "") {
            return;
        }
        setLoading(true);
        axios.put(url, {text: commentT}).then((data) => {
           toast.success("reply updated")
           router.refresh();
           setComment(""); 
        }).catch((err: any) => {
            toast.error(err.response.data)
        }).finally(() => {
            setLoading(false)
    })
    }
  return (
    <div className='flex flex-row justify-center items-center gap-2 w-full relative z-10'>
        <div className='flex flex-col gap-2 items-center justify-center'>
            <ProfiEImage fullname={fullName} currentUser={comment.replyedBy} small/>
            <span className='text-sm font-semibold dark:text-neutral-600 text-neutral-300'>{comment.replyedBy.name}</span>
        </div>

        <span className='flex-1 w-full text-left text-base dark:text-neutral-700 text-neutral-200 font-bold'>{comment.text}</span>
        <span>{timeAgo(comment.updatedAT)}</span>

            <div className='flex flex-row justify-center items-center gap-2 absolute bottom-2 right-2'>
                {currentUser !== null && comment.replyedById === currentUser.id && (
                                                        <Popover>
                       <PopoverTrigger className='z-50'>
                          <PenIcon size={14} className=' cursor-pointer' />
                       </PopoverTrigger>
                       <PopoverContent align='start' className='z-50 w-[300px] px-2 py-2 flex flex-row justify-center items-center gap-2'>
                           <Input disabled={loading} className='flex-1 w-full' value={commentT} onChange={(e) => setComment(e.target.value)} placeholder='reply'/>
                           <Button disabled={loading} onClick={() => updateComment()}>Update</Button>
                       </PopoverContent>
                    </Popover>
                )}
                {currentUser !== null && comment.replyedById === currentUser.id && (<Trash size={14} onClick={() => Delete()} className='cursor-pointer' />)}
                </div>
    </div>
  )
}

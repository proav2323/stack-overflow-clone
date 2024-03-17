"use client"

import { commentWithA, userWithT } from '@/types'
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

export default function CommentCard({comment, currentUser, questionId}: {comment: commentWithA, currentUser: userWithT | null,  questionId: string}) {
    const fullName = comment.commentBy.name.split(" ")
    const [commentT, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

        const Delete = () => {
            if (loading) {
                return;
            } else {
        setLoading(true);
            }
        axios.delete(`/api/questions/${questionId}/comment/${comment.id}/`).then((data) => {
           toast.success("comment deleted")
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
        axios.put(`/api/questions/${questionId}/comment/${comment.id}/`, {text: commentT}).then((data) => {
           toast.success("comment updated")
           router.refresh();
           setComment(""); 
        }).catch((err: any) => {
            toast.error(err.response.data)
        }).finally(() => {
            setLoading(false)
    })
    }
  return (
    <div className='flex flex-row justify-center items-center gap-2 w-full relative'>
        <div className='flex flex-col gap-2 items-center justify-center'>
            <ProfiEImage fullname={fullName} currentUser={comment.commentBy} small/>
            <span className='text-sm font-semibold dark:text-neutral-600 text-neutral-300'>{comment.commentBy.name}</span>
        </div>

        <span className='flex-1 w-full text-left text-base dark:text-neutral-700 text-neutral-200 font-bold'>{comment.text}</span>
        <span>{timeAgo(comment.updatedAT)}</span>

            <div className='flex flex-row justify-center items-center gap-2 absolute bottom-2 right-2'>
                {currentUser !== null && comment.commentById === currentUser.id && (
                                                        <Popover>
                       <PopoverTrigger asChild>
                          <PenIcon size={20} className=' cursor-pointer' />
                       </PopoverTrigger>
                       <PopoverContent className='w-[300px] px-2 py-2 flex flex-row justify-center items-center gap-2'>
                           <Input disabled={loading} className='flex-1 w-full' value={commentT} onChange={(e) => setComment(e.target.value)} placeholder='Comment'/>
                           <Button disabled={loading} onClick={() => updateComment()}>Update</Button>
                       </PopoverContent>
                    </Popover>
                )}
                {currentUser !== null && comment.commentById === currentUser.id && (<Trash size={20} onClick={() => Delete()} className='cursor-pointer' />)}
                </div>
    </div>
  )
}

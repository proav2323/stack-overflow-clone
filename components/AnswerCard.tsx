"use client"

import { answersWithA, userWithT } from '@/types'
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import Editer from './Editer'
import { MessageCircle, PenIcon, Plus, Trash } from 'lucide-react'
import ProfiEImage from './Profi.eImage'
import { timeAgo } from './QuestionCard'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import CommentCard from './CommentCard'
import ReplyCard from './RepyCard'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

export default function AnswerCard({answer, currentUser}: {answer: answersWithA, currentUser: userWithT | null}) {
    const fullName = answer.answeredBy.name.split(" ");
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");
    const [answerT, setAnswer] = useState(answer.answer)
    const router = useRouter()

    
    const addComment = () => {
        if (comment === "") {
            return;
        }
        setLoading(true);
        axios.post(`/api/questions/${answer.questionId}/answers/${answer.id}/replyies/`, {text: comment}).then((data) => {
           toast.success("reply added")
           router.refresh();
           setComment(""); 
        }).catch((err: any) => {
            toast.error(err.response.data)
        }).finally(() => {
            setLoading(false)
    })
    }

    const updateAnswer = () => {
        if (answerT === "") {
            return;
        }
        setLoading(true);
        axios.put(`/api/questions/${answer.questionId}/answers/${answer.id}/`, {text: answerT}).then((data) => {
           toast.success("answer updated")
           router.refresh();
           setComment(""); 
        }).catch((err: any) => {
            toast.error(err.response.data)
        }).finally(() => {
            setLoading(false)
    })
    }

        const dleteAnswer = () => {
        setLoading(true);
        axios.delete(`/api/questions/${answer.questionId}/answers/${answer.id}/`).then((data) => {
           toast.success("answer delteted")
           router.refresh();
           setComment(""); 
        }).catch((err: any) => {
            toast.error(err.response.data)
        }).finally(() => {
            setLoading(false)
    })
    }
  return (
        <Card className='w-full z-10'>
        <CardContent className='z-10 flex flex-col justify-start items-start gap-0 px-0 py-0 w-full rouded-t-md'>
            <div className='flex flex-row justify-between items-center gap-2 w-full rounded-t-md dark:bg-neutral-700 bg-neutral-300 px-2 py-2 relative'>

        <div className='flex flex-row gap-2 items-center justify-center'>
            <ProfiEImage fullname={fullName} currentUser={answer.answeredBy} small />
            <span className='text-sm font-semibold dark:text-neutral-600 text-neutral-300'>{answer.answeredBy.name}</span>
        </div>

        <span>Answered: {timeAgo(answer.updatedAT)}</span>

                <div className='flex flex-row justify-center items-center gap-2 absolute top-2 right-2'>
                {currentUser !== null && answer.answeredById === currentUser.id && (
                    <Dialog>
                                      <DialogTrigger asChild>
                <PenIcon size={14} className=' cursor-pointer' />
                       </DialogTrigger>
                       <DialogContent className='px-2 py-2 flex flex-col justify-center items-center gap-2 max-h-[100%] overflow-y-scroll noScroll '>
                           <span>Your Answer</span>
                           <Editer edit={loading === false ? true : false} id='description' value={answerT} setValue={(id, value) => setAnswer(value)} />
                           <Button className='w-full' disabled={loading} onClick={() => updateAnswer()}>Update</Button>
                       </DialogContent>
                    </Dialog>
                )}
                {currentUser !== null && answer.answeredById === currentUser.id && (<Trash onClick={() => dleteAnswer()} size={14} className='cursor-pointer' />)}
                </div>
            </div>
            <div className='flex flex-col justify-start items-start gap-2 rounded-b-md px-2 py-2 dark:bg-neutral-900 bg-white w-full'>
                <Editer edit={false} value={answer.answer} classN='bg-transparent shadow-none w-full dark:text-white text-black outline-none border-none' setValue={undefined} id={undefined} />
                
                <div className='flex flex-row items-end w-full '>
                                        <Popover>
                       <PopoverTrigger asChild>
                          <MessageCircle size={20} className='cursor-pointer' />
                       </PopoverTrigger>
                       <PopoverContent className='z-50 md:w-[30vw] lg:w-[25vw] w-[95vw] px-2 py-2 flex flex-row justify-center items-center gap-2'>
                           <Input disabled={loading} className='flex-1 w-full' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='relpy'/>
                           <Button disabled={loading} onClick={() => addComment()}>Add</Button>
                       </PopoverContent>
                    </Popover>
                </div>

               <div className='flex flex-col gap-2 justify-start items-start w-full'>
                   {answer.replies.map((comment) => (
                    <ReplyCard url={`/api/questions/${answer.questionId}/answers/${answer.id}/replyies/${comment.id}`} questionId={answer.questionId} key={comment.id} comment={comment} currentUser={currentUser} />
                   ))}
               </div>
            </div>
        </CardContent>
    </Card>
  )
}

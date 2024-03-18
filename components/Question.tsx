"use client"

import { questionsWithReplies, userWithT } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import {Separator} from "./ui/separator"
import ProfiEImage from './Profi.eImage'
import { timeAgo } from './QuestionCard'
import Editer from './Editer'
import { BookMarked, BookMarkedIcon, Bookmark, BookmarkCheck, MessageCircle, PenIcon, PlusCircle, PlusIcon, Trash } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Input } from './ui/input'
import { Button } from './ui/button'
import CommentCard from './CommentCard'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import Sorter from './Sorter'
import AnswerCard from './AnswerCard'

export default function Question({question, currentUser}: {question: questionsWithReplies, currentUser: userWithT | null}) {
    const fullName = question.askedBy.name.split(" ");
    const [saved, setSaved] = useState(false)
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [answer, setAnswer] = useState("")
    const router = useRouter()
    const isSaved = useCallback(() => {
        if (currentUser) {
           const q = currentUser.saves.find((data) => question.id)

           if (q) {
            setSaved(true)
           } else {
            setSaved(false)
           }
        } else {
          setSaved(false)
        }
    }, [setSaved, question, currentUser])

    useEffect(() => {
        isSaved()
    }, [isSaved])

    const toggle = (id: string) => {
        if (loading) {
            return;
        } else {
            setLoading(true);
        }

         if (saved) {
            axios.delete(`/api/questions/${id}/`).then((data) => {
                   toast.success("question deletd")
                   router.refresh();
                   setSaved(false);
            }).catch((err) => {
                toast.error(err.response.data)
            }).finally(() => {
                setLoading(false)
            })
         } else {
            axios.post(`/api/questions/${id}/`).then((data) => {
                   toast.success("question saved")
                   router.refresh();
                   setSaved(true);
            }).catch((err) => {
                toast.error(err.response.data)
            }).finally(() => {
                setLoading(false)
            })
         }
    }

    const addComment = () => {
        if (comment === "") {
            return;
        }
        setLoading(true);
        axios.post(`/api/questions/${question.id}/comment/`, {text: comment}).then((data) => {
           toast.success("comment added")
           router.refresh();
           setComment(""); 
        }).catch((err: any) => {
            toast.error(err.response.data)
        }).finally(() => {
            setLoading(false)
    })
    }

    const addAnswer = () => {
        if (answer === "") {
            return;
        }
        setLoading(true);
        axios.post(`/api/questions/${question.id}/answers/`, {text: answer}).then((data) => {
           toast.success("answer added")
           router.refresh();
           setAnswer(""); 
        }).catch((err: any) => {
            toast.error(err.response.data)
        }).finally(() => {
            setLoading(false)
    })
    }
   

  return (
    <div className='flex flex-col gap-2 w-full justify-start items-center'>
    <Card className='w-full'>
        <CardContent className='flex flex-col justify-start items-start gap-0 px-0 py-0 w-full rouded-t-md'>
            <div className='flex flex-col justify-start items-start gap-2 w-full rounded-t-md bg-orange-700 px-2 py-2 relative'>
                <span className='md:text-lg text-sm font-bold w-[98%] text-left text-white mb-2 mt-1'>{question.title}</span>
                <Separator className="bg-white text-white" />
                <div className='flex justify-between items-center w-full gap-2'>
                    <div className='flex flex-row justify-center items-center gap-2'>
                       <ProfiEImage fullname={fullName} currentUser={question.askedBy} />
                       <span className='dark:text-neutral-700 text-neutral-300'>{question.askedBy.name}</span>
                    </div>
                    <span>{question.createdAt.toTimeString() === question.updatedAT.toTimeString() ? "Asked" : "Modified"} {timeAgo(question.updatedAT)}</span>
                </div>
                <div className='flex flex-row justify-center items-center gap-2 absolute top-2 right-2'>
                {currentUser !== null && question.askedById === currentUser.id && (<PenIcon size={20} className=' cursor-pointer' />)}
                {currentUser !== null && question.askedById === currentUser.id && (<Trash size={20} className='cursor-pointer' />)}
                </div>
            </div>

            <div className='flex flex-col justify-start items-start gap-2 rounded-b-md px-2 py-2 dark:bg-neutral-900 bg-white w-full'>
                <Editer edit={false} value={question.description} classN='bg-transparent shadow-none w-full dark:text-white text-black outline-none border-none' setValue={undefined} id={undefined} />
               <Editer edit={false} value={question.expection} classN='bg-transparent shadow-none w-full dark:text-white text-black outline-none border-none' setValue={undefined} id={undefined} />

               <div className='flex flex-row justify-between items-center w-full'>
                <div className='flex flex-row gap-2 justify-center items-center'>
                     {saved ? (
                        <Bookmark onClick={() => toggle(question.id)} fill='orange' size={20} className='cursor-pointer' />
                     ) : (
                        <Bookmark onClick={() => toggle(question.id)} size={20}  className='cursor-pointer' />
                     )}
                </div>

                <div className='flex flex-row gap-2 justify-center items-center'>
                    <Dialog>
                  <DialogTrigger asChild>
                    <PlusCircle size={20} className='cursor-pointer' />
                       </DialogTrigger>
                       <DialogContent className='px-2 py-2 flex flex-col justify-center items-center gap-2 max-h-[100%] overflow-y-scroll noScroll '>
                           <span>Your Answer</span>
                           <Editer edit={loading === false ? true : false} id='description' value={answer} setValue={(id, value) => setAnswer(value)} />
                           <Button className='w-full' disabled={loading} onClick={() => addAnswer()}>Add</Button>
                       </DialogContent>
                    </Dialog>
                    <Popover>
                       <PopoverTrigger asChild>
                          <MessageCircle size={20} className='cursor-pointer' />
                       </PopoverTrigger>
                       <PopoverContent className='md:w-[30vw] lg:w-[25vw] w-[95vw] px-2 py-2 flex flex-row justify-center items-center gap-2'>
                           <Input disabled={loading} className='flex-1 w-full' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Comment'/>
                           <Button disabled={loading} onClick={() => addComment()}>Add</Button>
                       </PopoverContent>
                    </Popover>
                </div>
               </div>
               <div className='flex flex-col gap-2 justify-start items-start w-full'>
                   {question.comment.map((comment) => (
                    <CommentCard url={`/api/questions/${question.id}/comment/${comment.id}/`} questionId={question.id} key={comment.id} comment={comment} currentUser={currentUser} />
                   ))}
               </div>
            </div>
        </CardContent>
    </Card>

    <div className='flex md:flex-row flex-col justify-between items-center gap-2 w-full'>
        <span className='text-lg font-bold'>{String(question.answers.length)} answers</span>
        <Sorter un={false} url={`/questions/${question.id}`} />
    </div>

    {question.answers.map((data) => (
        <AnswerCard answer={data} key={data.id} currentUser={currentUser} />
    ))}
    </div>
  )
}

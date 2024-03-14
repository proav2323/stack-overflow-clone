"use client"
import { questionsWithReplies } from '@/types'
import { User } from '@prisma/client'
import React from 'react'
import Heading from './Heading'
import QuestionCard from './QuestionCard'
import EmptyState from './EmptyState'



export default function Questions({questions, currentUser, showButton = true, title = "no questiosn found", sub = "reset filters", url, hTitle = "Latest Questions"}: {questions: questionsWithReplies[], currentUser: User | null, showButton?: boolean, title?: string, sub?: string, url: string, hTitle?: string}) {

  if (questions.length === 0) {
    return (
      <div className='flex flex-col h-full w-full'>
        <EmptyState title={title} subtitle={sub} url={url} showButton={showButton}  />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-start items-center gap-2 w-full px-2 my-2">
        <div className='w-full text-left'>
        <Heading title={hTitle} />
        </div>
        {questions.map((question) => {
            return (
              <QuestionCard question={question} key={question.id} />
            )
        })}
    </div>
  )
}

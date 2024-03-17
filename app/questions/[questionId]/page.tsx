import getCurrentUser from '@/actions/getCurrentUser'
import getQuestionById from '@/actions/getQuestionById'
import EmptyState from '@/components/EmptyState'
import Question from '@/components/Question'
import { questionsWithReplies, userWithT } from '@/types'
import React from 'react'

export default async function page({params, searchParams}: {params: {questionId: string}, searchParams: {orderBy: "new" | "oldest"}}) {
    const question: questionsWithReplies | null = await getQuestionById(params.questionId, searchParams.orderBy === undefined ? undefined : searchParams.orderBy)
    const currentUser: userWithT | null = await getCurrentUser()

    if (question === null) {
        return (
            <EmptyState title='Question Not Found' subtitle='wrong id' showButton={false} url='/' />
        )
    }
  return (
    <div className='flex flex-col gap-2 mt-2 justify-start items-start w-full px-2 py-2'>
       <Question question={question} currentUser={currentUser} />
    </div>
  )
}

import getCurrentUser from '@/actions/getCurrentUser'
import getSvaesQuestions from '@/actions/getSvaedQuestions'
import Heading from '@/components/Heading'
import Questions from '@/components/Questions'
import { questionsWithReplies } from '@/types'
import React from 'react'

export default async function pages() {
  const questions: questionsWithReplies[] = await getSvaesQuestions();
  const currentUser = await getCurrentUser()    
  return (
    <div className='flex flex-col justify-start items-start gap-2 mt-2 mb-2 w-[98%] px-2'>
        <Heading title='Your Saved Questions' subtitle='your see later questions' />
        <Questions questions={questions} currentUser={currentUser} url='/saves' hTitle='Saved Questions' showButton={false} title='no saves questions' sub='you have not saved any questions' />
    </div>
  )
}

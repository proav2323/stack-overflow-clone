import getAllQuestio from '@/actions/getAllQuestions'
import Tags from '@/components/Tags'
import React from 'react'

export default async function page() {
    const allQuestions = await getAllQuestio()
  return (
    <div className='flex flex-col justify-center items-center mt-2'>
        <Tags questions={allQuestions} />
    </div>
  )
}

"use client"

import { questionsWithReplies } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Tags({questions}: {questions: questionsWithReplies[]}) {
    const [tags, setTags] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
       questions.forEach((data) => {
          setTags(value => [...value, ...data.tags])
       })

       setTags(value => value.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    }))
    }, [questions])
  return (
    <div className='flex flex-row flex-wrap gap-3 py-2 px-2 justify-start items-center'>
        {tags.map((data) => {
            return (
                <span onClick={() => router.push(`/questions?tag=${data}&orderBy=new`)} className='py-3 px-4 dark:bg-slate-800 bg-slate-300 dark:text-white text-black rounded-full cursor-pointer' key={data}>{data}</span>
            )
        })}
    </div>
  )
}

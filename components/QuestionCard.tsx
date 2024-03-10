"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { questionsWithReplies } from "@/types"
import React, { useEffect, useState } from 'react'
import ProfiEImage from "./Profi.eImage"
import SmallHeading from "./SmallHeading"
import {format} from "date-fns";
import { useRouter } from "next/navigation"
import Editer from "./Editer"

export function timeAgo(input: any) {
  const date = (input instanceof Date) ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges: Record<string, number> = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    let k: any = key;
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[k];
      return formatter.format(Math.round(delta), k);
    }
  }
}



export default function QuestionCard({question}: {question: questionsWithReplies}) {
    const fullname = question.askedBy.name.split(" ")
    const [tags, setTags] = useState<string[]>([])
    const router = useRouter();

    useEffect(() => {
      setTags(window.innerWidth >= 760 ? question.tags.slice(0, 4) : question.tags.slice(0, 2))
    }, [question.tags])

  return (
    <Card className="w-[98%] cursor-pointer rounded-md shadow-2xl">
  <CardContent className='flex-col flex justify-center items-center w-full px-0 py-0'>
     <div className="rounded-t-md flex flex-row justify-between items-center w-full gap-2 dark:bg-neutral-800 bg-neutral-300 dark:text-white text-black py-2 shadow-sm px-2">
        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
            <ProfiEImage fullname={fullname} currentUser={question.askedBy} />
            <span className="text-lg dark:text-neutral-500 text-neutral-100 font-semibold">{question.askedBy.name}</span>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 flex-1 w-full gap-2 justify-between items-center px-2 mr-2">
            <SmallHeading title={question.createdAt.toTimeString() === question.updatedAT.toTimeString() ? "Asked" : "Modified"} subtitle={timeAgo(question.updatedAT)} />
            <SmallHeading title={"Answers"} subtitle={String(question.answers.length)} />
        </div>
     </div>

      <div className="rounded-b-md flex flex-col justify-start items-start w-full gap-2 dark:bg-neutral-900 bg-white dark:text-white text-black pt-2 pl-2">
        <span className="text-lg font-bold text-orange-800">{question.title}</span>
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-2 items-center justify-center">
            {tags.map((data) => (
              <span onClick={() => router.push(`/questions?tag=${data}`)} className="py-1 px-2 bg-orange-400 rounded-md text-orange-700 hover:bg-orange-900 hover:text-orange-500 transition ease-in-out duration-200" key={data}>{data}</span>
            ))}
          </div>
          <button onClick={() => router.push(`/questions/${question.id}`)} className="rounded-br-md bg-orange-700 py-2 w-[30%] md:w-[20%] text-center text-white hover:bg-orange-900 transition ease-in-out duration-200">More</button>
        </div>
     </div>
  </CardContent>
</Card> 
  )
}

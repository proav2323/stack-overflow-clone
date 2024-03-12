"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Sorter({url}: {url: string}) {

  const searchParams = useSearchParams();
  const values = ["new", "oldest", "unanswered"]
  const router = useRouter()
  const orderBy = searchParams ? searchParams.get("orderBy") ?? "new" : "new"
    const select = (id: string, orderBy: string) => {

        let oldUrl = new URL(url, process.env.NEXT_URL);

        searchParams?.forEach((value, key) => {
            oldUrl.searchParams.set(key, value)
        })

        const searchparams = new URLSearchParams(oldUrl.search);
        
        if (!searchParams?.get(id)) {
       searchparams.set(id, orderBy);

       let urlL = `${url}?`
       searchparams.forEach((value, key) => {
         urlL += `${key}=${value}&`
       })
       router.push(urlL);

      } else {
       searchparams.delete(id);
       searchparams.set(id, orderBy);
       let urlL = `${url}?`
       searchparams.forEach((value, key) => {
         urlL += `${key}=${value}&`
       })
       router.push(urlL);
        }

    }

  return (
    <div className='flex flex-row justify-start w-full overflow-x-scroll py-2 px-2 items-center gap-2 noScroll max-w-[100%]'>
       {values.map((data) => (
        <span key={data} onClick={() => select("orderBy", data)} className={`text-lg py-2 font-semibold mx-2 ${orderBy === data ? "text-orange-700 border-b-[4px] border-orange-700" : "dark:text-white text-black"} cursor-pointer transition ease-in-out duration-500`}>{data}</span>
       ))}
    </div>
  )
}

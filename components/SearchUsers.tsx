"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import Heading from './Heading';
import { Input } from './ui/input';

export default function SearchUsers({url}: {url: string}) {
    const searchParams = useSearchParams();
    const router = useRouter();
        const select = (id: string, orderBy: string, remove: boolean) => {

            if (remove) {
        let oldUrl = new URL(url, process.env.NEXT_URL);

        searchParams?.forEach((value, key) => {
            oldUrl.searchParams.set(key, value)
        })

        const searchparams = new URLSearchParams(oldUrl.search);

        if (searchParams?.get(id)) {
            searchparams.delete(id);
        }

        let urlL = `${url}?`
       searchparams.forEach((value, key) => {
         urlL += `${key}=${value}&`
       })
       router.push(urlL);
            } else {
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

    }
  return (
    <div className='md:w-[20vw] w-[98vw] flex flex-col justify-center items-start gap-2 mt-2'>
        <Heading title='Filter Users' />
        <Input placeholder='search users with email, name' className='w-full' onChange={(e) => {
            if (e.target.value === "") {
                select("searchU", e.target.value, true)
            } else {
                select("searchU", e.target.value, false)
            }
        }} />
    </div>
  )
}

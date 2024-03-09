"use client"

import { useModal } from '@/hooks/useModel'
import React, { ReactNode, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog';
import Heading from '../Heading';
import { Button } from '../ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from "@/components/ui/input"
import Editer from '../Editer';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export const addQuestionSchema = z.object({
    title: z.string().min(1, {message: "title is required"}),
    description: z.string().min(1, {message: "description is required"}),
    expectation: z.string().min(1, {message: "expectation is required"})
})

export default function AddQuestionModel() {
    const {isOpen, onOpen, onClose, type, data} = useModal();
    const {currentUser} = data;
    const [tag, setTag] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const open = isOpen && type === "addQuestion"
    const form = useForm<z.infer<typeof addQuestionSchema>>(
        {
            resolver: zodResolver(addQuestionSchema),
            defaultValues: {
                title : "",
                description: "",
                expectation: "",
            }
        }
    )

    const Description = form.watch("description")
    const exp = form.watch("expectation")
    const router = useRouter()
    const onSubmit = (values: z.infer<typeof addQuestionSchema>) => {
     if (tags.length === 0) {
        toast.error("atleast one tag")
        return;
     }
    setLoading(true);
     axios.post("/api/questions", {...values, tags: tags}).then((data) => {
          toast.success("question added")
          onClose();
          router.refresh();
          
     }).catch((err) => {
       toast.error(err.response.data)
     }).finally(() => {
        setLoading(false);
     })
    
    }
    const setValue = (id: "description" | "expectation", val: string) => {
       form.setValue(id, val);
    }

    if (!currentUser) {
        return (
            <Dialog open={open} onOpenChange={() => onClose()}>
                 <DialogContent className='gap-2 flex-col flex w-full'>
                    <Heading title='Your Are No Allowed! Login First' subtitle='login now' />
                    <Button onClick={() => openLog()}>Login</Button>

                 </DialogContent>
            </Dialog>
        )
    }

    const openLog = () => {
        onClose();
        onOpen("Login")
    }

    const addTag = () => {
        if (tag) {
            setTags(value => [...value, tag])
            setTag("")
        }
    }

        const removeTag = (tag: string) => {
            setTags(value => value.filter((data) => data !== tag))
    }
  return (
            <Dialog open={open} onOpenChange={() => onClose()}>
                 <DialogContent className='gap-2 flex-col flex w-full max-h-[100vh] overflow-y-scroll noScroll'>
                    <Heading title='Clear A Question' subtitle='add one now' />
                    <Form {...form} >
                        <form  onSubmit={form.handleSubmit(onSubmit)} className='flex-col flex space-y-9'>
                                    <FormField
          control={form.control}
          name="title"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="what's the problem?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            
            <div className='flex flex-col gap-2 w-full'>
                <span className='text-lg font-semibold'>Descriptipn</span>
                <Editer edit={loading ? false : true} id="description" value={Description} setValue={(id, val) => setValue(id, val)} />
                {Description === "" && (<span className='text-red-500'>Description is required</span>)}
            </div>

            <div className='flex flex-col gap-2 w-full'>
                <span className='text-lg font-semibold'>Expectation</span>
                <Editer edit={loading ? false : true} id="expectation" value={exp} setValue={(id, val) => setValue(id, val)} />
                {exp === "" && (<span className='text-red-500'>Expactation is required</span>)}
            </div>

            <div className='flex flex-col justify-center items-start w-full gap-2'>
                <span className='text-lg font-semibold'>Tags</span>
                <div className='flex flex-row gap-2 w-full'>
                <Input type="text" value={tag} onChange={(e) => setTag(e.target.value)} className='flex-1 w-full' placeholder='tag' />
                <Button disabled={loading} type="button" onClick={() => addTag()}>Add</Button>
                </div>

                <div className='flex flex-row noScroll overflow-x-scroll max-w-[100%] px-1 py-1 gap-2'>
                    {tags.map((tag) => (
                        <Button disabled={loading} type="button" key={tag} onClick={() => removeTag(tag)}>{tag}</Button>
                    ))}
                </div>
            </div>

            <Button disabled={loading} type='submit' className='w-full'>Add Question</Button>
                        </form>
                    </Form>
                 </DialogContent>
            </Dialog>
  )
}

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


export const addQuestionSchema = z.object({
    title: z.string().min(1, {message: "title is required"}),
    description: z.string().min(1, {message: "description is required"}),
    expectation: z.string().min(1, {message: "expectation is required"})
})

export default function AddQuestionModel() {
    const {isOpen, onOpen, onClose, type, data} = useModal();
    const {currentUser} = data;
    const [tags, setTags] = useState([])
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
    const onSubmit = (values: z.infer<typeof addQuestionSchema>) => {

    
    
    }
    const setValue = (id: "description" | "expectation", val: string) => {
       form.setValue(id, val);
       console.log(val);
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
  return (
            <Dialog open={open} onOpenChange={() => onClose()}>
                 <DialogContent className='gap-2 flex-col flex w-full max-h-[100vh] overflow-y-scroll noScroll'>
                    <Heading title='Clear A Question' subtitle='add one now' />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex-col flex space-y-9'>
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
            
            <div>
                <Editer edit id="description" value={Description} setValue={(id, val) => setValue(id, val)} />
                <Editer edit={false} value={Description} id={undefined} setValue={undefined} />
            </div>
                        </form>
                    </Form>
                 </DialogContent>
            </Dialog>
  )
}

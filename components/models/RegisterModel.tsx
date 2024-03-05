"use client"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModel"
import Heading from "../Heading";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {signIn} from 'next-auth/react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Toast from "react-hot-toast"
import axios from "axios"


import { z } from "zod"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
 
const registerFormSchema = z.object({
    email: z.string().min(1, {
        message: "email is required"
    }).email({
        message: "email is not valid"
    }),
    password: z.string().min(8, {
        message: "password should longer than 8 charcters"
    }),
    name: z.string().min(1, {
      message: "name is required"
    })
})

export default function RegisterModel() {
    const {type, isOpen, onClose, onOpen} = useModal();
    const [loading, setLoading] = useState(false)
    const open = type === "register" && isOpen
    const router = useRouter();
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })

    const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
       setLoading(true);
       axios.post("/api/register", {...values}).then((data) => {
        Toast.success("login now")
        opeLog()
       }).catch((data) => {
           Toast.error(data.response.data)
       }).finally(() => {
        setLoading(false)
       })
    }

    const opeLog = () => {
      onClose()
      onOpen("Login")
    }
  return (
     <Dialog open={open} onOpenChange={() => onClose()}>
  <DialogContent className="max-h-[100vh] overflow-y-scroll noScroll flex-col w-full">
       <Heading title="Welcome :)" subtitle="create your account" />
       <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}  className="flex flex-col space-y-8">
        <FormField
          control={form.control}
          name="email"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="eg. jack@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

    <FormField
          control={form.control}
          name="password"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

            <FormField
          control={form.control}
          name="name"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>full Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="eg. jack smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit">Submit</Button>
        <span onClick={() => opeLog()} className="text-blue-500 font-bold hover:underline transition ease-in-out duration-300 cursor-pointer mx-auto">already here? Login</span>
    </form>
       </Form>
  </DialogContent>
     </Dialog>
  )
}

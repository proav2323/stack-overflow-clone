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


import { z } from "zod"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
 
const loginFormSchema = z.object({
    email: z.string().min(1, {
        message: "email is required"
    }).email({
        message: "email is not valid"
    }),
    password: z.string().min(8, {
        message: "password should longer than 8 charcters"
    })
})

export default function LoginModel() {
    const {type, isOpen, onClose, onOpen} = useModal();
    const [loading, setLoading] = useState(false)
    const open = type === "Login" && isOpen
    const router = useRouter();
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
       setLoading(true);
        signIn("credentials", {
            ...values,
            redirect: false
        }).then((callback) => {
            setLoading(false);
           if (callback?.ok) {
             Toast.success("logged in")
             onClose()
             router.refresh();
           }

           if (callback?.error) {
           Toast.error(callback.error)
           }
        })
    }

    const openReg = () => {
      onClose()
      onOpen("register")
    }
  return (
     <Dialog open={open} onOpenChange={() => onClose()}>
  <DialogContent className="max-h-[100vh] overflow-y-scroll noScroll flex-col w-full">
       <Heading title="Welcom Back :)" subtitle="login to your account" />
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
        <span className="text-blue-500 font-bold hover:underline transition ease-in-out duration-300 cursor-pointer w-fit mr-auto">Forgot Password</span>

        <Button disabled={loading} type="submit">Submit</Button>
        <span onClick={() => openReg()} className="text-blue-500 font-bold hover:underline transition ease-in-out duration-300 cursor-pointer mx-auto">new here? Register</span>
    </form>
       </Form>
  </DialogContent>
     </Dialog>
  )
}

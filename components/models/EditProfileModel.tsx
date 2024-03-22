"user client";

import { useModal } from "@/hooks/useModel";
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import Heading from "../Heading";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import { uploadImge } from "../Toolbar";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character long",
  }),
  about: z.string().min(10, {
    message: "About Me must be at least 10 characters long",
  }),
  image: z.string().min(1, {
    message: "Image must be at least 1 character long",
  }),
});

export default function EditProfileModel() {
  const { isOpen, type, data, onClose, onOpen } = useModal();
  const open = isOpen && type === "updateUser";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      about: "",
      image: "",
    },
  });

  useEffect(() => {
    if (data.currentUser) {
      form.setValue("name", data.currentUser.name);
      if (data.currentUser.about) {
        form.setValue("about", data.currentUser.about);
      }
      if (data.currentUser.image) {
        form.setValue("image", data.currentUser.image);
      }
    }
  }, [data.currentUser, form]);
  const image = form.watch("image");
  const [loading, setLoading] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [url, setUrl] = useState("");
  const picker = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const addImage = (e: any) => {
    const file = e.target.files[0];
    uploadImge(file, setUrl, setLoading);
  };

  useEffect(() => {
    form.setValue("image", url);
  }, [url, form]);
  if (!data.currentUser) {
    return (
      <Dialog open={open} onOpenChange={() => onClose()}>
        <DialogContent className='gap-2 flex-col flex w-full'>
          <Heading
            title='Your Are No Allowed! Login First'
            subtitle='login now'
          />
          <Button onClick={() => onOpen("Login")}>Login</Button>
        </DialogContent>
      </Dialog>
    );
  }
  const onSubmit = (value: z.infer<typeof formSchema>) => {
    if (data.currentUser) {
      setLoading(true);
      axios
        .put(`/api/updateUser/`, {
          name: value.name,
          about: value.about,
          image: value.image,
        })
        .then((data) => {
          toast.success("Updated Successfully");
          router.refresh();
          onClose();
        })
        .catch((data) => {
          toast.error(data.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className='flex flex-col justify-start items-start w-full gap-2'>
        <Heading title='Edit Profile' subtitle='tell us about yourself' />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-9 flex flex-col w-full px-2'
          >
            <FormField
              control={form.control}
              name='name'
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} placeholder={"Name"} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='about'
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Me</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      {...field}
                      placeholder={"tell us about yourself"}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='flex flex-col justify-start items-center w-full'>
              {image ? (
                <div className='flex flex-col relative w-60 h-60'>
                  <Image
                    src={image}
                    alt=''
                    fill
                    className='cursor-pointer hover:opacity-75 hover:scale-105'
                    onClick={() => form.setValue("image", "")}
                  />
                </div>
              ) : (
                <>
                  <input
                    ref={picker}
                    type='file'
                    hidden
                    onChange={(e) => addImage(e)}
                  />
                  <Button
                    className='w-full'
                    disabled={loading}
                    type='button'
                    onClick={() => picker.current?.click()}
                  >
                    Pick Image
                  </Button>
                </>
              )}
            </div>

            <Button type='submit' disabled={loading} className='w-full'>
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

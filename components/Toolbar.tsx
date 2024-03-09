"use client"

import { Editor } from '@tiptap/react'
import React, { useState } from 'react'
import { Button } from './ui/button';
import { Bold, Code, CodeSquare, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Image, ImageIcon, Italic, Link, List, Quote, Underline } from 'lucide-react';
import { Toggle } from './ui/toggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Heading from './Heading';
import { Input } from './ui/input';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase';

export const uploadImge = (file: any, setUrl: any, setLoad: any, setEdit?: any) => {
 setLoad(true);

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }

    setLoad(false);
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setUrl(downloadURL);

      if (setEdit) {
        setEdit()
      }

    setLoad(false);
    });
  }
);
}

export default function Toolbar({editor, content, edit}: {editor: Editor | null, content: string, edit: boolean}) {
  const [link, setLink] = useState("")
  const [imgUrl, setImagUrl] = useState("")
  const [load, setLoad] = useState(false)
    if (!editor || !edit) {
        return null;
    }

    const setELink = () => {
      if (link !== "") {
          editor.chain().focus().toggleLink({href: link, target: "_blank"}).run()
          setLink("")
      }
    }

    const setEImage = () => {
      if (imgUrl !== "") {
      editor.chain().focus().setImage({ src: imgUrl }).run()
          setImagUrl("")
      }
    }

    const upload = (e: any) => {
       const file = e.target.files[0];
       
       if (file) {
        uploadImge(file, setImagUrl, setLoad, setEImage)
       }
    }

    const map = [
        <Heading1 size={16} key={1} />,
        <Heading2 size={16} key={2}/>,
        <Heading3 size={16} key={3}/>,
        <Heading4 size={16} key={4}/>,
        <Heading5 size={16} key={5}/>,
        <Heading6 size={16} key={6}/>,
    ]
  return (
    <div className='flex-row flex py-1 px-2 dark:border-slate-800 border-slate-200 border-[1px] rounded-t-md gap-1 mt-2 flex-wrap justify-center items-center'>
      <Button type='button' onClick={() => {
        editor.chain().focus().toggleBold().run()
      }} variant={editor.isActive("bold") ? "secondary": "ghost"}><Bold size={14} /></Button>

      <Button type='button' onClick={() => {
        editor.chain().focus().toggleItalic().run()
      }} variant={editor.isActive("italic") ? "secondary": "ghost"}><Italic size={14} /></Button>

      <Button type='button' onClick={() => {
        editor.chain().focus().toggleUnderline().run()
      }} variant={editor.isActive("underline") ? "secondary": "ghost"}><Underline size={14} /></Button>

      <Button type='button' onClick={() => {
        editor.chain().focus().toggleHeading({level: 1}).run()
      }} variant={editor.isActive("heading", {level: 1}) ? "secondary": "ghost"}>{map[0]}</Button>

      <Button type='button' onClick={() => {
        editor.chain().toggleCode().run()
      }} variant={editor.isActive("code") ? "secondary": "ghost"}><Code size={16} /></Button>

            <Button type='button' onClick={() => {
        editor.chain().toggleCodeBlock().run()
      }} variant={editor.isActive("codeblock") ? "secondary": "ghost"}><CodeSquare size={16} /></Button>

                  <Button type='button' onClick={() => {
        editor.chain().toggleBlockquote().run()
      }} variant={editor.isActive("blockquote") ? "secondary": "ghost"}><Quote size={16} /></Button>
      <Popover>
  <PopoverTrigger asChild>
                  <Button type='button' variant={"ghost"}><Link size={16} /></Button>
  </PopoverTrigger>
  <PopoverContent className='md:w-[25vw] w-[60vw] flex flex-col gap-2'>
       <Heading title='Add A Link' />
       <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder='Link' />
       <Button className='w-full' onClick={() => setELink()}>Add</Button>
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button type='button' variant={"ghost"}><ImageIcon size={16} /></Button>
  </PopoverTrigger>
  <PopoverContent>
       <Heading title='Add A image' />
       <Input disabled={load} type="file" onChange={(e) => upload(e)} id="upoad from device" />
  </PopoverContent>
</Popover>


    </div>
  )
}

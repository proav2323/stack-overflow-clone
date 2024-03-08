"use client"

import { Editor } from '@tiptap/react'
import React from 'react'
import { Button } from './ui/button';
import { Bold, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, Underline } from 'lucide-react';
import { Toggle } from './ui/toggle';

export default function Toolbar({editor, content}: {editor: Editor | null, content: string}) {
    if (!editor) {
        return null;
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
    </div>
  )
}

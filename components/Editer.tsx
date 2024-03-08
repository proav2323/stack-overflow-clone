'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Toolbar from './Toolbar'
import Heading from '@tiptap/extension-heading'

const Editer = ({value, setValue, id}: {value: string, setValue: (id: "description" | "expectation", value: string) => void, id: "description" | "expectation"}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({
        HTMLAttributes: {
            class: "text-2xl",
            levels: [1, 2, 3, 4, 5, 6],
        }
      })
    ],
    editorProps: {
        attributes: {
            class: "flex-col flex py-2 px-4 dark:border-slate-800 border-slate-200 border-[1px] rounded-b-md outline-none"
        }
    },
    onUpdate: ({editor}) => {
        setValue(id, editor.getHTML())
    },
    
  })

  return (
    <div className='flex flex-col w-full'>
    <Toolbar editor={editor} content={value} />
    <EditorContent style={{whiteSpace: "pre-line"}} editor={editor} />
  </div>
  )
}

export default Editer;
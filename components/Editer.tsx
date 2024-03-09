'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Toolbar from './Toolbar'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { useEffect } from 'react'

const Editer = ({value, setValue, id, edit, classN = "flex-col flex py-2 px-4 dark:border-slate-800 border-slate-200 border-[1px] rounded-b-md outline-none"}: {value: string, setValue: ((id: "description" | "expectation", value: string) => void) | undefined, id: "description" | "expectation" | undefined, edit: boolean, classN?: string}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class: "dark:bg-slate-600 shadow-2xl bg-slate-200 py-1 px-2 rounded-md"
          }
        },
        code: {
          HTMLAttributes: {
             class: "dark:bg-slate-600 shadow-2xl bg-slate-200 py-1 px-2 rounded-md"
          }
        },
        blockquote: {
          HTMLAttributes: {
            class: "dark: border-l-[5px] dark:border-slate-600 border-slate-200 px-2 py-1"
          }
        },
      }),
      Underline,
      Heading.configure({
        HTMLAttributes: {
            class: "text-2xl",
            levels: [1],
        }
      }),
      Link.configure({
        linkOnPaste: true,
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          class: "text-blue-500"
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: ""
        }
      })
    ],
    editorProps: {
        attributes: {
            class: classN
        }
    },
    onUpdate: ({editor}) => {
      if (setValue !== undefined && id !== undefined) {
        setValue(id, editor.getHTML())
      }
    },
    editable: edit,
    content: value,
  })

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.setEditable(edit)

    if (!edit) {
    editor.commands.setContent(value);
    }
  }, [edit, editor, value])

  return (
  <div className='flex flex-col w-full'>
    <Toolbar editor={editor} content={value} edit={edit} />
    <EditorContent style={{whiteSpace: "pre-line"}} editor={editor} />
  </div>
  )
}

export default Editer;
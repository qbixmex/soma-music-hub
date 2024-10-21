'use client';

import { FC } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toolbar } from './toolbar.component';
import './editor.css';

type Props = {
  defaultContent: string;
  onChange: (richText: string) => void;
};

export const Editor: FC<Props> = ({ defaultContent, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: defaultContent,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      // console.log(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <section>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </section>
  )
}

export default Editor;

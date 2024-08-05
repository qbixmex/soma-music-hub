"use client";

import { FC } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Paragraph from '@tiptap/extension-paragraph';
import ListItem from '@tiptap/extension-list-item';
import Toolbar from "./tiptap-toolbar";
import Bold from '@tiptap/extension-bold';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import "./tiptap-editor.css";

import { common, createLowlight } from 'lowlight';

const lowlight = createLowlight(common);

type Props = {
  content: string;
  onChange: (text: string) => void;
};

const Editor: FC<Props> = ({ content, onChange }) => {

  const handleChange = (newContent: string) => onChange(newContent);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        bold: false,
        codeBlock: false,
        listItem: false,
      }),
      Underline,
      CustomBold,
      Paragraph,
      CodeBlockLowlight.configure({ lowlight }),
      ListItem,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // console.log(html); Debug
      handleChange(html);
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <Toolbar editor={editor} />
      <div className="border border-slate-800 rounded-md">
        <EditorContent
          className="max-h-[400px] overflow-y-scroll"
          editor={editor}
        />
      </div>
    </div>
  );

};

const CustomBold = Bold.extend({
  renderHTML({ HTMLAttributes }) {
    // Original:
    // return ['strong', HTMLAttributes, 0]
    return ['b', HTMLAttributes, 0]
  },
});

export default Editor;

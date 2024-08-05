import { FC } from "react";
import { Editor } from "@tiptap/react";

import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Heading4,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  CodeXml,
  ArrowUpAZ,
  Pilcrow,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  editor: Editor | null;
};

const Toolbar: FC<Props> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 border p-3 rounded-md">
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('bold') ? "info" : 'secondary'}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('strike') ? "info" : 'secondary'}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('italic') ? "info" : 'secondary'}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('paragraph') ? "info" : 'secondary'}
        onClick={() => editor?.chain().focus().setParagraph().run()}
      >
        <Pilcrow size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('bulletList') ? "info" : 'secondary'}
        onClick={() => {
          editor?.chain().focus().toggleBulletList().run();
        }}
      >
        <List size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('orderedList') ? "info" : 'secondary'}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('listItem') ? "info" : 'secondary'}
        onClick={() => editor.chain().focus().liftListItem('listItem').run()}
        disabled={!editor.can().liftListItem('listItem')}
      >
        <ArrowUpAZ size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('heading', { level: 2 }) ? "info" : 'secondary'}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('heading', { level: 3 }) ? "info" : 'secondary'}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('heading', { level: 4 }) ? "info" : 'secondary'}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
      >
        <Heading4 size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('underline') ? "info" : 'secondary'}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <Underline size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('blockquote') ? "info" : 'secondary'}
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('undo') ? "info" : 'secondary'}
        onClick={() => editor?.chain().focus().undo().run()}
      >
        <Undo size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={ editor?.isActive('redo') ? "info" : 'secondary'}
        onClick={() => editor?.chain().focus().redo().run()}
      >
        <Redo size={16} />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={editor?.isActive('codeBlock') ? 'info': "secondary"}
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
      >
        { editor?.isActive('codeBlock')
          ? <CodeXml size={16} />
          : <Code size={16} /> }
      </Button>
    </div>
  );

};

export default Toolbar;

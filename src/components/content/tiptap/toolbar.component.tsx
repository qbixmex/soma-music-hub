import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { type Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  // Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  SquareSplitVertical as HorizontalLine,
  RemoveFormatting,
  Undo,
  Redo,
} from "lucide-react";
import { FaParagraph as Paragraph } from "react-icons/fa6";
import clsx from 'clsx';

type Props = {
  editor: Editor | null;
};

export const Toolbar: FC<Props> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 p-5 border border-slate-700 rounded-t-lg">
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={clsx({ 'is-active': editor.isActive('bold') })}
        variant="secondary"
        title="Bold Text"
      >
        <Bold />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={clsx({ 'is-active': editor.isActive('italic') })}
        variant="secondary"
        title="Italic Text"
      >
        <Italic />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={clsx({ 'is-active': editor.isActive('paragraph') })}
        variant="secondary"
        title="Paragraph"
      >
        <Paragraph />
      </Button>

      {/* <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={clsx({ 'is-active': editor.isActive('heading', { level: 1 }) })}
        variant="secondary"
        title="Heading 1"
      >
        <Heading1 />
      </Button> */}
      
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={clsx({ 'is-active': editor.isActive('heading', { level: 2 }) })}
        variant="secondary"
        title="Heading 2"
      >
        <Heading2 />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={clsx({ 'is-active': editor.isActive('heading', { level: 3 }) })}
        variant="secondary"
        title="Heading 3"
      >
        <Heading3 />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={clsx({ 'is-active': editor.isActive('heading', { level: 4 }) })}
        variant="secondary"
        title="Heading 4"
      >
        <Heading4 />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={clsx({ 'is-active': editor.isActive('heading', { level: 5 }) })}
        variant="secondary"
        title="Heading 5"
      >
        <Heading5 />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={clsx({ 'is-active': editor.isActive('heading', { level: 6 }) })}
        variant="secondary"
        title="Heading 6"
      >
        <Heading6 />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={clsx({ 'is-active': editor.isActive('bulletList') })}
        variant="secondary"
        title="Bullet List"
      >
        <List />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={clsx({ 'is-active': editor.isActive('orderedList') })}
        variant="secondary"
        title="Order List"
      >
        <ListOrdered />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        variant="secondary"
        title="Horizontal Line"
      >
        <HorizontalLine />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
        variant="secondary"
        title="Remove Formatting"
      >
        <RemoveFormatting />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        variant="secondary"
        title="Undo"
      >
        <Undo />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        variant="secondary"
        title="Redo"
      >
        <Redo />
      </Button>
    </div>
  );
};

export default Toolbar;
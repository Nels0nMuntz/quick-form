import { useEditorState } from "@tiptap/react";
import { ToolbarButton } from "../toolbar-button";
import { useTiptapContext } from "../tiptap-provider";
import { ItalicIcon } from "lucide-react";

export function Italic() {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("italic"),
        disabled: !ctx.editor.can().toggleItalic(),
      };
    },
  });

  return (
    <ToolbarButton
      icon={<ItalicIcon />}
      accesibleName="Italic"
      onClick={() => editor.chain().focus().toggleItalic().run()}
      {...state}
    />
  );
}

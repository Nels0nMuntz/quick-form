import { useEditorState } from "@tiptap/react";
import { ToolbarButton } from "../toolbar-button";
import { useTiptapContext } from "../tiptap-provider";
import { UnderlineIcon } from "lucide-react";

export function Underline() {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("underline"),
        disabled: !ctx.editor.can().toggleUnderline(),
      };
    },
  });

  return (
    <ToolbarButton
      icon={<UnderlineIcon />}
      accesibleName="Underline"
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      {...state}
    />
  );
}

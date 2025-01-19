import { useEditorState } from "@tiptap/react";
import { ToolbarButton } from "../toolbar-button";
import { useTiptapContext } from "../tiptap-provider";
import { BoldIcon } from "lucide-react";

export function Bold() {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("bold"),
        disabled: !ctx.editor.can().toggleBold(),
      };
    },
  });

  return (
    <ToolbarButton
      icon={<BoldIcon />}
      accesibleName="Bold"
      onClick={() => editor.chain().focus().toggleBold().run()}
      {...state}
    />
  );
}

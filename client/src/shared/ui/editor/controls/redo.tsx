import React from "react";
import { useEditorState } from "@tiptap/react";
import { ToolbarButton } from "../toolbar-button";
import { useTiptapContext } from "../tiptap-provider";
import { Redo2 } from "lucide-react";

export function Redo() {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      disabled: !ctx.editor.can().redo(),
    }),
  });

  return (
    <ToolbarButton
      icon={<Redo2 />}
      accesibleName="Redo"
      onClick={() => editor.chain().focus().redo().run()}
      {...state}
    />
  );
}

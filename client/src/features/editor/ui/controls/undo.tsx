import React from "react";
import { useEditorState } from "@tiptap/react";
import { Undo2 } from "lucide-react";
import { ToolbarButton } from "../toolbar-button";
import { useTiptapContext } from "../tiptap-provider";

export function Undo() {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      disabled: !ctx.editor.can().undo(),
    }),
  });

  return (
    <ToolbarButton
      icon={<Undo2 />}
      onClick={() => editor.chain().focus().undo().run()}
      accesibleName="Undo"
      {...state}
    />
  );
}

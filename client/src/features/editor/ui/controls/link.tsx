import { Link as LinkIcon } from "lucide-react";
import { useEditorState } from "@tiptap/react";
import { ToolbarButton } from "../toolbar-button";
import { useTiptapContext } from "../tiptap-provider";
import { useCallback } from "react";

export function Link() {
  const { editor } = useTiptapContext();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      active: ctx.editor.isActive("link"),
      disabled: !ctx.editor.can().setLink({ href: "" }),
    }),
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e: any) {
      alert(e.message);
    }
  }, [editor]);

  return (
    <ToolbarButton
      icon={<LinkIcon />}
      accesibleName="Link"
      onClick={setLink}
      {...state}
    />
  );
}

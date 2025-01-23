import { ToolbarButton } from "../toolbar-button";
import { useTiptapContext } from "../tiptap-provider";
import { RotateCcw } from "lucide-react";

export function Reset() {
  const { editor } = useTiptapContext();

  return (
    <ToolbarButton
      icon={<RotateCcw />}
      accesibleName="Remove formatting"
      onClick={() => editor.commands.unsetAllMarks()}
    />
  );
}

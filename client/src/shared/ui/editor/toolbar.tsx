import React from "react";
import { Undo } from "./controls/undo";
import { Redo } from "./controls/redo";
import { Bold } from "./controls/bold";
import { Italic } from "./controls/italic";
import { Underline } from "./controls/underline";
import { ToolbarDivider } from "./toolbar-divider";
import { Link } from "./controls/link";
import { cn } from "@/shared/lib";
import { Reset } from "./controls/reset";

interface Props {
  visible: boolean;
}

export function Toolbar({ visible }: Props) {
  return (
    <div
      className={cn(
        "max-h-0 gap-x-1 gap-y-1 overflow-hidden bg-white transition-all duration-300",
        visible && "max-h-12",
      )}
    >
      <div className="flex flex-wrap items-center p-1.5">
        <Undo />
        <Redo />

        <ToolbarDivider />

        <Bold />
        <Italic />
        <Underline />
        <Reset />

        <ToolbarDivider />

        <Link />
      </div>
    </div>
  );
}

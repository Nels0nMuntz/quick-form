import { cn } from "@/shared/lib";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  active?: boolean;
  top?: boolean;
}

export function Paper({ top, active, children }: Props) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[780px] overflow-hidden rounded-md border border-gray-200 bg-white p-6",
        "before:absolute before:left-0 before:right-0 before:top-0 before:h-2 before:bg-white before:transition-colors",
        "after:absolute after:bottom-0 after:left-0 after:top-0 after:w-2 after:bg-transparent after:transition-colors",
        top && "before:bg-sky",
        active && "after:bg-sky",
      )}
    >
      {children}
    </div>
  );
}

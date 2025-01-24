import { cn } from "@/shared/lib";

interface Props {
  variant: "horizontal" | "vertical";
  className?: string;
}

export function Devider({ variant, className }: Props) {
  const vertical = variant === "vertical";
  const horizontal = variant === "horizontal";
  return (
    <div
      className={cn(
        "bg-midnight/20",
        vertical && "w-px mx-1",
        horizontal && "h-px w-full my-1",
        className,
      )}
    />
  );
}

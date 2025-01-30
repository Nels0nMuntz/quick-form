import { cva, type VariantProps } from "class-variance-authority";
import { Button as BaseButton } from "../shadcn-ui/button";
import { cn } from "@/shared/lib/shadcn-utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva("w-full h-auto", {
  variants: {
    variant: {
      default: "bg-sky text-white hover:bg-sky/85",
      // destructive:
      //   "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline:
        "border border-sky bg-background shadow-sm text-sky hover:bg-accent hover:text-sky",
      // secondary:
      //   "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost:
        "hover:bg-accent text-midnight hover:text-midnight shadow-none bg-transparent",
      // link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
}

export function Button({
  variant,
  className,
  children,
  asChild,
  disabled,
  loading,
  size,
  ...props
}: Props) {
  return (
    <BaseButton
      className={cn(buttonVariants({ variant, size }), className)}
      asChild={asChild}
      disabled={disabled || loading}
      size={size}
      {...props}
    >
      <>
        {loading ? <Loader2 className="animate-spin" width={20} height={20}/> : null}
        {!loading && children}
      </>
    </BaseButton>
  );
}

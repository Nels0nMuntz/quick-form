import { cva, type VariantProps } from "class-variance-authority";
import { Button as BaseButton } from "../shadcn-ui/button";
import { cn } from "@/shared/lib/utils";

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
      // ghost: "hover:bg-accent hover:text-accent-foreground",
      // link: "text-primary underline-offset-4 hover:underline",
    },
    //   size: {
    //     default: "h-9 px-4 py-2",
    //     sm: "h-8 rounded-md px-3 text-xs",
    //     lg: "h-10 rounded-md px-8",
    //     icon: "h-9 w-9",
    //   },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ variant, className, children, asChild }: Props) {
  return (
    <BaseButton
      className={cn(buttonVariants({ variant }), className)}
      asChild={asChild}
    >
      {children}
    </BaseButton>
  );
}

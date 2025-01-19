import { cn } from "@/shared/lib";
import { BaseButton } from "@/shared/ui";

interface Props {
  icon: React.ReactNode;
  accesibleName: string;
  disabled?: boolean;
  className?: string;
  active?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function ToolbarButton({
  icon,
  accesibleName,
  disabled,
  className,
  active,
  onClick,
}: Props) {
  return (
    <BaseButton
      variant="ghost"
      size="icon"
      type="button"
      onFocusCapture={(e) => e.stopPropagation()}
      disabled={disabled}
      className={cn(className, active && "bg-accent")}
      aria-label={accesibleName}
      title={accesibleName}
      onClick={onClick}
    >
      {icon}
    </BaseButton>
  );
}

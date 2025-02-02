import { cn } from "@/shared/lib";

interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

export function QuestionsList<T>({ items, renderItem, className }: Props<T>) {
  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      {items.map((item) => renderItem(item))}
    </div>
  );
}

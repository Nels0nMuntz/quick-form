import { Paper } from "@/shared/ui";

interface Props {
  title: React.ReactNode;
  body: React.ReactNode;
  actions: React.ReactNode;
  dropdown: React.ReactNode;
}

export function QuestionLayout({ title, body, actions, dropdown }: Props) {
  return (
    <Paper>
      <div className="flex flex-col gap-y-4">
        <div className="grid grid-cols-1 gap-x-[5%] md:grid-cols-[70%,_25%]">
          {title}
          {dropdown}
        </div>
        <div>{body}</div>
        <div className="flex justify-end gap-x-3 border-t border-midnight/20 p-2 pb-0">
          {actions}
        </div>
      </div>
    </Paper>
  );
}

import { Paper } from "@/shared/ui";

interface Props {
  title: React.ReactNode;
  body: React.ReactNode;
  actions: React.ReactNode;
  typePicker: React.ReactNode;
}

export function QuestionLayout({ title, body, actions, typePicker }: Props) {
  return (
    <Paper>
      <div className="flex flex-col gap-y-4">
        <div className="grid grid-cols-1 gap-x-[5%] md:grid-cols-[70%,_25%]">
          {title}
          {typePicker}
        </div>
        <div>{body}</div>
        <div className="flex justify-end gap-x-2 border-t border-midnight/20 p-2">
          {actions}
        </div>
      </div>
    </Paper>
  );
}

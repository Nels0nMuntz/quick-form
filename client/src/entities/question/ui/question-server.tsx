import { EditField, Paper } from "@/shared/ui";
import { ServerQuestionComponentProps } from "../model/types";

export function QuestionServer({ title, body }: ServerQuestionComponentProps) {
  return (
    <Paper>
      <div className="flex flex-col gap-y-4">
        <div className="grid grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-[1fr,_14rem] md:gap-x-6 md:gap-y-0">
          <EditField
            initialValue={title}
            type="heading"
            readonly
          />
        </div>
        <div>{body}</div>
      </div>
    </Paper>
  );
}

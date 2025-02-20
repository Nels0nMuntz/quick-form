import { memo } from "react";
import {
  useFormQuestion,
  useFormActions,
  EditorJSONContent,
} from "@/shared/model";
import { EditField, Paper } from "@/shared/ui";
import { ClientQuestionComponentProps } from "../model/types";
import { useEditorMode } from "@/shared/lib";

export const QuestionClient = memo(
  ({ id, actions, dropdown, body }: ClientQuestionComponentProps) => {
    const editorMode = useEditorMode();
    const data = useFormQuestion(id);
    const { setQuestionTitle } = useFormActions();
    const updateTitle = (json: EditorJSONContent) => {
      setQuestionTitle(id, json);
    };
    return (
      <Paper>
        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-[1fr,_14rem] md:gap-x-6 md:gap-y-0">
            <EditField
              initialValue={data.title}
              onChange={updateTitle}
              type="heading"
              readonly={editorMode === "preview"}
            />
            {dropdown}
          </div>
          <div>{body}</div>
          {actions && (
            <div className="flex justify-end gap-x-3 border-t border-midnight/20 p-2 pb-0">
              {actions}
            </div>
          )}
        </div>
      </Paper>
    );
  },
);

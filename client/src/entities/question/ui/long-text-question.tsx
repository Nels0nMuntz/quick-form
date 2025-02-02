import React, { memo } from "react";
import { JSONContent } from "@tiptap/react";
import { useFormQuestion, useFormActions } from "@/shared/model";
import { EditField } from "@/shared/ui";
import { QuestionLayout } from "./question-layout";
import { FormQuestion, QuestionComponentProps } from "../model/types";
import { useEditorMode } from "@/shared/lib";

export const LongTextQuestion = memo(
  ({ id, actions, dropdown, body }: QuestionComponentProps) => {
    const editorMode = useEditorMode();
    const data = useFormQuestion(id) as FormQuestion<"Long text">;
    const { setQuestion } = useFormActions();
    const updateTitle = (json: JSONContent) => {
      setQuestion({
        ...data,
        title: json,
      });
    };
    return (
      <QuestionLayout
        title={
          <EditField
            initialValue={data.title}
            onChange={updateTitle}
            type="heading"
            readonly={editorMode === "preview"}
          />
        }
        body={body}
        actions={actions}
        dropdown={dropdown}
      />
    );
  },
);

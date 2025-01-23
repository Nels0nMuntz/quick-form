import React, { memo } from "react";
import { JSONContent } from "@tiptap/react";
import { useFormQuestion, useFormActions } from "@/shared/model";
import { EditField } from "@/shared/ui";
import { QuestionLayout } from "./question-layout";
import { FormQuestion, QuestionComponentProps } from "../model/types";

export const ShortTextQuestion = memo(
  ({ id }: QuestionComponentProps) => {
    const data = useFormQuestion(id) as FormQuestion<"Short text">;
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
          />
        }
        body={<EditField initialValue={data.body} onChange={updateTitle} />}
        actions={<div>actions</div>}
        typePicker={<div>typePicker</div>}
      />
    );
  },
);

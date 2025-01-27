"use client";
import { memo, useId } from "react";
import { Label } from "@/shared/ui";
import { Switch } from "@/shared/ui";
import { useFormActions, useFormQuestion } from "@/shared/model";

interface Props {
  questionId: string;
}

export const RequiredQuestionToggle: React.FC<Props> = memo(
  ({ questionId }) => {
    const id = useId();
    const question = useFormQuestion(questionId);
    const { toggleRequired } = useFormActions();
    const handleChange = () => toggleRequired(questionId);
    return (
      <div className="flex items-center space-x-2">
        <Label htmlFor={id}>Required</Label>
        <Switch
          id={id}
          checked={question.required}
          onCheckedChange={handleChange}
        />
      </div>
    );
  },
);

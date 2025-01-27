"use client";
import { memo } from "react";
import { Trash2 } from "lucide-react";
import { BaseButton } from "@/shared/ui";
import { useFormActions } from "@/shared/model";

interface Props {
  questionId: string;
}

export const DeleteQuestionButton: React.FC<Props> = memo(({ questionId }) => {
  const { deleteQuestion } = useFormActions();
  const handleClick = () => deleteQuestion(questionId);
  return (
    <BaseButton variant="ghost" size="icon" onClick={handleClick}>
      <Trash2 />
    </BaseButton>
  );
});

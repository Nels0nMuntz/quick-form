import { memo } from "react";
import { Copy } from "lucide-react";
import { BaseButton } from "@/shared/ui";
import { useFormActions } from "@/shared/model";

interface Props {
  questionId: string;
}

export const CopyQuestionButton: React.FC<Props> = memo(({ questionId }) => {
  const { copyQuestion } = useFormActions();
  const handleClick = () => copyQuestion(questionId);
  return (
    <BaseButton variant="ghost" size="icon" onClick={handleClick}>
      <Copy />
    </BaseButton>
  );
});

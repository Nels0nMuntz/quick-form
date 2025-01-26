import { memo } from "react";
import { X } from "lucide-react";
import { useFormActions } from "@/shared/model";
import { BaseButton } from "@/shared/ui";

interface Props {
  questionId: string;
  optionId: string;
}

export const DeleteOption: React.FC<Props> = memo(
  ({ questionId, optionId }) => {
    const { deleteOption } = useFormActions();
    const handleClick = () => deleteOption(questionId, optionId);
    return (
      <BaseButton size="icon" variant="ghost" onClick={handleClick}>
        <X className="flex-shrink-0" />
      </BaseButton>
    );
  },
);

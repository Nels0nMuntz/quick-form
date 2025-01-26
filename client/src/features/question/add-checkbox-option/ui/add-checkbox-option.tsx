import { memo } from "react";
import { Square } from "lucide-react";
import { useFormActions } from "@/shared/model";
import { BaseButton } from "@/shared/ui";

interface Props {
  questionId: string;
}

export const AddCheckboxOption: React.FC<Props> = memo(({ questionId }) => {
  const { addOption } = useFormActions();
  const handleClick = () => addOption(questionId);
  return (
    <div className="flex w-full gap-x-2">
      <Square className="flex-shrink-0 text-gray-400" size={20} />
      <BaseButton
        variant="link"
        className="h-auto p-0 text-sm leading-6 text-gray-400"
        onClick={handleClick}
      >
        Add option
      </BaseButton>
    </div>
  );
});

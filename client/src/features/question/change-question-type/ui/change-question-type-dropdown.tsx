"use client";
import { memo, useState } from "react";
import {
  BaseButton,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui";
import {
  AlignLeft,
  Text,
  CircleCheck,
  ArrowDownCircle,
  ChevronDown,
} from "lucide-react";
import { FormQuestionsTypes } from "@/entities/question";
import { useFormActions, useFormQuestion } from "@/shared/model";
import { cn } from "@/shared/lib";

interface Props {
  questionId: string;
}

const typeNames: Record<FormQuestionsTypes, string> = {
  "Short text": "Short answer",
  "Long text": "Paragraph",
  Checkbox: "Checkbox",
  Dropdown: "Dropdown",
};
const typeIcons: Record<FormQuestionsTypes, React.ReactNode> = {
  "Short text": <AlignLeft />,
  "Long text": <Text />,
  Checkbox: <CircleCheck />,
  Dropdown: <ArrowDownCircle />,
};

export const ChangeQuestionTypeDropdown: React.FC<Props> = memo(
  ({ questionId }) => {
    const { type } = useFormQuestion(questionId);
    const { changeQuestionType } = useFormActions();
    const [open, setOpen] = useState(false);
    const handleOpen = (open: boolean) => setOpen(open);
    const handleClick = (type: FormQuestionsTypes) => {
      changeQuestionType(questionId, type);
    };
    return (
      <DropdownMenu open={open} onOpenChange={handleOpen}>
        <DropdownMenuTrigger asChild>
          <BaseButton
            className="flex w-56 items-center justify-between gap-x-2"
            variant="outline"
          >
            {typeIcons[type]}
            <span>{typeNames[type]}</span>
            <ChevronDown
              className={`transform transition-transform ${open ? "rotate-180" : ""}`}
            />
          </BaseButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {Object.entries(typeNames).map(([itemType, itemName], index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => handleClick(itemType as FormQuestionsTypes)}
              className={cn(
                itemType === type && "bg-accent text-accent-foreground",
              )}
            >
              {typeIcons[itemType as FormQuestionsTypes]}
              {itemName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

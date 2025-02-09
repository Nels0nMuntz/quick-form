"use client";
import { memo, useState } from "react";
import {
  BaseButton,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { FormQuestion } from "@/entities/question";
import {
  QuestionBodyProps,
  useFormActions,
  useFormQuestion,
} from "@/shared/model";
import { cn } from "@/shared/lib";

export const ShortTextQuestionBody: React.FC<QuestionBodyProps> = memo(() => {
  return (
    <div className="max-w-80">
      <input
        placeholder="Sort answer text"
        className="w-full border-b border-midnight/20 bg-transparent transition-colors focus-visible:border-midnight focus-visible:outline-none"
      />
    </div>
  );
});

export const LongTextQuestionBody: React.FC<QuestionBodyProps> = memo(() => {
  return (
    <input
      placeholder="Long answer text"
      className="w-full border-b border-midnight/20 bg-transparent transition-colors focus-visible:border-midnight focus-visible:outline-none"
    />
  );
});

export const CheckboxQuestionBody: React.FC<QuestionBodyProps> = memo(
  ({ questionId }) => {
    const question = useFormQuestion(questionId) as FormQuestion<"Checkbox">;
    return (
      <div className="flex flex-col gap-y-4">
        {question.options.map((option) => (
          <div className="flex w-full justify-between gap-x-2" key={option.id}>
            <div className="flex items-center space-x-2">
              <Checkbox id={option.id} name={questionId} value={option.value} />
              <label
                htmlFor={option.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.value}
              </label>
            </div>
          </div>
        ))}
      </div>
    );
  },
);

export const DropdownQuestionBody: React.FC<QuestionBodyProps> = memo(
  ({ questionId }) => {
    const question = useFormQuestion(questionId) as FormQuestion<"Checkbox">;
    const [open, setOpen] = useState(false);
    const [activeOption, setActiveOption] = useState("Choose");
    const handleOpen = (open: boolean) => setOpen(open);
    const handleClick = (value: string) => {
      setActiveOption(value);
    };
    return (
      <DropdownMenu open={open} onOpenChange={handleOpen}>
        <DropdownMenuTrigger asChild>
          <BaseButton
            className="flex w-56 items-center justify-between gap-x-2"
            variant="outline"
          >
            {activeOption}
          </BaseButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {question.options.map(({ value, id }) => (
            <DropdownMenuItem
              key={id}
              onClick={() => handleClick(value)}
              className={cn(
                value === activeOption && "bg-accent text-accent-foreground",
              )}
            >
              {value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

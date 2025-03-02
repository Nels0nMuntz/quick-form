"use client";
import { memo } from "react";
import { Square } from "lucide-react";
import { Input } from "@/shared/ui";
import { FormQuestion } from "@/entities/question";
import {
  QuestionBodyProps,
  useFormActions,
  useFormQuestion,
} from "@/shared/model";
import { AddCheckboxOption, DeleteOption } from "@/features/question";

export const ShortTextQuestionBody: React.FC<QuestionBodyProps> = memo(() => {
  return (
    <div className="max-w-80">
      <input
        placeholder="Short answer text"
        className="w-full border-b border-midnight/20 bg-transparent focus-visible:outline-none"
        disabled={true}
        aria-hidden="true"
        readOnly
      />
    </div>
  );
});

export const LongTextQuestionBody: React.FC<QuestionBodyProps> = memo(() => {
  return (
    <input
      placeholder="Long answer text"
      className="w-full border-b border-midnight/20 bg-transparent focus-visible:outline-none"
      disabled={true}
      aria-hidden="true"
      readOnly
    />
  );
});

export const CheckboxQuestionBody: React.FC<QuestionBodyProps> = memo(
  ({ questionId }) => {
    const question = useFormQuestion(questionId) as FormQuestion<"Checkbox">;
    const { updateOption } = useFormActions();
    const handleChangeOption = (optionId: string, value: string) => {
      updateOption(question.id, optionId, value);
    };
    return (
      <div className="flex flex-col gap-y-2">
        {question.options.map((option) => (
          <div className="flex w-full justify-between gap-x-2" key={option.id}>
            <div className="relative flex flex-grow items-center gap-x-2">
              <Square
                className="absolute top-2 flex-shrink-0 text-gray-400"
                size={20}
              />
              <div className="flex-grow pl-9">
                <Input
                  value={option.value}
                  onChange={(e) =>
                    handleChangeOption(option.id, e.target.value)
                  }
                  className=""
                />
              </div>
            </div>
            <DeleteOption questionId={question.id} optionId={option.id} />
          </div>
        ))}
        <AddCheckboxOption questionId={question.id} />
      </div>
    );
  },
);

export const DropdownQuestionBody: React.FC<QuestionBodyProps> = memo(
  ({ questionId }) => {
    const question = useFormQuestion(questionId) as FormQuestion<"Checkbox">;
    const { updateOption } = useFormActions();
    const handleChangeOption = (optionId: string, value: string) => {
      updateOption(question.id, optionId, value);
    };
    return (
      <div className="flex flex-col gap-y-2">
        {question.options.map((option, index) => (
          <div className="flex w-full items-center gap-x-3" key={option.id}>
            <span className="w-6 flex-shrink-0 text-base leading-7 text-gray-500">
              {index + 1}.
            </span>
            <Input
              value={option.value}
              onChange={(e) => handleChangeOption(option.id, e.target.value)}
              className="flex-grow"
            />
            <DeleteOption questionId={question.id} optionId={option.id} />
          </div>
        ))}
        <AddCheckboxOption questionId={question.id} />
      </div>
    );
  },
);

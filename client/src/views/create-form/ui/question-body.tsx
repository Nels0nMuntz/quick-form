"use client";
import { memo } from "react";
import { Square } from "lucide-react";
import { EditField } from "@/shared/ui";
import { FormQuestion } from "@/entities/question";
import {
  EditorJSONContent,
  useFormActions,
  useFormQuestion,
} from "@/shared/model";
import { AddCheckboxOption, DeleteOption } from "@/features/question";

export interface QuestionBodyProps {
  questionId: string;
}

export const ShortTextQuestionBody: React.FC<QuestionBodyProps> = memo(
  ({ questionId }) => {
    return (
      <div className="w-full max-w-[320px]">
        <input
          disabled
          placeholder="Short answer text"
          className="w-full border-b border-midnight/20 bg-transparent text-base"
        />
      </div>
    );
  },
);

export const LongTextQuestionBody: React.FC<QuestionBodyProps> = memo(
  ({ questionId }) => {
    return (
      <input
        disabled
        placeholder="Short answer text"
        className="w-full border-b-midnight/20 bg-transparent"
      />
    );
  },
);

export const CheckboxQuestionBody: React.FC<QuestionBodyProps> = memo(
  ({ questionId }) => {
    const question = useFormQuestion(questionId) as FormQuestion<"Checkbox">;
    const { updateOption } = useFormActions();
    const handleChangeOption = (optionId: string, json: EditorJSONContent) => {
      updateOption(question.id, optionId, json);
    };
    return (
      <div className="flex flex-col gap-y-2">
        {question.options.map((option) => (
          <div className="flex w-full gap-x-2" key={option.id}>
            <Square
              className="relative -bottom-1 flex-shrink-0 text-gray-400"
              size={20}
            />
            <EditField
              initialValue={option.value}
              onChange={(json) => handleChangeOption(option.id, json)}
              oneLine
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

export const DropdownQuestionBody: React.FC<QuestionBodyProps> = memo(
  ({ questionId }) => {
    const question = useFormQuestion(questionId) as FormQuestion<"Checkbox">;
    const { updateOption } = useFormActions();
    const handleChangeOption = (optionId: string, json: EditorJSONContent) => {
      updateOption(question.id, optionId, json);
    };
    return (
      <div className="flex flex-col gap-y-2">
        {question.options.map((option, index) => (
          <div className="flex w-full gap-x-3" key={option.id}>
            <span className="flex-shrink-0 text-base leading-7 text-gray-500">
              {index + 1}.
            </span>
            <EditField
              initialValue={option.value}
              onChange={(json) => handleChangeOption(option.id, json)}
              oneLine
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

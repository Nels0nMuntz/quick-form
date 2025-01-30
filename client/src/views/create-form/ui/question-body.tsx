"use client";
import { memo } from "react";
import { Square } from "lucide-react";
import { Checkbox, EditField } from "@/shared/ui";
import { FormQuestion } from "@/entities/question";
import {
  EditorJSONContent,
  useFormActions,
  useFormQuestion,
} from "@/shared/model";
import { useEditorMode } from "@/shared/lib";
import { AddCheckboxOption, DeleteOption } from "@/features/question";

export interface QuestionBodyProps {
  questionId: string;
}

export const ShortTextQuestionBody: React.FC<QuestionBodyProps> = memo(() => {
  const mode = useEditorMode();
  return (
    <div className="w-full max-w-[320px]">
      <input
        disabled={mode === "preview"}
        placeholder="Short answer text"
        className="w-full border-b border-midnight/20 bg-transparent text-base"
      />
    </div>
  );
});

export const LongTextQuestionBody: React.FC<QuestionBodyProps> = memo(() => {
  const mode = useEditorMode();
  return (
    <input
      disabled={mode === "preview"}
      placeholder="Long answer text"
      className="w-full border-b border-midnight/20 bg-transparent"
    />
  );
});

export const CheckboxQuestionBody: React.FC<QuestionBodyProps> = memo(
  ({ questionId }) => {
    const mode = useEditorMode();
    const question = useFormQuestion(questionId) as FormQuestion<"Checkbox">;
    const { updateOption } = useFormActions();
    const handleChangeOption = (optionId: string, json: EditorJSONContent) => {
      updateOption(question.id, optionId, json);
    };
    return (
      <div className="flex flex-col gap-y-2">
        {question.options.map((option) => (
          <div className="flex w-full justify-between gap-x-2" key={option.id}>
            {mode === "edit" ? (
              <div className="relative flex items-center gap-x-2">
                <Square
                  className="absolute top-2 flex-shrink-0 text-gray-400"
                  size={20}
                />
                <div className="pl-7">
                  <EditField
                    initialValue={option.value}
                    onChange={(json) => handleChangeOption(option.id, json)}
                    oneLine
                    className="flex-grow"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Checkbox id={option.id} />
                <label
                  htmlFor={option.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            )}
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

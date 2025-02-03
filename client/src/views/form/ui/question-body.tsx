import { memo } from "react";
import { Control } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { FormQuestion, PartialFormQuestion } from "@/entities/question";

export interface QuestionBodyProps {
  question: PartialFormQuestion;
  control: Control<Record<string, string>, any>;
  setValue?: (name: string, value: any) => void;
}

export const ShortTextQuestionBody: React.FC<QuestionBodyProps> = ({
  question,
  control,
}) => {
  return (
    <div className="max-w-80">
      <FormField
        control={control}
        name={question.id}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Your answer" className="w-full" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export const LongTextQuestionBody: React.FC<QuestionBodyProps> = ({
  question,
  control,
}) => {
  return (
    <FormField
      control={control}
      name={question.id}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder="Your answer" className="w-full" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const CheckboxQuestionBody: React.FC<QuestionBodyProps> = ({
  question,
  control,
  setValue,
}) => {
  const { options } = question as FormQuestion<"Checkbox">;
  return (
    <FormField
      control={control}
      name={question.id}
      render={({ field }) => {
        const handleCheckedChange = (id: string) => {
          if (setValue) {
            const options = field.value as unknown as any[];
            setValue(
              question.id,
              options.map((option) =>
                option.id === id
                  ? { ...option, checked: !option.checked }
                  : option,
              ),
            );
          }
        };
        return (
          <div className="flex flex-col gap-y-4">
            {options.map(({ id, value }) => (
              <FormItem
                className="flex flex-row items-start space-x-3 space-y-0"
                key={id}
              >
                <FormControl>
                  <Checkbox onCheckedChange={() => handleCheckedChange(id)} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{value}</FormLabel>
                </div>
              </FormItem>
            ))}
          </div>
        );
      }}
    />
  );
};

export const DropdownQuestionBody: React.FC<QuestionBodyProps> = ({
  question,
  control,
}) => {
  return (
    <FormField
      control={control}
      name={question.id}
      render={({ field }) => (
        <FormItem className="max-w-60">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

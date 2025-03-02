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
        rules={{
          required: {
            value: !!question.required,
            message: "Field is required",
          },
          maxLength: {
            value: 100,
            message: "Field is must have not more then 100 charecters",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Your answer" className="w-full" {...field} />
            </FormControl>
            <FormMessage className="text-xs" />
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
      rules={{
        required: {
          value: !!question.required,
          message: "Field is required",
        },
        maxLength: {
          value: 600,
          message: "Field is must have not more then 600 charecters",
        },
      }}
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
}) => {
  const { options } = question as FormQuestion<"Checkbox">;
  const fieldState = control.getFieldState(question.id);
  return (
    <div>
      <div className="mb-2 flex flex-col gap-y-4">
        {options.map((option) => (
          <FormItem
            className="flex flex-row items-start space-x-3 space-y-0"
            key={option.id}
          >
            <FormField
              key={option.id}
              control={control}
              name={question.id}
              rules={{
                validate: (value) =>
                  !!question.required && !value.length
                    ? "Choose at least one option"
                    : undefined,
              }}
              render={({ field }) => {
                return (
                  <>
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const value =
                            (field.value as unknown as string[]) || [];
                          const newValue = checked
                            ? [...value, option.value]
                            : value.filter(
                                (value: string) => value !== option.value,
                              );
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer">
                      <span className="text-charcoal">{option.value}</span>
                    </FormLabel>
                  </>
                );
              }}
            />
          </FormItem>
        ))}
      </div>
      <FormMessage>
        {fieldState.invalid ? fieldState.error?.message : ""}
      </FormMessage>
    </div>
  );
};

export const DropdownQuestionBody: React.FC<QuestionBodyProps> = ({
  question,
  control,
}) => {
  const { options } = question as FormQuestion<"Dropdown">;
  return (
    <FormField
      control={control}
      name={question.id}
      rules={{
        required: {
          value: !!question.required,
          message: "Field is required",
        },
      }}
      render={({ field }) => (
        <FormItem className="max-w-60">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ id, value }) => (
                <SelectItem key={id} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

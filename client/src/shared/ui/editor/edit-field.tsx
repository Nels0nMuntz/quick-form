"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { JSONContent } from "@tiptap/react";
import { Form, FormField } from "@/shared/ui";
import { TiptapEditor, TiptapEditorRef } from "./tiptap-editor";

const initialContent: Record<EditFieldType, string> = {
  heading: "<h1></h1>",
  paragraph: "<p></p>",
};

type EditFieldType = "paragraph" | "heading";

interface Props {
  type?: EditFieldType;
  initialValue?: JSONContent;
  oneLine?: boolean;
  readonly?: boolean;
  className?: string;
  onChange: (json: JSONContent) => void;
}

export function EditField({
  initialValue,
  type = "paragraph",
  oneLine = false,
  readonly = false,
  className,
  onChange,
}: Props) {
  const editorRef = useRef<TiptapEditorRef>(null);
  const form = useForm({
    // resolver: zodResolver(editFieldSchema),
    values: {
      editField: initialValue || initialContent[type],
    },
  });

  const { watch } = form;

  useEffect(() => {
    const subscription = watch((values, { type }) => {
      const json = values.editField as unknown as JSONContent;
      if (type === "change") {
        onChange(json);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, editorRef]);

  return (
    <Form {...form}>
      <form className={className}>
        <FormField
          control={form.control}
          name="editField"
          render={({ field: { value, onChange } }) => (
            <TiptapEditor
              ref={editorRef}
              ssr={false}
              output="json"
              oneLine={oneLine}
              onContentChange={onChange}
              initialContent={value}
              readonly={readonly}
            />
          )}
        />
      </form>
    </Form>
  );
}

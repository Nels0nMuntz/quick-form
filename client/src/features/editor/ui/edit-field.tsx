"use client";

import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { JSONContent } from "@tiptap/react";
import { editFieldSchema } from "../model/schemas/edit-field-schema";
import { Form, FormField } from "@/shared/ui";
import { TiptapEditor, TiptapEditorRef } from "./tiptap-editor";

const initialContent: Record<EditFieldType, string> = {
  heading: "<h1></h1>",
  paragraph: "<p></p>",
};

type EditFieldSchema = typeof editFieldSchema;
type EditFieldType = "paragraph" | "heading";

interface Props {
  type?: EditFieldType;
}

export function EditField({ type = "paragraph" }: Props) {
  const editorRef = useRef<TiptapEditorRef>(null);
  const form = useForm<z.infer<EditFieldSchema>>({
    resolver: zodResolver(editFieldSchema),
    values: {
      editField: initialContent[type],
    },
  });

  const { watch } = form;

  useEffect(() => {
    const subscription = watch((values, { type }) => {
      console.log({ type });
      const json = values.editField as unknown as JSONContent
      if (type === "change") {
        console.log({json: JSON.stringify(json)});
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, editorRef]);

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="editField"
          render={({ field: { value, onChange } }) => (
            <TiptapEditor
              ref={editorRef}
              ssr={false}
              output="json"
              onContentChange={onChange}
              initialContent={value}
            />
          )}
        />
      </form>
    </Form>
  );
}

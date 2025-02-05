"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/shared/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { editFormNameSchema } from "../model/schema/editFormNameSchema";
import { useFormActions, useFormName } from "@/shared/model";

export function FormName() {
  const name = useFormName();
  const { setName } = useFormActions();
  const form = useForm<z.infer<typeof editFormNameSchema>>({
    resolver: zodResolver(editFormNameSchema),
    defaultValues: {
      name,
    },
    mode: "onBlur",
  });

  return (
    <div className="w-full max-w-80">
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="border-transparent font-medium shadow-none focus:shadow-sm md:text-2xl"
                  onBlur={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
}

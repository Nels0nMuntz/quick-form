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
import { useFormName } from "@/shared/model";

export function FormName() {
  const name = useFormName();
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
                  className="border-transparent font-medium shadow-none focus:shadow-sm md:text-2xl"
                  {...field}
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

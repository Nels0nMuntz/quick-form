"use client";
import { FormConfig, useFormDescription, useFormQuestions, useFormTitle } from "@/shared/model";
import { Button } from "@/shared/ui";
import { toast } from "@/shared/lib";
import { usePublishForm } from "../api/usePublishForm";

export function PublishFormButton() {
  const title = useFormTitle();
  const description = useFormDescription();
  const questions = useFormQuestions();
  const formData: FormConfig = {
    title,
    description,
    questions,
  };
  const { mutate, isPending } = usePublishForm(formData, {
    onSuccess: () =>
      toast({
        title: "Success",
        description: "The form has been successfuly published",
      }),
  });

  return (
    <Button
      className="w-auto min-w-48 px-12 py-3"
      loading={isPending}
      onClick={() => mutate()}
    >
      Publish Form
    </Button>
  );
}

"use client";
import {
  useFormDescription,
  useFormQuestions,
  useFormTitle,
} from "@/shared/model";
import { Button } from "@/shared/ui";
import { toast } from "@/shared/lib";
import { usePublishForm } from "../api/usePublishForm";
import { PublishFormRequest } from "../model/publishFormRequest";

export function PublishFormButton() {
  const title = useFormTitle();
  const description = useFormDescription();
  const questions = useFormQuestions();
  const data: PublishFormRequest = {
    config: {
      title,
      description,
      questions,
    },
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Current date plus one week
  };

  const { mutate, isPending } = usePublishForm(data, {
    onSuccess: () =>
      toast({
        title: "Success",
        description: "The form has been successfuly published",
      }),
    onError: (error) =>
      toast({
        title: "Failed",
        description: error.message,
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

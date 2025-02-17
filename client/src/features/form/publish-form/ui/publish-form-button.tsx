"use client";
import { useRouter } from "next/navigation";
import {
  useFormActions,
  useFormDescription,
  useFormName,
  useFormQuestions,
  useFormTitle,
} from "@/shared/model";
import { Button } from "@/shared/ui";
import { toast } from "@/shared/lib";
import { CreateFormRequest } from "@/entities/form";
import { usePublishFormMutation } from "../api/usePublishFormMutation";

export function PublishFormButton() {
  const router = useRouter();
  const name = useFormName();
  const title = useFormTitle();
  const description = useFormDescription();
  const questions = useFormQuestions();
  const { resetStore } = useFormActions();

  const data: CreateFormRequest = {
    name,
    config: {
      title,
      description,
      questions,
    },
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Current date plus one week
  };

  const { mutate, isPending } = usePublishFormMutation(data, {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "The form has been successfuly published",
      });
      router.replace("/dashboard");
      resetStore();
    },
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

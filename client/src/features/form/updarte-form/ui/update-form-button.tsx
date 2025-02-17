"use client";
import { Button } from "@/shared/ui";
import { UpdateFormRequest } from "@/entities/form";
import { useUpdateFormMutation } from "../api/useUpdateFormMutation";
import { useParams, useRouter } from "next/navigation";
import {
  useFormActions,
  useFormDescription,
  useFormName,
  useFormQuestions,
  useFormTitle,
} from "@/shared/model";
import { toast } from "@/shared/lib";

interface Props {
  configId: string;
}

export function UpdateFormButton({ configId }: Props) {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const name = useFormName();
  const title = useFormTitle();
  const description = useFormDescription();
  const questions = useFormQuestions();
  const { resetStore } = useFormActions();
  const { isPending, mutate } = useUpdateFormMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "The form has been successfuly updated",
      });
      router.replace("/dashboard");
      resetStore();
    },
    onError: (error) =>
      toast({
        title: "Failed to update form",
        description: error.message,
      }),
  });

  const updateFormData: UpdateFormRequest = {
    id: Number(id),
    name,
    config: {
      id: configId,
      title,
      description,
      questions: questions.map(({ id, type, title, options, required }) => ({
        id,
        type,
        title,
        options,
        required,
      })),
    },
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Current date plus one week
  };

  return (
    <Button
      className="w-auto min-w-48 px-12 py-3"
      loading={isPending}
      onClick={() => mutate(updateFormData)}
    >
      Publish Form
    </Button>
  );
}

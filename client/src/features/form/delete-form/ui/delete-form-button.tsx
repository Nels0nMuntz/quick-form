"use client";
import React from "react";
import { Button } from "@/shared/ui";
import { Trash2 } from "lucide-react";
import { toast } from "@/shared/lib";
import { useDeleteFormMutation } from "../api/useDeleteFormMutation";

interface Props {
  formId: string;
  onSuccess: () => void;
}

export function DeleteFormButton({ formId, onSuccess }: Props) {
  const { isPending, mutate } = useDeleteFormMutation();
  const handleClick = () => {
    mutate(formId, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Form deleted",
        });
        onSuccess();
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to delete the form",
          variant: "destructive",
        });
      },
    });
  };
  return (
    <Button
      size="icon"
      variant="ghost"
      loading={isPending}
      disabled={isPending}
      onClick={handleClick}
    >
      <Trash2 />
    </Button>
  );
}

"use client";
import { useFormActions } from "@/shared/model";
import { BaseButton } from "@/shared/ui";
import { Plus } from "lucide-react";

export function AddQuestion() {
  const { addQuestion } = useFormActions();
  return (
    <BaseButton
      variant="outline"
      className="h-auto w-auto bg-white p-3"
      onClick={addQuestion}
    >
      <Plus />
    </BaseButton>
  );
}

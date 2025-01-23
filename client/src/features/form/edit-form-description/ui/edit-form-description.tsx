import React from "react";
import { EditField } from "@/shared/ui";
import { useFormActions, useFormDescription } from "@/shared/model";

export function FormDescription() {
  const description = useFormDescription();
  const { setDescription } = useFormActions();
  if (!description) return null;
  return (
    <EditField
      type="paragraph"
      initialValue={description}
      onChange={setDescription}
    />
  );
}

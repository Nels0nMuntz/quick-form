"use client";
import React from "react";
import { EditField } from "@/shared/ui";
import { useFormActions, useFormDescription } from "@/shared/model";
import { useEditorMode } from "@/shared/lib";

export function FormDescription() {
  const mode = useEditorMode();
  const description = useFormDescription();
  const { setDescription } = useFormActions();
  if (!description) return null;
  return (
    <EditField
      type="paragraph"
      initialValue={description}
      onChange={setDescription}
      readonly={mode === "preview"}
    />
  );
}

"use client";
import React from "react";
import { EditField } from "@/shared/ui";
import { useFormActions, useFormTitle } from "@/shared/model";
import { useEditorMode } from "@/shared/lib";

export function FormTitle() {
  const mode = useEditorMode();
  const title = useFormTitle();
  const { setTitle } = useFormActions();
  return (
    <EditField
      type="heading"
      initialValue={title}
      onChange={setTitle}
      readonly={mode === "preview"}
    />
  );
}

"use client";
import React from "react";
import { EditField } from "@/shared/ui";
import { useFormActions, useFormTitle } from "@/shared/model";
import { useReadonlyMode } from "@/shared/lib";

export function FormTitle() {
  const isReadonly = useReadonlyMode()
  const title = useFormTitle();
  const { setTitle } = useFormActions();
  return <EditField type="heading" initialValue={title} onChange={setTitle} readonly={isReadonly}/>;
}

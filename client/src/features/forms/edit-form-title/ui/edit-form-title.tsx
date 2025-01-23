import React from "react";
import { EditField } from "@/shared/ui";
import { useFormActions, useFormTitle } from "@/shared/model";

export function FormTitle() {
  const title = useFormTitle();
  const { setTitle } = useFormActions();
  return <EditField type="heading" initialValue={title} onChange={setTitle} />;
}

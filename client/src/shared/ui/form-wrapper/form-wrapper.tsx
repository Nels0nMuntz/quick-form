import { PropsWithChildren } from "react";

export function FormWrapper({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-y-4 quick-form-wrapper">{children}</div>;
}

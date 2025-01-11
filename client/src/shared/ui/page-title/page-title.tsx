import React, { PropsWithChildren } from "react";

export function PageTitle({ children }: PropsWithChildren) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}

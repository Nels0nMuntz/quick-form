import React, { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex w-full max-w-[810px] flex-grow flex-col px-4 md:px-6">
      {children}
    </div>
  );
}

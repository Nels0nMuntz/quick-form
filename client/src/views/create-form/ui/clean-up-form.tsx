"use client";

import React, { PropsWithChildren } from "react";
import { useFormActions, useNavigationEvents } from "@/shared/model";

export default function CleanUpForm({ children }: PropsWithChildren) {
  const { resetStore } = useFormActions();
  useNavigationEvents((e) => {
    if (e.pathname === "/dashboard") {
      resetStore();
    }
  });
  return <React.Fragment>{children}</React.Fragment>;
}

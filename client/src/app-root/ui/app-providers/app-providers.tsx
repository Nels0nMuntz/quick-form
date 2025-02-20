"use client";

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib";
import { NavigationEventsProvider } from "@/shared/model";

export function AppProviders({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationEventsProvider>{children}</NavigationEventsProvider>
    </QueryClientProvider>
  );
}

import { SearchInput, useSearchResult } from "@/features/forms";
import { Header } from "@/widgets/header";
import React from "react";

export function DashboardPage() {
  const forms = useSearchResult();
  return (
    <>
      <Header
        title={<h1 className="text-lg">My Forms</h1>}
        action={<SearchInput />}
      />
    </>
  );
}

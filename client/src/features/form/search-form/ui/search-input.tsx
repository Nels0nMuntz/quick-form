"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { BaseButton, Input } from "@/shared/ui";
import { useSearchQuery } from "../api/useSearchQuery";
import { useSearchActions } from "../model/searchFormsStore";

export function SearchInput() {
  const [value, setValue] = useState("");
  const { setSearchResult } = useSearchActions();
  const { data } = useSearchQuery({ query: value });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  useEffect(() => {
    if (data && data.data.success) setSearchResult(data.data.data.forms);
  }, [data]);
  return (
    <div className="relative flex flex-grow justify-end">
      <Input
        type="text"
        placeholder="Search..."
        className="w-full max-w-64 pr-10 bg-white"
        value={value}
        onChange={handleChange}
      />
      <BaseButton variant="link" className="absolute right-1 top-0 p-2">
        <Search aria-hidden />
        <span className="sr-only">Search</span>
      </BaseButton>
    </div>
  );
}

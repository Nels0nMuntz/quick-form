"use client";
import { usePathname } from "next/navigation";

export const useEditorMode = () => {
  const pathname = usePathname();
  return pathname.includes("/preview") ? "preview" : "edit";
};

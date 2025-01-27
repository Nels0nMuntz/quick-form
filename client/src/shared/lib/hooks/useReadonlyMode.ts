"use client";
import { usePathname } from "next/navigation";

export const useReadonlyMode = () => {
  const pathname = usePathname();
  return pathname.includes("/preview");
};

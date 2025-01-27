"use client";
import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";
import { Button } from "@/shared/ui";

export function BackButton() {
  const router = useRouter();
  return (
    <Button
      className="flex w-auto items-center gap-x-4"
      onClick={() => router.back()}
    >
      <Undo2 />
      Back
    </Button>
  );
}

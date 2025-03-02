"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { Button, CopyLink } from "@/shared/ui";

interface Props {
  slug: string;
}

export default function Toolbar({ slug }: Props) {
  const router = useRouter();
  const url = `${window.location.origin}/public-form/${slug}`;

  return (
    <div className="flex justify-start gap-x-1 py-3 md:justify-end">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/form/preview")}
        className="text-sky/85 hover:text-sky/85"
      >
        <Eye />
      </Button>
      <CopyLink link={url} />
      {/* <Button variant="ghost" size="icon">
        <UserPlus />
      </Button> */}
    </div>
  );
}

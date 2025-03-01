"use client";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { useOriginUrl } from "@/shared/lib";
import { Button, CopyLink } from "@/shared/ui";

interface Props {
  formId: number;
  slug: string;
}

export default function Toolbar({ formId, slug }: Props) {
  const router = useRouter();
  const originUrl = useOriginUrl();
  return (
    <div className="flex flex-shrink-0 gap-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push(`/form/${formId}`)}
      >
        <Pencil className="text-sky/85" />
      </Button>
      <CopyLink link={`${originUrl}/public-form/${slug}`} />
    </div>
  );
}

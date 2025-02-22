"use client";
import { useRouter } from "next/navigation";
import { Link2, UserPlus, Eye } from "lucide-react";
import { Button } from "@/shared/ui";

export function Toolbar() {
  const router = useRouter();
  const openPreviewPage = () => {
    router.push("/form/preview");
  };
  return (
    <div className="flex justify-start gap-x-1 py-3 md:justify-end">
      <Button
        variant="ghost"
        size="icon"
        className="text-sky/85 hover:text-sky/85"
        onClick={openPreviewPage}
      >
        <Eye />
      </Button>
      {/* <Button variant="ghost" size="icon">
        <Link2 />
      </Button>
      <Button variant="ghost" size="icon">
        <UserPlus />
      </Button> */}
    </div>
  );
}

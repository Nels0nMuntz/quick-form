"use client";
import React, { useEffect, useState } from "react";
import { Link2 } from "lucide-react";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui";

interface Props {
  link: string;
}

export function CopyLink({ link }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 1000);
    }
  }, [isOpen]);
  const handleCopy = async () => {
    setIsOpen(true);
    await navigator.clipboard.writeText(link);
  };
  return (
    <TooltipProvider>
      <Tooltip open={isOpen}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            <Link2 className="text-sky/85"/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copied!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

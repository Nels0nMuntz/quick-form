"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteFormButton } from "./delete-form-button";

interface Props {
  formId: number;
  formName: string;
  onSuccess: () => void;
}

export function DeleteFormDialog({ formId, formName, onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Trash2 className="text-sky/85" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are You Sure You Want to delete {formName} ?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This action is irreversible. Deleting the form will permanently remove
          all its questions and responses. Proceed with caution.
        </DialogDescription>
        <DialogFooter>
          <DeleteFormButton formId={formId} onSuccess={onSuccess} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

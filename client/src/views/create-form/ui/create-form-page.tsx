"use client";

import { Eye, Link2, UserPlus } from "lucide-react";
import { Header } from "@/widgets/header";
import {
  FormDescription,
  FormTitle,
  PublishFormButton,
} from "@/features/form";
import { Button, Container, PageTitle, Paper } from "@/shared/ui";
import { Questions } from "./questions";

export function CreateFormPage() {
  return (
    <>
      <div className="border-b border-gray-200">
        <Container>
          <Header
            title={<PageTitle>Create New Form</PageTitle>}
            action={<PublishFormButton />}
          />
          <div className="flex justify-start gap-x-1 py-3 md:justify-end">
            <Button variant="ghost" size="icon">
              <Eye />
            </Button>
            <Button variant="ghost" size="icon">
              <Link2 />
            </Button>
            <Button variant="ghost" size="icon">
              <UserPlus />
            </Button>
          </div>
        </Container>
      </div>
      <div className="flex-grow bg-blue-light py-8">
        <Container>
          <div className="flex flex-col gap-y-4">
            <Paper top>
              <div className="flex flex-col gap-y-2">
                <FormTitle />
                <FormDescription />
              </div>
            </Paper>
            <Questions />
          </div>
        </Container>
      </div>
    </>
  );
}

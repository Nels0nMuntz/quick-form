"use client";


import { Eye, Link2, UserPlus } from "lucide-react";
import { PublishFormButton } from "@/features/forms";
import { Button, Container, PageTitle } from "@/shared/ui";
import { Header } from "@/widgets/header";
import { Paper } from "./paper/paper";
import { EditField } from "@/features/editor";

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
      <div className="bg-blue-light flex-grow py-8">
        <Container>
          <div className="flex flex-col gap-y-4">
            <Paper top>Paper</Paper>
            <Paper active>
              <EditField type="heading"/>
            </Paper>
            <Paper>Paper</Paper>
          </div>
        </Container>
      </div>
    </>
  );
}

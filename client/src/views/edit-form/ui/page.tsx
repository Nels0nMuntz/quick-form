"use client";
import { useEffect, useState } from "react";
import { FetchFormResponse } from "@/entities/form";
import { useFormActions, useNavigationEvents } from "@/shared/model";
import { mapArrayToObjectByKey } from "@/shared/lib";
import { Container, Paper, Spinner } from "@/shared/ui";
import {
  FormDescription,
  FormName,
  FormTitle,
  UpdateFormButton,
} from "@/features/form";
import { Header } from "@/widgets/header";
import { AddQuestion } from "@/features/question";
import { Questions } from "@/views/create-form/ui/questions";
import Toolbar from "./toolbar";

interface Props {
  form: FetchFormResponse;
}

export function Page({ form }: Props) {
  const { initializeStore, resetStore } = useFormActions();
  const [initialized, setInitialized] = useState(false);
  useNavigationEvents((e) => {
    if (e.pathname === "/dashboard") {
      resetStore();
    }
  });

  useEffect(() => {
    initializeStore({
      name: form.name,
      title: form.config.title,
      description: form.config.description,
      questions: mapArrayToObjectByKey(form.config.questions, "id"),
    });
    setInitialized(true);
  }, []);

  if (!initialized) {
    return (
      <div className="flex flex-grow items-center justify-center border">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="border-b border-gray-200 bg-white pt-12">
        <Container>
          <Header
            title={<FormName />}
            action={<UpdateFormButton configId={form.config.id} />}
          />
          <Toolbar slug={form.slug} />
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
            <AddQuestion />
          </div>
        </Container>
      </div>
    </>
  );
}

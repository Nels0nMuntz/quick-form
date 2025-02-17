"use client";
import { useEffect, useState } from "react";
import { FetchFormResponse } from "@/entities/form";
import { useFormActions } from "@/shared/model";
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

interface Props {
  form: FetchFormResponse;
}

export function Page({ form }: Props) {
  const { initializeStore, resetStore } = useFormActions();
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    initializeStore({
      name: form.name,
      title: form.config.title,
      description: form.config.description,
      questions: mapArrayToObjectByKey(form.config.questions, "id"),
    });
    setInitialized(true);
    return () => resetStore();
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
      <div className="border-b border-gray-200 bg-white py-12">
        <Container>
          <Header
            title={<FormName />}
            action={<UpdateFormButton configId={form.config.id} />}
          />
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

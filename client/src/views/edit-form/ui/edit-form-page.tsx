import { fetchFormServer } from "@/entities/form";
import { Page } from "./page";

interface Props {
  params: Promise<{ id: string }>;
}

export async function EditFormPage({ params }: Props) {
  const { id } = await params;
  const response = await fetchFormServer(id);

  if (!response.ok || !response.data.success) {
    return <div>Something went wrong</div>;
  }

  const form = response.data.data;

  return <Page form={form} />;
}

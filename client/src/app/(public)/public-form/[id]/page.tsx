import { Metadata } from "next";
import { FormPage } from "@/views/form";
import { fetchPublicFormServer } from "@/entities/form";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const metadata: Metadata = {
    title: "Quick Form",
  };
  const id = (await params).id;
  const { ok, data } = await fetchPublicFormServer(id);

  if (ok && data.success) {
    metadata.title = `${data.data.name} - Quick Form`;
  }

  return metadata;
}

export default async function PublicForm({ params }: Props) {
  return <FormPage params={params} />;
}

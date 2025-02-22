import { Metadata } from "next";
import { EditFormPage } from "@/views/edit-form";
import { fetchFormServer } from "@/entities/form";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const metadata: Metadata = {
    title: "Edit Form - Quick Form",
  };
  const id = (await params).id;
  const { ok, data } = await fetchFormServer(id);

  if (ok && data.success) {
    metadata.title = `${data.data.name} - Quick Form`;
  }

  return metadata;
}

export default async function Form({ params }: Props) {
  return <EditFormPage params={params} />;
}

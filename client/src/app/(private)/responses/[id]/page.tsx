import { Metadata } from "next";
import { fetchFormServer } from "@/entities/form";
import { ResponsesPage } from "@/views/responses";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const metadata: Metadata = {
    title: "Responses - Quick Form",
  };
  const id = (await params).id;
  const { ok, data } = await fetchFormServer(id);

  if (ok && data.success) {
    metadata.title = `${data.data.name} - Quick Form`;
  }

  return metadata;
}

export default async function Responses({ params }: Props) {
  return <ResponsesPage params={params} />;
}

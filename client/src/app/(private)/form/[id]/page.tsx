import { EditFormPage } from "@/views/edit-form";

export default async function Form({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <EditFormPage params={params} />;
}

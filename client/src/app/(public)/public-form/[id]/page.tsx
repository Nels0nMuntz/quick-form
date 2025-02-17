import { FormPage } from "@/views/form";

export default async function PublicForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <FormPage params={params} />;
}

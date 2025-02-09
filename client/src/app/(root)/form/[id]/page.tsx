import { FormPage } from "@/views/form";

export default async function Form({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <FormPage params={params}/>;
}

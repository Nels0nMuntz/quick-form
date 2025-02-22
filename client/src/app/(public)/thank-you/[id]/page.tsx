import { ThankYouPage } from "@/views/thank-you";

export default async function PublicForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ThankYouPage params={params} />;
}

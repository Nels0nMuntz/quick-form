import Link from "next/link";
import { fetchPublicFormServer } from "@/entities/form";
import { Container, Paper } from "@/shared/ui";

interface Props {
  params: Promise<{ id: string }>;
}

export async function ThankYouPage({ params }: Props) {
  const { id } = await params;
  const response = await fetchPublicFormServer(id);

  if (!response.ok || !response.data.success) {
    return <div>Something went wrong</div>;
  }

  const form = response.data.data;

  return (
    <main className="min-h-[100dvh] bg-blue-light py-12">
      <Container>
        <Paper top>
          <h1 className="text-3xl font-medium">{form.name}</h1>
          <p className="mt-3">Your response has been recorded.</p>
          <Link href={`/public-form/${id}`} className="text-sm text-sky/85 underline mt-6 block">
            Submit another response
          </Link>
        </Paper>
      </Container>
    </main>
  );
}

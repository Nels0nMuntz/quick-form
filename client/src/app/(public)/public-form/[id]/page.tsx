export default async function PublicForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1>PublicForm</h1>
      <h3>Form ID: {`${id}`}</h3>
    </div>
  );
}

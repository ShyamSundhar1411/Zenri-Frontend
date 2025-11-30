export default async function LedgerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Ledger Detail Page</h1>
      <p>ID: {id}</p>
    </div>
  );
}

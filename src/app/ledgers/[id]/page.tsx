"use client";

import { useParams } from "next/navigation";

export default function LedgerDetailPage() {
  const params = useParams();

  return (
    <div>
      <h1>Ledger Detail Page</h1>
      <p>ID: {params.id}</p>
    </div>
  );
}

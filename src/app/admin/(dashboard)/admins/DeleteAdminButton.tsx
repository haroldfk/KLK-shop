"use client";

import { useTransition } from "react";
import { deleteAdminAction } from "../../actions";

export default function DeleteAdminButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Retirer l'accès admin de ${name} ?`)) return;
    startTransition(() => {
      deleteAdminAction(id);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="text-sm font-medium text-neutral-500 hover:text-red-600 disabled:opacity-50"
    >
      {pending ? "..." : "Retirer"}
    </button>
  );
}

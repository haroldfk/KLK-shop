"use client";

import { useTransition } from "react";
import { deleteProductAction } from "../actions";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Supprimer "${name}" ? Cette action est irréversible.`)) return;
    startTransition(() => {
      deleteProductAction(id);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="font-medium text-neutral-500 hover:text-red-600 disabled:opacity-50"
    >
      {pending ? "..." : "Supprimer"}
    </button>
  );
}

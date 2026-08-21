"use client";

import { useActionState } from "react";
import { createAdminAction } from "../../actions";

export default function NewAdminForm() {
  const [state, formAction, pending] = useActionState(createAdminAction, undefined);

  return (
    <form action={formAction} className="mt-4 space-y-4">
      <div>
        <label className="text-sm font-medium text-neutral-700">Nom</label>
        <input
          name="name"
          required
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-klk-crimson"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-neutral-700">Email</label>
        <input
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-klk-crimson"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-neutral-700">
          Mot de passe (8 caractères min.)
        </label>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-klk-crimson"
        />
      </div>

      {state?.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full klk-gradient-bg px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-60"
      >
        {pending ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}

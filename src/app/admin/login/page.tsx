"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 p-8 shadow-sm">
        <h1 className="text-center text-2xl font-extrabold text-neutral-900">
          KLK <span className="klk-gradient-text">Admin</span>
        </h1>
        <p className="mt-1 text-center text-sm text-neutral-500">
          Connexion à l&apos;espace administrateur
        </p>

        <form action={formAction} className="mt-8 space-y-4">
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
            <label className="text-sm font-medium text-neutral-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-klk-crimson"
            />
          </div>

          {state?.error && (
            <p className="text-sm font-medium text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full klk-gradient-bg py-3 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-60"
          >
            {pending ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

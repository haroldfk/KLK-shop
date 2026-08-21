"use client";

import { useActionState } from "react";
import { CATEGORY_LABELS, type Product } from "@/lib/product-types";

type FormAction = (
  prevState: { error?: string } | undefined,
  formData: FormData
) => Promise<{ error?: string }>;

export default function ProductForm({
  action,
  initial,
}: {
  action: FormAction;
  initial?: Product;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="mt-6 max-w-2xl space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom du produit" name="name" defaultValue={initial?.name} required />
        <Field
          label="Slug (URL, ex: air-max-90)"
          name="slug"
          defaultValue={initial?.slug}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Marque" name="brand" defaultValue={initial?.brand} required />
        <div>
          <label className="text-sm font-medium text-neutral-700">Catégorie</label>
          <select
            name="category"
            defaultValue={initial?.category ?? "maillots"}
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-klk-crimson"
          >
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Prix (FCFA)"
          name="price"
          type="number"
          defaultValue={initial?.price}
          required
        />
        <Field
          label="Prix barré (optionnel)"
          name="compareAtPrice"
          type="number"
          defaultValue={initial?.compareAtPrice ?? undefined}
        />
      </div>

      <Field
        label="Couleurs (séparées par des virgules)"
        name="colors"
        defaultValue={initial?.colors.join(", ")}
        placeholder="Noir, Blanc, Rouge"
        required
      />
      <Field
        label="Tailles (séparées par des virgules)"
        name="sizes"
        defaultValue={initial?.sizes.join(", ")}
        placeholder="S, M, L, XL"
        required
      />
      <Field
        label="URL de l'image"
        name="image"
        defaultValue={initial?.image}
        placeholder="https://..."
        required
      />

      <div>
        <label className="text-sm font-medium text-neutral-700">Description</label>
        <textarea
          name="description"
          defaultValue={initial?.description}
          rows={4}
          required
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-klk-crimson"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            name="isNew"
            defaultChecked={initial?.isNew}
            className="h-4 w-4 rounded border-neutral-300"
          />
          Marquer comme nouveauté
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            name="isCustomizable"
            defaultChecked={initial?.isCustomizable}
            className="h-4 w-4 rounded border-neutral-300"
          />
          Personnalisable (le client pourra demander une gravure / un texte)
        </label>
      </div>

      {state?.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full klk-gradient-bg px-8 py-3 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-60"
      >
        {pending ? "Enregistrement..." : initial ? "Mettre à jour" : "Créer le produit"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-neutral-700">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-klk-crimson"
      />
    </div>
  );
}

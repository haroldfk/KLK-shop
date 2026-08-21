import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import NewAdminForm from "./NewAdminForm";
import DeleteAdminButton from "./DeleteAdminButton";

export default async function AdminsPage() {
  const [admins, session] = await Promise.all([
    prisma.admin.findMany({ orderBy: { createdAt: "asc" } }),
    getSession(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-neutral-900">Comptes administrateur</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Les personnes ci-dessous peuvent gérer les produits de la boutique.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {admins.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3 font-medium text-neutral-900">
                  {a.name}
                  {a.id === session?.adminId && (
                    <span className="ml-2 text-xs font-normal text-neutral-400">(toi)</span>
                  )}
                </td>
                <td className="px-4 py-3 text-neutral-600">{a.email}</td>
                <td className="px-4 py-3 text-right">
                  {admins.length > 1 && a.id !== session?.adminId && (
                    <DeleteAdminButton id={a.id} name={a.name} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 max-w-md">
        <h2 className="text-lg font-bold text-neutral-900">Ajouter un administrateur</h2>
        <NewAdminForm />
      </div>
    </div>
  );
}

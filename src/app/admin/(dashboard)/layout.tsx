import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "../actions";

const NAV = [
  { label: "Produits", href: "/admin" },
  { label: "Commandes", href: "/admin/orders" },
  { label: "Comptes admin", href: "/admin/admins" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <aside className="w-56 shrink-0">
        <h2 className="text-lg font-extrabold text-neutral-900">
          KLK <span className="klk-gradient-text">Admin</span>
        </h2>
        <p className="mt-1 truncate text-xs text-neutral-500">{session?.email}</p>

        <nav className="mt-6 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-100"
          >
            ← Retour au site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 bg-klk-maroon text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-lg font-bold">
            KLK <span className="klk-gradient-text">Shop</span>
          </h3>
          <p className="mt-2 text-sm text-white/60">
            Maillots, montres, bijoux et parfums d&apos;exception.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white/90">Boutique</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><Link href="/products?category=maillots" className="hover:text-white">Maillots</Link></li>
            <li><Link href="/products?category=montres-luxe" className="hover:text-white">Montres de luxe</Link></li>
            <li><Link href="/products?category=montres-personnalisables" className="hover:text-white">Montres personnalisables</Link></li>
            <li><Link href="/products?category=bijoux" className="hover:text-white">Bijoux</Link></li>
            <li><Link href="/products?category=parfums" className="hover:text-white">Parfums</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white/90">Aide</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li>Livraison</li>
            <li>Retours</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white/90">Suivez-nous</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>TikTok</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} KLK Shop. Tous droits réservés.
      </div>
    </footer>
  );
}

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const demoProducts = [
  // Maillots de football
  {
    slug: "maillot-psg-domicile",
    name: "Maillot PSG Domicile 2025/26",
    brand: "Nike",
    category: "maillots",
    price: 45000,
    colors: ["Bleu", "Rouge"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Maillot officiel domicile, tissu respirant technologie Dri-FIT, floquage possible.",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80",
    isNew: true,
    isCustomizable: false,
  },
  {
    slug: "maillot-real-madrid-exterieur",
    name: "Maillot Real Madrid Extérieur",
    brand: "Adidas",
    category: "maillots",
    price: 45000,
    colors: ["Blanc", "Doré"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Réplique officielle du maillot extérieur, coupe athlétique, coutures renforcées.",
    image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=800&q=80",
    isNew: false,
    isCustomizable: false,
  },
  {
    slug: "maillot-barcelone-domicile",
    name: "Maillot Barcelone Domicile",
    brand: "Nike",
    category: "maillots",
    price: 42000,
    compareAtPrice: 50000,
    colors: ["Bleu grenat", "Rouge"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Maillot domicile emblématique aux rayures bleu et grenat, léger et confortable.",
    image: "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?w=800&q=80",
    isNew: false,
    isCustomizable: false,
  },

  // Montres de luxe
  {
    slug: "montre-rolex-submariner",
    name: "Montre Submariner",
    brand: "Rolex",
    category: "montres-luxe",
    price: 850000,
    colors: ["Argent"],
    sizes: ["Unique"],
    description: "Montre de plongée iconique, boîtier acier, étanche, garantie authenticité.",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80",
    isNew: true,
    isCustomizable: false,
  },
  {
    slug: "montre-omega-seamaster",
    name: "Montre Seamaster",
    brand: "Omega",
    category: "montres-luxe",
    price: 620000,
    colors: ["Argent", "Bleu"],
    sizes: ["Unique"],
    description: "Chronographe de plongée suisse, cadran bleu, bracelet acier robuste.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
    isNew: false,
    isCustomizable: false,
  },

  // Montres personnalisables
  {
    slug: "montre-cuir-gravee",
    name: "Montre Cuir Gravée",
    brand: "KLK Atelier",
    category: "montres-personnalisables",
    price: 95000,
    colors: ["Marron", "Noir"],
    sizes: ["Unique"],
    description:
      "Montre classique bracelet cuir, dos du boîtier gravable avec un texte ou des initiales.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
    isNew: true,
    isCustomizable: true,
  },
  {
    slug: "montre-classique-gravee",
    name: "Montre Classique Gravée",
    brand: "KLK Atelier",
    category: "montres-personnalisables",
    price: 78000,
    colors: ["Noir", "Argent"],
    sizes: ["Unique"],
    description: "Montre élégante au design épuré, personnalisable avec une gravure au dos.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    isNew: false,
    isCustomizable: true,
  },

  // Bijoux
  {
    slug: "collier-perles-fines",
    name: "Collier Perles Fines",
    brand: "KLK Bijoux",
    category: "bijoux",
    price: 65000,
    colors: ["Blanc", "Argent"],
    sizes: ["Unique"],
    description: "Collier de perles fines montées sur fil de soie, fermoir argent massif.",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80",
    isNew: false,
    isCustomizable: false,
  },
  {
    slug: "collier-chaine-fine",
    name: "Collier Chaîne Fine",
    brand: "KLK Bijoux",
    category: "bijoux",
    price: 38000,
    colors: ["Or", "Argent"],
    sizes: ["Unique"],
    description: "Chaîne fine et discrète pour un port quotidien, plaqué or ou argent massif.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
    isNew: true,
    isCustomizable: false,
  },
  {
    slug: "bague-solitaire-gravee",
    name: "Bague Solitaire Gravée",
    brand: "KLK Bijoux",
    category: "bijoux",
    price: 120000,
    colors: ["Or blanc", "Or rose"],
    sizes: ["48", "50", "52", "54", "56", "58"],
    description:
      "Bague solitaire sertie d'une pierre, gravure intérieure personnalisée offerte (initiales, date...).",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    isNew: true,
    isCustomizable: true,
  },
  {
    slug: "bracelet-diamant-grave",
    name: "Bracelet Diamant Gravé",
    brand: "KLK Bijoux",
    category: "bijoux",
    price: 145000,
    colors: ["Argent"],
    sizes: ["Unique"],
    description: "Bracelet serti de diamants, plaque intérieure gravable avec un message personnel.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    isNew: false,
    isCustomizable: true,
  },

  // Parfums
  {
    slug: "parfum-noir",
    name: "Eau de Parfum Noir",
    brand: "Chanel",
    category: "parfums",
    price: 85000,
    colors: ["Unique"],
    sizes: ["50ml", "100ml"],
    description: "Fragrance intense et élégante, notes boisées et florales, tenue longue durée.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    isNew: false,
    isCustomizable: false,
  },
  {
    slug: "parfum-mademoiselle",
    name: "Eau de Parfum Mademoiselle",
    brand: "Chanel",
    category: "parfums",
    price: 88000,
    compareAtPrice: 98000,
    colors: ["Unique"],
    sizes: ["50ml", "100ml"],
    description: "Parfum floral et frais, signature intemporelle, idéal pour un usage quotidien.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    isNew: true,
    isCustomizable: false,
  },
  {
    slug: "parfum-no5",
    name: "Eau de Parfum N°5",
    brand: "Chanel",
    category: "parfums",
    price: 92000,
    colors: ["Unique"],
    sizes: ["50ml", "100ml", "200ml"],
    description: "Le parfum le plus emblématique au monde, notes aldéhydées et florales iconiques.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
    isNew: false,
    isCustomizable: false,
  },
];

async function main() {
  await prisma.product.deleteMany();

  for (const p of demoProducts) {
    await prisma.product.create({
      data: {
        ...p,
        colors: JSON.stringify(p.colors),
        sizes: JSON.stringify(p.sizes),
      },
    });
  }

  const adminEmail = "haroldfokam@gmail.com";
  const adminPassword = "KlkShop2026!";
  const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.admin.create({
      data: { name: "Harold Fokam", email: adminEmail, passwordHash },
    });
    console.log(`Admin créé : ${adminEmail} / ${adminPassword} (à changer après connexion)`);
  }

  console.log("Seed terminé.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

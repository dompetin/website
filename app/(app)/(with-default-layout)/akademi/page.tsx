import { getPayload } from "payload";
import config from "@payload-config";
import { AkademiCategory } from "@/payload-types";
import * as m from "@/lib/motion";
import Container from "@/components/container";
import { CardWithImage } from "../components/card-with-image";
import type { Metadata } from "next";
import { NewsletterForm } from "../akademi/newsletter-form";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Akademi | Dompetin",
  description:
    "Mulai perjalanan finansialmu — dari dasar menabung sampai strategi investasi.",
};

const COVER_IMAGES = [
  "/kupas/jumping.png",
  "/home/cooking.png",
  "/home/eating.png",
  "/home/laptop.png",
  "/home/walking.png",
  "/home/writing.png",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const AkademiPage = async () => {
  const categories = await getAkademiCategories();

  return (
    <>
      <Container className="max-w-4xl gap-20">

        {/* ── Hero (original, untouched) ── */}
        <div className="flex flex-col gap-4 text-center">
          <h3 className="text-lg md:text-2xl">
            {" "}
            Bingung mulai belajar manajemen keuangan dari mana{" "}
          </h3>{" "}
          <h2 className="flex flex-wrap items-center justify-center gap-3 text-4xl font-bold md:text-6xl">
            {" "}
            Yuk Belajar di{" "}
            <m.span
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
              className="text-primary"
            >
              {" "}
              Akademi{" "}
            </m.span>{" "}
            <span className="text-neutral-900">Dompetin</span>{" "}
          </h2>{" "}
          <p>
            {" "}
            Mulai perjalanan finansial di sini dari dasar menabung sampai
            strategi investasi{" "}
          </p>{" "}
        </div>

        {/* ── NEW: Stats strip ── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-10 text-center"
        >
          {[
            { label: "Kategori Tersedia", value: `${categories.length}+` },
            { label: "Artikel Gratis",    value: "100%"                  },
            { label: "Bahasa Indonesia",  value: "✓"                     },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="text-3xl font-black text-primary">{s.value}</span>
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </m.div>

        {/* ── Card grid (original, untouched) ── */}
        <div className="grid auto-rows-fr grid-cols-1 gap-3 p-4 md:grid-cols-2 md:gap-8">
          {" "}
          {categories.length > 0 &&
            categories.map((category, index) => (
              <m.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mt-8"
              >
                <CardWithImage
                  title={category.title}
                  description={category.subtitle || ""}
                  href={`/akademi/${category.slug}`}
                  src={COVER_IMAGES[index % COVER_IMAGES.length]}
                />
              </m.div>
            ))}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categories.length * 0.1 }}
            className="flex items-center"
          >
            <p className="text-2xl font-bold text-neutral-500 md:text-6xl">
              ...lebih banyak lagi segera hadir
            </p>
          </m.div>
        </div>

        {/* ── NEW: Newsletter CTA ── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-border bg-muted/40 px-6 py-8 text-center"
        >
          <p className="text-base font-bold text-foreground">
            📬 Mau tahu kalau ada artikel baru?
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Daftarkan emailmu dan kami kabari langsung saat konten baru terbit.
          </p>
          <NewsletterForm />
        </m.div>

      </Container>
    </>
  );
};

// ─── Data fetching ─────────────────────────────────────────────────────────────

async function getAkademiCategories() {
  const payload = await getPayload({ config });
  let categories: AkademiCategory[] = [];

  try {
    const { docs } = await payload.find({
      collection: "akademi-categories",
      sort: "-createdAt",
    });
    categories = docs;
  } catch (err) {
    console.error("[ERR] Error fetching akademi articles: ", err);
  }

  return categories;
}

export default AkademiPage;
import { getPayload } from "payload";
import config from "@payload-config";
import { AkademiCategory } from "@/payload-types";
import * as m from "@/lib/motion"
import Container from "@/components/container";
import { CardWithImage } from "../components/card-with-image";

export const revalidate = 3600;

const COVER_IMAGES = [
  "/kupas/jumping.png",
  "/home/cooking.png",
  "/home/eating.png",
  "/home/laptop.png",
  "/home/walking.png",
  "/home/writing.png",
];


const AkademiPage = async () => {
  const categories = await getAkademiCategories();

  return (
    <>
      <Container className="max-w-4xl gap-20">
        <div className="flex flex-col gap-4 text-center">
          <h3 className="text-lg md:text-2xl">
            {" "}
            Bingung mulai belajar manajemen keuangan dari mana{" "}
          </h3>{" "}
          <h2 className="flex flex-wrap items-center justify-center gap-3 text-4xl font-bold md:text-6xl">
            {" "}
            Yuk Belajar di{" "}
            <m.span
              initial={{
                opacity: 0,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
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
        </div>{" "}
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
      </Container>
    </>
  );
};

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

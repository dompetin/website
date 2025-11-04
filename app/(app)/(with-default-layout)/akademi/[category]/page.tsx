import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import * as m from "@/lib/motion";
import type { AkademiArticle, AkademiCategory } from "@/payload-types";
import config from "@payload-config";
import { ChevronRight } from "lucide-react";
import { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Akademi | Dompetin",
};

const ArticlesByCategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category: categorySlug } = await params;
  const category = await getCategoryArticles(categorySlug);

  if (!category) notFound()

  const articles = category.relatedArticles?.docs as AkademiArticle[];

  return (
    <>
      <Container className="max-w-4xl gap-20">
        <div className="flex flex-col gap-4 text-center">
          <h3 className="text-lg md:text-2xl">
            {category.subtitle}
          </h3>{" "}
          <h2 className="flex flex-wrap items-center justify-center gap-3 text-4xl font-bold md:text-6xl">{category.title}</h2>
        </div>{" "}
        <div className="grid auto-rows-fr grid-cols-1 gap-3 p-4 md:grid-cols-2 md:gap-8">
          {" "}
          {articles.length > 0 &&
            articles.map((article, index) => (
              <m.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mt-8"
              >
                <ArticleCard
                  {...article}
                  categorySlug={category.slug}
                />
              </m.div>
            ))}
        </div>
      </Container>
    </>
  );
};

const ArticleCard = (props: AkademiArticle & { categorySlug: string }) => {
  return (
    <div className="grid auto-rows-fr rounded-3xl bg-white shadow-lg">
      <div className="z-20 flex flex-col items-center gap-4 rounded-b-3xl bg-white p-6 text-center">
        <h3 className="text-2xl font-bold">{props.title}</h3>
        <p className="text-sm">{props.subtitle}</p>
        <Button asChild transition={"scale"} className="ml-auto">
          <Link href={`/akademi/${props.categorySlug}/${props.slug}` as Route}>
            Lihat Selengkapnya <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  )
}

async function getCategoryArticles(categorySlug: string) {
  const payload = await getPayload({ config });
  let category: AkademiCategory | undefined;

  try {
    const { docs } = await payload.find({
      collection: "akademi-categories",
      sort: "-createdAt",
      where: {
        slug: {
          equals: categorySlug,
        },
      },
      joins: {
        relatedArticles: {
          limit: 100,
        }
      },
      depth: 100,
      limit: 100,
    });
    [category] = docs;
  } catch (err) {
    console.error("[ERR] Error fetching akademi articles: ", err);
  }

  return category;
}

export default ArticlesByCategoryPage;

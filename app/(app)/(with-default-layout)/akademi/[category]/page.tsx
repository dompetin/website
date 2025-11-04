import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import * as m from "@/lib/motion";
import type { AkademiArticle, AkademiCategory } from "@/payload-types";
import config from "@payload-config";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Akademi | Dompetin",
};

type PageProps = {
  params: Promise<{ category: string }>;
};

const ArticlesByCategoryPage = async ({ params }: PageProps) => {
  const { category: categorySlug } = await params;
  const category = await getCategoryArticles(categorySlug);

  if (!category) notFound();

  const articles = category.relatedArticles?.docs as AkademiArticle[];

  return (
    <>
      <Container className="max-w-4xl gap-20">
        <Button asChild variant="ghost" className="w-fit px-3">
          <Link href="/akademi">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Link>
        </Button>
        <div className="flex flex-col gap-4 text-center">
          <h2 className="flex flex-wrap items-center justify-center gap-3 text-4xl font-bold md:text-6xl">
            {category.title}
          </h2>
          <p>{category.subtitle}</p>
        </div>{" "}
        <div className="grid auto-rows-fr grid-cols-1 gap-3 p-4 lg:gap-8">
          {" "}
          {articles.length > 0 &&
            articles.map((article, index) => (
              <m.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ArticleCard {...article} categorySlug={category.slug} />
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
      <div className="z-20 flex flex-col items-center gap-4 rounded-b-3xl bg-white p-6">
        <h3 className="text-2xl font-bold">{props.title}</h3>
        <p className="text-sm">{props.subtitle}</p>
        <Button asChild transition={"scale"} className="ml-auto">
          <Link href={`/akademi/${props.categorySlug}/${props.slug}` as Route}>
            Lihat Selengkapnya <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const payload = await getPayload({ config });

  try {
    const { docs } = await payload.find({
      collection: "akademi-categories",
      sort: "-createdAt",
      limit: 100,
    });

    return docs.map((category) => ({
      slug: category.slug,
    }));
  } catch (err) {
    console.error(
      "[ERR] Error generating static params in /akademi/[category]: ",
      err,
    );
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryArticles(slug);

  if (!category) {
    return {
      title: "Akademi Category Not Found | Dompetin",
    };
  }

  return {
    title: `${category.title} | Dompetin`,
    description: category.subtitle || category.title,
  };
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
        },
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

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { LexicalRenderer } from "@/components/lexical-renderer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { AkademiArticle } from "@/payload-types";
import config from "@payload-config";
import { getPayload } from "payload";
import type { Metadata } from "next";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    article: string;
    category: string;
  }>;
}

const AkademiArticlePage = async ({ params }: PageProps) => {
  const { article: slug, category } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Container className="max-w-4xl gap-8">
        <Button asChild variant="ghost" className="w-fit px-3">
          <Link href={`/akademi/${category}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Link>
        </Button>

        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-primary text-4xl font-bold md:text-5xl">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-xl text-neutral-600 md:text-2xl">
                {article.subtitle}
              </p>
            )}
          </div>

          {article.content && <LexicalRenderer content={article.content} />}
        </article>
      </Container>
    </>
  );
};

async function getArticleBySlug(slug: string) {
  const payload = await getPayload({ config });
  let article: AkademiArticle | null = null;

  try {
    const { docs } = await payload.find({
      collection: "akademi-article",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    if (docs.length > 0) {
      article = docs[0];
    }
  } catch (err) {
    console.error("[ERR] Error fetching article by slug: ", err);
  }

  return article;
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });

  try {
    const { docs } = await payload.find({
      collection: "akademi-article",
      limit: 1000,
    });

    return docs.map((article) => ({
      slug: article.slug,
    }));
  } catch (err) {
    console.error(
      "[ERR] Error generating static params /akademi/[category]/[article]: ",
      err,
    );
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { article: slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | Dompetin`,
    description: article.subtitle || article.title,
  };
}

export default AkademiArticlePage;

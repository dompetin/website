import Container from "@/components/container";
import { LexicalRenderer } from "@/components/lexical-renderer";
import { Pattern } from "@/components/pattern";
import type { PrivacyPolicyPage } from "@/payload-types";
import config from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export const revalidate = 864_000;

const PrivacyPolicyPage = async () => {
  const payload = await getPayload({ config })
  let page: PrivacyPolicyPage;

  try {
    const { docs: [res] } = await payload.find({
      collection: "privacy-policy-page",
      sort: "-createdAt",
    });
    page = res;
  } catch (err) {
    console.error("[ERR] Error fetching privacy policy page: ", err);
    return notFound()
  }

  return (
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />
      <Container className="max-w-4xl gap-8">

        <article className="space-y-8">
          {page.content && <LexicalRenderer content={page.content} />}
        </article>
      </Container>
    </main>
  )
};

export default PrivacyPolicyPage;

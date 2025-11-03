import Container from "@/components/container";
import { LexicalRenderer } from "@/components/lexical-renderer";
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
    <>
      <Container className="max-w-4xl gap-8">

        <article className="space-y-8">
          {page.content && <LexicalRenderer content={page.content} />}
        </article>
      </Container>
    </>
  )
};

export default PrivacyPolicyPage;

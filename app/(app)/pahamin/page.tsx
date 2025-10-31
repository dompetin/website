import Container from "@/components/container";
import { Pattern } from "@/components/pattern";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { PahaminPage } from "@/payload-types";
import config from "@payload-config";
import { getPayload } from "payload";

export const revalidate = 3600;

const PahaminPage = async () => {
  const pahaminData = await getPahaminData();

  const title = pahaminData?.title || "Pahami dulu cara mainnya";
  const subtitle = pahaminData?.subtitle || "Sebelum uang sisamu di-Dompetin";
  const accordionItems = pahaminData?.accordionItems || [];

  return (
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />

      <Container className="gap-12">
        <div className="space-y-2 text-center">
          <p className="text-lg md:text-2xl">{subtitle}</p>
          <p className="text-primary text-3xl font-bold md:text-5xl">{title}</p>
        </div>

        <div className="rounded-3xl">
          <Accordion type="single" collapsible className="space-y-2">
            {accordionItems.length > 0 ? (
              accordionItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>
                    <div className="flex flex-col text-left font-bold">
                      <span className="text-2xl md:text-3xl">{item.title}</span>
                      <span className="text-muted-foreground text-base">
                        {item.subtitle}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2 font-bold">Definisi</p>
                        <p>{item.definition}</p>
                      </div>

                      <div>
                        <p className="mb-2 font-bold">Risiko</p>
                        <p>{item.risks}</p>
                      </div>

                      <div>
                        <p className="mb-2 font-bold">Keuntungan</p>
                        <p>{item.benefits}</p>
                      </div>

                      {item.recommendations &&
                        item.recommendations.length > 0 && (
                          <>
                            <p className="mb-2 font-bold">Rekomendasi</p>
                            <div className="flex gap-4 overflow-x-auto">
                              {item.recommendations.map((rec, recIndex) => (
                                <div
                                  key={recIndex}
                                  className="border-accent w-sm shrink-0 rounded-lg border p-4 shadow-md"
                                >
                                  <p className="text-center text-xl font-semibold">
                                    {rec.title.toUpperCase()}
                                  </p>
                                  {rec.content && (
                                    <div className="space-y-2">
                                      {rec.content.map((cardContent, i) => (
                                        <div key={i} className="font-bold">
                                          <p className="text-lg">
                                            {cardContent.title}
                                          </p>
                                          <p className="text-primary">
                                            {cardContent.description}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="text-muted-foreground text-center">
                Belum ada data tersedia.
              </p>
            )}
          </Accordion>
        </div>
      </Container>
    </main>
  );
};

async function getPahaminData() {
  const payload = await getPayload({ config });
  let data: PahaminPage | null = null;

  try {
    const {
      docs: [page],
    } = await payload.find({
      collection: "pahamin-page",
    });
    data = page;
  } catch (err) {
    console.error("[ERR] Unknown error fetching CMS data: ", err);
  }

  return data;
}

export default PahaminPage;

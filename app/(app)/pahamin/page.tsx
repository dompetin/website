import { Pattern } from "@/components/pattern";
import Container from "@/components/container";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { getPayload } from "payload";
import config from "@payload-config";

const PahaminPage = async () => {
  const pahaminData = await getPahaminData();

  const title = pahaminData?.title || "Pahami dulu cara mainnya";
  const subtitle = pahaminData?.subtitle || "Sebelum uang sisamu di-Dompetin";
  const accordionItems = pahaminData?.accordionItems;

  return (
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />

      <Container className="gap-12">
        <div className="space-y-2 text-center">
          <p className="text-lg md:text-2xl">
            {subtitle}
          </p>
          <p className="text-primary text-3xl font-bold md:text-5xl">{title}</p>
        </div>

        <div className="rounded-3xl">
          <Accordion type="single" collapsible className="space-y-2">
            {accordionItems.length > 0 ? (
              accordionItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>
                    <div className="flex flex-col text-left">
                      <span className="text-2xl font-bold md:text-3xl">
                        {item.title}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {item.subtitle}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
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
                          <div>
                            <p className="mb-2 font-bold">Rekomendasi</p>
                            <div className="space-y-2">
                              {item.recommendations.map((rec, recIndex) => (
                                <div key={recIndex}>
                                  <p className="font-semibold">{rec.title}</p>
                                  <p className="ml-4">
                                    <strong>{rec.content.title}:</strong>{" "}
                                    {rec.content.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
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
  const {
    docs: [result],
  } = await payload.find({
    collection: "pahamin-page",
  });

  return result;
}

export default PahaminPage;

import Container from "@/components/container";
import { Metadata } from "next";
import * as m from "@/lib/motion";
import { KupasFilters } from "./kupas-filters";
import { KUPAS_ARTICLES } from "./kupas-data";
import { KupasNewsletter } from "./kupas-newsletter";

export const metadata: Metadata = {
  title: "Kupas | Dompetin",
};


// ─── Page ─────────────────────────────────────────────────────────────────────

const KupasPage = () => {
  return (
    <>
      <Container className="max-w-4xl gap-16">

        {/* Hero */}
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-lg md:text-2xl">Cerita dibalik data?</h2>
          <h1 className="flex flex-wrap items-center justify-center gap-3 text-4xl font-bold md:text-6xl">
            Yuk Kita{" "}
            <m.span
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
              className="text-primary"
            >
              {" "}
              Kupas
            </m.span>
          </h1>
          <p>
            Lewat visual, data dan insight, kita cari tahu fenomena keuangan di
            sekitar kita
          </p>
        </div>

        {/* All articles — search + filter + CardWithImage-style grid */}
        <KupasFilters articles={KUPAS_ARTICLES} />

        {/* Newsletter CTA */}
        <KupasNewsletter />

      </Container>
    </>
  );
};

export default KupasPage;
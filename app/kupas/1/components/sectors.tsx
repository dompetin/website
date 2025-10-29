import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CONTENT = [
  {
    title: "Kesehatan",
    description:
      "Industri yang bergerak di bidang layanan kesehatan dan farmasi. Isinya rumah sakit, produsen obat, alat medis, dan penyedia layanan laboratorium.",
    topStocks: [
      "SRAJ",
      "MIKA",
      "SILO",
      "HEAL",
      "SIDO",
      "SOHO",
      "TSPC",
      "PRAY",
      "CARE",
    ],
  },
  {
    title: "Bahan Dasar",
    description:
      "Mencakup perusahaan yang memproduksi bahan mentah dan komoditas dasar seperti logam, mineral, semen, dan kimia.",
    topStocks: [
      "TPIA",
      "AMMN",
      "BRPT",
      "BRMS",
      "ANTM",
      "NCKL",
      "EMAS",
      "MBMA",
      "MDKA",
      "INCO",
    ],
  },
  {
    title: "Keuangan",
    description:
      "Berisi bank, asuransi, dan lembaga pembiayaan. Sektor ini mencerminkan seberapa sehat perputaran uang di masyarakat dan seberapa kuat konsumsi serta investasi domestik berjalan.",
    topStocks: [
      "BBCA",
      "BBRI",
      "BMRI",
      "BNLI",
      "BBNI",
      "DNET",
      "BRIS",
      "SMMA",
      "CASA",
      "COIN",
    ],
  },
  {
    title: "Teknologi",
    description:
      "Sektor yang berisi perusahaan berbasis digital dari e-commerce, software, data center, hingga layanan finansial berbasis teknologi (fintech)",
    topStocks: [
      "DCII",
      "MLPT",
      "EMTK",
      "GOTO",
      "BELI",
      "WIFI",
      "BUKA",
      "EDGE",
      "CYBR",
      "MTDL",
    ],
  },
  {
    title: "Energi",
    description:
      "Meliputi perusahaan yang memproduksi dan mendistribusikan energi, baik fosil seperti minyak dan batubara, maupun terbarukan seperti panas bumi dan tenaga surya.",
    topStocks: [
      "DSSA",
      "BYAN",
      "CUAN",
      "PTRO",
      "AADI",
      "ADMR",
      "GEMS",
      "BUMI",
      "PGAS",
      "MEDC",
    ],
  },
  {
    title: "Properti",
    description:
      "Mengembangkan dan mengelola perumahan, gedung, serta kawasan komersial yang mendukung aktivitas ekonomi dan kehidupan masyarakat.",
    topStocks: [
      "PANI",
      "MPRO",
      "RISE",
      "CBDK",
      "MKPI",
      "BKSL",
      "BSDE",
      "PWON",
      "CTRA",
      "JRPT",
    ],
  },
  {
    title: "Barang Konsumsi: Siklikal",
    description:
      "Industri ini menghasilkan produk yang kita konsumsi sehari-hari dari makanan dan minuman sampai pakaian dan kebutuhan rumah tangga. Barang konsumsi siklikal adalah arang konsumsi menengah ke atas, lebih sensitif terhadap daya beli dan tren gaya hidup.",
    topStocks: [
      "MASA",
      "FILM",
      "MSIN",
      "SCMA",
      "MDIY",
      "MAPI",
      "POLU",
      "MAPA",
      "KPIG",
      "BUVA",
    ],
  },
  {
    title: "Barang Konsumsi: Non-Siklikal",
    description:
      "Industri ini menghasilkan produk yang kita konsumsi sehari-hari dari makanan dan minuman sampai pakaian dan kebutuhan rumah tangga. Barang konsumsi non-siklikal adalah barang kebutuhan pokok, stabil sepanjang waktu.",
    topStocks: [
      "PGUN",
      "ICBP",
      "AMRT",
      "HMSP",
      "CPIN",
      "UNVR",
      "INDF",
      "MYOR",
      "JARR",
      "CMRY",
    ],
  },
  {
    title: "Industri",
    description:
      "Perusahaan di sektor ini mengelola proses produksi barang dan jasa dalam skala besar: transportasi, mesin, manufaktur, dan logistik. Mereka memastikan rantai pasok nasional berjalan dari bahan mentah hingga produk jadi.",
    topStocks: [
      "ASII",
      "IMPC",
      "UNTR",
      "BNBR",
      "SMIL",
      "SKRN",
      "ARNA",
      "HEXA",
      "BHIT",
      "TOTO",
    ],
  },
  {
    title: "Transportasi & Logistik",
    description:
      "Mengelola pergerakan barang dan manusia melalui darat, laut, dan udara, serta memastikan distribusi dan rantai pasok",
    topStocks: [
      "GIAA",
      "TMAS",
      "SMDR",
      "BIRD",
      "ASSA",
      "ELPI",
      "HATM",
      "IMJS",
      "BLOG",
      "MITI",
    ],
  },
  {
    title: "Infrakstruktur",
    description:
      "Membangun dan memelihara fasilitas publik seperti jalan, jembatan, dan transportasi yang menjadi tulang punggung pertumbuhan ekonomi nasional.",
    topStocks: [
      "BREN",
      "TLKM",
      "CDIA",
      "ISAT",
      "PGEO",
      "SUPR",
      "MTEL",
      "EXCL",
      "TBIG",
      "TOWR",
    ],
  },
];

export const Sectors = () => (
  <Accordion
    collapsible
    type="single"
    className="mx-auto w-full max-w-3xl space-y-2"
  >
    {CONTENT.map((item, i) => (
      <AccordionItem value={String(i)} key={i} className="">
        <AccordionTrigger className="">
          <div className="flex w-full flex-col gap-1 text-left">
            <p className="text-2xl font-bold sm:text-3xl">{item.title}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground space-y-3 text-left text-base leading-relaxed sm:text-lg">
          <p>{item.description}</p>

          <p className="text-lg font-bold text-neutral-700">
            Top 10 Saham di {item.title}
          </p>

          <div className="mx-auto flex w-full max-w-lg flex-wrap justify-center gap-2">
            {item.topStocks.map((stock) => (
              <div
                key={stock}
                className="text-primary flex w-fit items-center justify-center rounded-3xl bg-white px-3 py-2 font-bold shadow-lg"
              >
                {stock}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

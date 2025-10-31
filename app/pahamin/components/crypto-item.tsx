import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function CryptoItem() {
  return (
    <AccordionItem value="crypto">
      <AccordionTrigger>
        <div className="flex w-full flex-col gap-1 text-left">
          <span className="text-2xl font-bold sm:text-3xl">Cryptocurrency</span>
          <span className="text-muted-foreground text-base font-bold sm:text-lg">
            Katanya bitcoin itu emas versi digital? Apa benar?
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-foreground space-y-4 text-left text-base leading-relaxed sm:text-lg">
        <div>
          <p className="mb-2 font-bold">Definisi</p>
          <p>
            Cryptocurrency adalah aset digital yang berbasis teknologi blockchain.
            Contohnya Bitcoin, Ethereum, dan berbagai coin lainnya. Crypto dapat
            digunakan sebagai alat tukar, penyimpan nilai, atau instrumen investasi
            spekulatif.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Risiko</p>
          <p>
            Crypto memiliki risiko sangat tinggi dengan volatilitas ekstrem, bisa
            naik atau turun 50% dalam seminggu. Risiko lain meliputi hack exchange,
            loss of private key, dan regulasi yang belum jelas.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Keuntungan</p>
          <p>
            Keuntungan crypto bisa luar biasa besar untuk trader beruntung. Crypto
            juga memberikan akses ke ekosistem teknologi terdesentralisasi dan
            potensi revolusi finansial digital.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Perbandingan Suku Bunga di Bank Bank Indonesia</p>
          <p>
            Crypto tidak memberikan bunga, tetapi return dapat mencapai ratusan
            persen per tahun (atau kerugian total). Crypto adalah instrumen
            spekulatif yang sangat berbeda dari produk perbankan konvensional.
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

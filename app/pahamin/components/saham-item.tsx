import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function SahamItem() {
  return (
    <AccordionItem value="saham">
      <AccordionTrigger>
        <div className="flex w-full flex-col gap-1 text-left">
          <span className="text-2xl font-bold sm:text-3xl">Saham</span>
          <span className="text-muted-foreground text-base font-bold sm:text-lg">
            Mau jadi pemilik perusahaan besar kayak BCA, Telkom, atau Unilever?
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-foreground space-y-4 text-left text-base leading-relaxed sm:text-lg">
        <div>
          <p className="mb-2 font-bold">Definisi</p>
          <p>
            Saham adalah surat berharga yang mewakili kepemilikan sebagian dari
            perusahaan. Dengan membeli saham, kamu menjadi pemegang saham atau
            partial owner dari perusahaan tersebut.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Risiko</p>
          <p>
            Saham memiliki risiko tinggi karena harga berfluktuasi signifikan
            setiap hari. Risiko terbesar adalah kehilangan modal jika perusahaan
            bangkrut atau harga jatuh drastis.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Keuntungan</p>
          <p>
            Keuntungan saham bisa sangat besar melalui capital gain dari kenaikan
            harga dan dividen dari pembagian laba. Saham juga memberikan
            kesempatan menjadi pemilik bisnis sukses.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Perbandingan Suku Bunga di Bank Bank Indonesia</p>
          <p>
            Saham tidak memberikan bunga tetap, tetapi return berpotensi 10-30%
            per tahun atau bahkan lebih jika memilih saham yang tepat. Diversifikasi
            dan riset fundamental sangat penting untuk sukses di pasar saham.
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

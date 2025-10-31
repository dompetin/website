import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ObligasiItem() {
  return (
    <AccordionItem value="obligasi">
      <AccordionTrigger>
        <div className="flex w-full flex-col gap-1 text-left">
          <span className="text-2xl font-bold sm:text-3xl">Obligasi</span>
          <span className="text-muted-foreground text-base font-bold sm:text-lg">
            Mau bantu bayarin negara sambil dapet cuan tiap bulan?
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-foreground space-y-4 text-left text-base leading-relaxed sm:text-lg">
        <div>
          <p className="mb-2 font-bold">Definisi</p>
          <p>
            Obligasi adalah surat utang yang diterbitkan oleh pemerintah atau
            perusahaan. Ketika membeli obligasi, kamu meminjamkan uang dan
            mendapat kupon berkala serta pokok kembali pada saat jatuh tempo.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Risiko</p>
          <p>
            Risiko obligasi meliputi risiko kredit (penerbit tidak bisa bayar),
            risiko suku bunga (harga turun jika bunga pasar naik), dan risiko
            likuiditas untuk obligasi tertentu.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Keuntungan</p>
          <p>
            Obligasi memberikan pendapatan tetap melalui kupon berkala dan lebih
            stabil dibanding saham. Obligasi negara memiliki risiko rendah dan
            cocok untuk investor konservatif.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Perbandingan Suku Bunga di Bank Bank Indonesia</p>
          <p>
            Obligasi pemerintah Indonesia umumnya memberikan yield 6-7% per
            tahun, lebih tinggi dari bunga deposito. Obligasi korporasi
            memberikan yield lebih tinggi tapi dengan risiko lebih besar.
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

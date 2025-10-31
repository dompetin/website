import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function DepositoItem() {
  return (
    <AccordionItem value="deposito">
      <AccordionTrigger>
        <div className="flex w-full flex-col gap-1 text-left">
          <span className="text-2xl font-bold sm:text-3xl">Deposito</span>
          <span className="text-muted-foreground text-base font-bold sm:text-lg">
            Mau uang kamu kerja tanpa risiko tapi tetap tumbuh tiap bulan?
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-foreground space-y-4 text-left text-base leading-relaxed sm:text-lg">
        <div>
          <p className="mb-2 font-bold">Definisi</p>
          <p>
            Deposito adalah produk tabungan berjangka dengan bunga tetap yang
            dijamin Lembaga Penjamin Simpanan. Dana ditempatkan selama periode
            tertentu dan akan memberikan return yang stabil.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Risiko</p>
          <p>
            Risiko deposito sangat rendah karena dijamin oleh lembaga penjamin.
            Satu-satunya risiko adalah jika kamu menarik dana sebelum jatuh
            tempo, kamu akan dikenai penalti.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Keuntungan</p>
          <p>
            Keuntungan deposito adalah bunga yang pasti dan dapat diprediksi.
            Cocok untuk tujuan jangka pendek sampai tiga tahun dengan risiko
            minimal.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Perbandingan Suku Bunga di Bank Bank Indonesia</p>
          <p>
            Bank-bank besar di Indonesia menawarkan suku bunga deposito berkisar
            antara 4-5% per tahun untuk tenor tertentu. Bank swasta umumnya
            memberikan bunga lebih kompetitif dibanding bank pemerintah.
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

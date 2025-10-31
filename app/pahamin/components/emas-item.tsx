import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function EmasItem() {
  return (
    <AccordionItem value="emas">
      <AccordionTrigger>
        <div className="flex w-full flex-col gap-1 text-left">
          <span className="text-2xl font-bold sm:text-3xl">Emas</span>
          <span className="text-muted-foreground text-base font-bold sm:text-lg">
            Mau cari perisai finansial dari jaman peradaban kuno?
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-foreground space-y-4 text-left text-base leading-relaxed sm:text-lg">
        <div>
          <p className="mb-2 font-bold">Definisi</p>
          <p>
            Emas adalah logam mulia yang memiliki nilai intrinsik tinggi dan
            diakui secara global. Emas dapat dimiliki dalam bentuk fisik atau
            digital melalui platform investasi terpercaya.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Risiko</p>
          <p>
            Harga emas berfluktuasi mengikuti kondisi pasar global dan nilai
            rupiah. Risiko utama adalah volatilitas harga jangka pendek dan
            biaya penyimpanan untuk emas fisik.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Keuntungan</p>
          <p>
            Emas adalah perlindungan nilai jangka panjang terhadap inflasi dan
            ketidakpastian ekonomi. Emas juga dapat dicairkan dengan cepat dan
            memiliki likuiditas tinggi di pasar.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Perbandingan Suku Bunga di Bank Bank Indonesia</p>
          <p>
            Emas tidak memberikan bunga atau kupon seperti produk keuangan
            tradisional. Keuntungan emas diperoleh dari apresiasi harga, bukan
            dari pendapatan berkala.
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

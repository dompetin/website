import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ReksadanaItem() {
  return (
    <AccordionItem value="reksadana">
      <AccordionTrigger>
        <div className="flex w-full flex-col gap-1 text-left">
          <span className="text-2xl font-bold sm:text-3xl">Reksadana</span>
          <span className="text-muted-foreground text-base font-bold sm:text-lg">
            Mau investasi tapi nggak pusing milih satu-satu? Ada yang ngatur
            buat kamu!
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-foreground space-y-4 text-left text-base leading-relaxed sm:text-lg">
        <div>
          <p className="mb-2 font-bold">Definisi</p>
          <p>
            Reksadana adalah wadah investasi yang mengumpulkan dana dari banyak
            investor dan dikelola oleh manajer investasi profesional. Investornya
            membeli unit penyertaan dengan harga yang berbeda-beda setiap hari.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Risiko</p>
          <p>
            Risiko reksadana bergantung pada jenisnya. Reksadana pasar uang
            memiliki risiko terendah, sementara reksadana saham memiliki risiko
            tertinggi karena fluktuasi pasar saham yang tinggi.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Keuntungan</p>
          <p>
            Reksadana memungkinkan diversifikasi mudah tanpa perlu mengelola
            sendiri. Kamu bisa mulai dari modal kecil dan mendapat return yang
            sesuai dengan profil risiko melalui pengelolaan profesional.
          </p>
        </div>
        <div>
          <p className="mb-2 font-bold">Perbandingan Suku Bunga di Bank Bank Indonesia</p>
          <p>
            Return reksadana bervariasi dari 3-10% per tahun tergantung jenis
            dan kondisi pasar. Reksadana pasar uang memberikan return mirip
            deposito, sementara reksadana saham berpotensi return lebih tinggi.
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

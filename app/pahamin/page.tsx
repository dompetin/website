import type { ReactNode } from "react";

import { Pattern } from "@/components/pattern";
import Container from "@/components/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type KnowledgeItem = {
  value: string;
  title: string;
  description: string;
  content: ReactNode;
};

const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    value: "deposito",
    title: "Deposito",
    description:
      "Mau uang kamu kerja tanpa risiko tapi tetap tumbuh tiap bulan?",
    content: (
      <>
        <p>
          Deposito adalah tabungan berjangka dengan bunga tetap yang dijamin
          Lembaga Penjamin Simpanan selama kamu tidak menaruh dana di satu bank
          lebih dari batas yang berlaku.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Cocok buat tujuan jangka pendek sampai tiga tahun.</li>
          <li>
            Bunga biasanya lebih tinggi dari tabungan biasa, tapi danamu harus
            mengendap sampai jatuh tempo.
          </li>
          <li>
            Tarik sebelum waktunya? Siap-siap kena penalti dan bunga hangus.
          </li>
        </ul>
      </>
    ),
  },
  {
    value: "emas",
    title: "Emas",
    description: "Mau cari perisai finansial dari jaman peradaban kuno?",
    content: (
      <>
        <p>
          Emas dikenal stabil nilainya karena terbatas jumlahnya. Biasanya
          dipakai buat lindungi daya beli dari inflasi.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Cocok buat simpanan jangka menengah dengan tujuan menjaga nilai
            kekayaan.
          </li>
          <li>
            Harga bisa naik turun, jadi jangan panik kalau ada koreksi jangka
            pendek.
          </li>
          <li>
            Pilih platform resmi biar emas digitalmu benar-benar disimpan dan
            diawasi otoritas.
          </li>
        </ul>
      </>
    ),
  },
  {
    value: "obligasi",
    title: "Obligasi",
    description: "Mau bantu bayarin negara sambil dapet cuan tiap bulan?",
    content: (
      <>
        <p>
          Obligasi adalah surat utang. Kamu meminjamkan uang ke pemerintah atau
          korporasi, lalu dibayar kupon secara berkala dan pokoknya saat jatuh
          tempo.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Untuk pemula, Surat Berharga Negara ritel cocok karena dijamin
            pemerintah.
          </li>
          <li>
            Kupon bisa lebih tinggi dari deposito, tapi harga bisa turun kalau
            suku bunga pasar naik.
          </li>
          <li>
            Pegang sampai jatuh tempo buat kunci cuan, atau jual di pasar
            sekunder kalau butuh likuiditas.
          </li>
        </ul>
      </>
    ),
  },
  {
    value: "reksadana",
    title: "Reksadana",
    description:
      "Mau investasi tapi nggak pusing milih satu-satu? Ada yang ngatur buat kamu!",
    content: (
      <>
        <p>
          Reksadana mengumpulkan modal dari banyak investor dan dikelola manajer
          investasi. Kamu tinggal pilih produk sesuai profil risiko.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Pilih RD pasar uang kalau mau aman, RD pendapatan tetap buat kupon,
            RD campuran atau saham buat potensi lebih tinggi.
          </li>
          <li>
            Pahami biaya: ada subscription, redemption, dan management fee.
          </li>
          <li>
            Cek kinerja konsisten minimal 3-5 tahun dan baca fund fact sheet
            sebelum beli.
          </li>
        </ul>
      </>
    ),
  },
  {
    value: "saham",
    title: "Saham",
    description:
      "Mau jadi pemilik perusahaan besar kayak BCA, Telkom, atau Unilever?",
    content: (
      <>
        <p>
          Saham memberikan kepemilikan perusahaan. Keuntungannya bisa dari
          kenaikan harga (capital gain) dan dividen kalau perusahaan bagi laba.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Wajib siap dengan fluktuasi harian. Lihat fundamental dan rencana
            bisnis perusahaan.
          </li>
          <li>
            Diversifikasi lintas sektor biar risiko tidak menumpuk di satu
            emiten.
          </li>
          <li>
            Gunakan dana dingin dan punya horizon investasi minimal 5 tahun.
          </li>
        </ul>
      </>
    ),
  },
  {
    value: "crypto",
    title: "Cryptocurrency",
    description: "Katanya bitcoin itu emas versi digital? Apa benar?",
    content: (
      <>
        <p>
          Crypto adalah aset digital berbasis blockchain. Potensi cuan tinggi,
          tapi volatilitasnya ekstrem dan regulasinya terus berkembang.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Hanya pakai sebagian kecil portofolio yang siap hilang nilainya.
          </li>
          <li>
            Simpan di exchange terdaftar Bappebti atau pakai wallet pribadi yang
            kamu mengerti cara pakainya.
          </li>
          <li>
            Waspada hype jangka pendek dan selalu riset tokenomics sebelum beli.
          </li>
        </ul>
      </>
    ),
  },
];

const PahaminPage = () => {
  return (
    <main className="relative min-h-screen pt-30">
      <Pattern className="top-0 bottom-auto h-auto rotate-180 opacity-50" />

      <Container className="gap-12">
        <div className="space-y-2 text-center">
          <p className="text-lg md:text-2xl">
            Sebelum uang sisamu di-
            <span className="text-primary font-bold">Dompetin</span>,
          </p>
          <p className="text-primary text-3xl font-bold md:text-5xl">
            Pahami dulu cara mainnya.
          </p>
        </div>

        <div className="rounded-3xl">
          <Accordion type="single" collapsible className="space-y-2">
            {KNOWLEDGE_ITEMS.map((item) => (
              <AccordionItem key={item.value} value={item.value} className="">
                <AccordionTrigger className="">
                  <div className="flex w-full flex-col gap-1 text-left">
                    <span className="text-2xl font-bold sm:text-3xl">
                      {item.title}
                    </span>
                    <span className="text-muted-foreground text-base font-bold sm:text-lg">
                      {item.description}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3 px-2 text-left text-base leading-relaxed sm:px-4 sm:text-lg">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>

      <Pattern className="h-auto opacity-50" />
    </main>
  );
};

export default PahaminPage;

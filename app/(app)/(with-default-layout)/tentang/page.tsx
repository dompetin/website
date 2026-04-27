import Container from "@/components/container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TentangFaq } from "./tentang-faq";

export const metadata: Metadata = {
  title: "Tentang Kami | Dompetin",
};

// ─── Data ──────────────────────────────────────────────────────────────────────

const CONTACT = [
  { icon: "📧", title: "Email",       val: "halo@dompetin.id",    sub: "Untuk pertanyaan umum"            },
  { icon: "🤝", title: "Kolaborasi",  val: "partner@dompetin.id", sub: "Untuk partnership & sponsorship"  },
  { icon: "📰", title: "Media",       val: "press@dompetin.id",   sub: "Untuk liputan & press"            },
];

const FAQS = [
  {
    q: "Apakah simulasi Dompetin akurat?",
    a: "Simulasi kami menggunakan data historis return rata-rata masing-masing instrumen di Indonesia. Hasilnya adalah estimasi — bukan prediksi pasti. Selalu lakukan riset sendiri sebelum berinvestasi.",
  },
  {
    q: "Apakah data saya disimpan?",
    a: "Dompetin tidak menyimpan data pribadi kamu. Semua kalkulasi dilakukan di browser kamu sendiri. Cek Privacy Policy kami untuk detail lengkap.",
  },
  {
    q: "Siapa target pengguna Dompetin?",
    a: "Dompetin dirancang untuk generasi muda Indonesia (16–35 tahun) yang baru memulai perjalanan finansial mereka — dari pelajar, mahasiswa, hingga fresh graduate.",
  },
  {
    q: "Apakah Dompetin adalah produk investasi?",
    a: "Tidak. Dompetin adalah platform edukasi dan simulasi. Kami tidak menjual produk investasi apapun dan bukan merupakan agen investasi terdaftar.",
  },
];

// ─── Section divider ──────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="h-0.5 w-6 bg-primary" />
      <h2 className="text-xs font-bold text-primary uppercase tracking-widest whitespace-nowrap">
        {label}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TentangKamiPage() {
  return (
    <div className="flex flex-col items-center justify-center">

      {/* ── HERO (original, untouched) ── */}
      <Container className="my-32 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12 lg:gap-16">
        <Image
          src="/tentang-kami/hero.png"
          alt="Hero Image"
          quality={100}
          width={900}
          height={400}
          className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]"
        />
        <div className="space-y-4 md:space-y-6 [&_p]:mt-4 md:[&_p]:mt-6">
          <h1 className="mb-8 text-4xl font-bold leading-none text-black sm:text-5xl md:mb-13 md:text-6xl lg:text-7xl xl:text-[3rem]">
            Tentang
            <br />{" "}
            <span className="text-6xl text-purple-400 sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem]">
              Dompetin
            </span>
          </h1>
          <p className="text-sm font-bold sm:text-base md:text-lg">
            Dompetin adalah gerakan yang membentuk generasi muda menjadi
            generasi yang mapan dan sadar finansial.
          </p>
          <p className="text-sm sm:text-base md:text-lg">
            Kami membantu generasi muda memahami cara menabung, berinvestasi,
            dan mengelola uang dengan cerdas.
          </p>
          <p className="text-base font-bold text-[#A267DD] md:text-lg lg:text-xl">
            Dengan Dompetin, belajar finansial jadi sederhana, relevan, dan
            menyenangkan.
          </p>
        </div>
      </Container>

      <Container>
        <hr className="w-full text-gray-400" />
      </Container>

      {/* ── VISI & MISI — original image for Visi, real HTML for Misi ── */}
      <Container className="grid grid-cols-1 items-start justify-between gap-18 pt-10 pb-16 sm:grid-cols-2 lg:gap-28 xl:gap-32">
        {/* Visi — original untouched */}
        <div className="md:mt-3">
          <Image
            src="/tentang-kami/visi.png"
            alt="Visi Dompetin"
            quality={100}
            width={900}
            height={400}
            className="w-full scale-70 sm:scale-80 md:scale-90"
          />
          <p className="text-justify text-pretty">
            Menumbuhkan generasi muda Indonesia yang cerdas finansial dan
            mandiri, dengan meningkatkan tingkat literasi keuangan nasional dari
            65,4% menjadi 85% dalam 5–10 tahun ke depan, serta membangun
            kebiasaan menabung yang berkelanjutan.
          </p>
        </div>

        {/* Misi — plain numbered list matching original screenshot style */}
        <div>
          <Image
            src="/tentang-kami/misi.png"
            alt="Misi Dompetin"
            quality={100}
            width={900}
            height={400}
            className="w-full scale-70 sm:scale-80 md:scale-90"
          />
          <ol className="ml-5 list-decimal space-y-4 text-lg font-bold text-[#601679] *:text-justify *:text-pretty sm:ml-7 [&_span]:block [&_span]:text-base [&_span]:font-normal [&_span]:text-black [&_span]:mt-1">
            <li>
              Edukasi Finansial yang Relevan
              <span>
                Menyediakan pembelajaran interaktif dan sederhana tentang
                menabung, investasi, dan pengelolaan uang
              </span>
            </li>
            <li>
              Bangun Kebiasaan Finansial Sehat
              <span>
                Membantu pelajar memahami risiko dan strategi investasi melalui
                simulasi portofolio yang berbasis data.
              </span>
            </li>
            <li>
              Dorong Gerakan Finansial Muda
              <span>
                Mendorong praktik keuangan yang konsisten dan bertanggung jawab
                dalam kehidupan sehari-hari.
              </span>
            </li>
          </ol>
        </div>
      </Container>

      {/* ── NEW: FAQ (interactive — client component) ── */}
      <Container className="pb-16">
        <SectionDivider label="FAQ" />
        <TentangFaq faqs={FAQS} />
      </Container>

      {/* ── NEW: Contact ── */}
      <Container className="pb-16">
        <SectionDivider label="Hubungi Kami" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CONTACT.map((c) => (
            <div
              key={c.title}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-white px-5 py-5 shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <span className="text-2xl">{c.icon}</span>
              <p className="font-bold text-sm text-foreground">{c.title}</p>
              <p className="text-xs text-primary font-semibold">{c.val}</p>
              <p className="text-xs text-muted-foreground">{c.sub}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* ── NEW: CTA ── */}
      <Container className="pb-20">
        <div className="rounded-2xl bg-primary px-8 py-10 text-center text-white shadow-xl">
          <div className="text-4xl mb-3">💚</div>
          <h2 className="text-2xl font-extrabold mb-2">
            Siap mulai perjalanan finansialmu?
          </h2>
          <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
            Bergabunglah dengan ribuan anak muda Indonesia yang sudah mulai
            belajar finansial bersama Dompetin.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/simulasi"
              className="bg-white text-primary font-bold text-sm px-6 py-3 rounded-full hover:bg-white/90 transition"
            >
              Coba Simulasi Gratis →
            </Link>
            <Link
              href="/akademi"
              className="border border-white/40 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/10 transition"
            >
              Buka Akademi
            </Link>
          </div>
        </div>
      </Container>

    </div>
  );
}
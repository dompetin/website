import Container from "@/components/container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TentangFaq } from "./tentang-faq";
import { Mail, Handshake, Newspaper, Heart, Rocket, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami | Dompetin",
  description:
    "Dompetin adalah gerakan yang membentuk generasi muda Indonesia menjadi generasi yang mapan dan sadar finansial.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

// Icon components are defined here so they're typed and tree-shakeable.
// The skill audit flagged emojis as icons — replaced with Lucide SVG icons
// for consistent sizing, theming, and screen reader support.
const CONTACT = [
  {
    Icon:  Mail,
    title: "Email",
    val:   "halo@dompetin.id",
    href:  "mailto:halo@dompetin.id",
    sub:   "Untuk pertanyaan umum",
  },
  {
    Icon:  Handshake,
    title: "Kolaborasi",
    val:   "partner@dompetin.id",
    href:  "mailto:partner@dompetin.id",
    sub:   "Untuk partnership & sponsorship",
  },
  {
    Icon:  Newspaper,
    title: "Media",
    val:   "press@dompetin.id",
    href:  "mailto:press@dompetin.id",
    sub:   "Untuk liputan & press",
  },
] as const;

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
] as const;

// ─── SectionDivider ───────────────────────────────────────────────────────────
// Uses <p> not <h2> — these are visual labels, not document-structure headings.
// The heading outline is: h1 (Tentang Dompetin) → h2 (Siap mulai...)
// Adding h2s for every section label would inflate and distort the outline.

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="mb-8 flex items-center gap-3" aria-hidden="true">
      <div className="h-0.5 w-6 rounded-full bg-primary" />
      <p className="whitespace-nowrap text-xs font-bold uppercase tracking-widest text-primary">
        {label}
      </p>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TentangKamiPage() {
  return (
    <div className="flex flex-col items-center justify-center">

      {/* ── HERO ── */}
      <Container className="my-32 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12 lg:gap-16">
        <Image
          src="/tentang-kami/hero.png"
          alt=""
          aria-hidden="true"
          quality={100}
          width={900}
          height={400}
          className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]"
        />
        <div className="space-y-4 md:space-y-6 [&_p]:mt-4 md:[&_p]:mt-6">
          <h1 className="mb-8 text-4xl font-bold leading-none text-black sm:text-5xl md:mb-13 md:text-6xl lg:text-7xl xl:text-[3rem]">
            Tentang
            <br />
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
        <hr className="w-full border-gray-200" />
      </Container>

      {/* ── VISI & MISI ── */}
      {/*
        gap-18 is not a standard Tailwind value and silently outputs nothing.
        Replaced with gap-16 (lg) / gap-20 (xl).
      */}
      <Container className="grid grid-cols-1 items-start justify-between gap-12 pb-16 pt-10 sm:grid-cols-2 lg:gap-16 xl:gap-20">

        {/* Visi */}
        <div className="md:mt-3">
          <Image
            src="/tentang-kami/visi.png"
            alt="Visi Dompetin"
            quality={100}
            width={900}
            height={400}
            className="w-full scale-75 sm:scale-[.80] md:scale-90"
          />
          <p className="text-pretty text-justify">
            Menumbuhkan generasi muda Indonesia yang cerdas finansial dan
            mandiri, dengan meningkatkan tingkat literasi keuangan nasional dari
            65,4% menjadi 85% dalam 5–10 tahun ke depan, serta membangun
            kebiasaan menabung yang berkelanjutan.
          </p>
        </div>

        {/* Misi */}
        <div>
          <Image
            src="/tentang-kami/misi.png"
            alt="Misi Dompetin"
            quality={100}
            width={900}
            height={400}
            className="w-full scale-75 sm:scale-[.80] md:scale-90"
          />
          {/*
            Removed *:text-justify — the universal selector applies to ALL
            descendants including <span> children that are already text-justify
            via the parent. Redundant and can override more specific rules.
            Also removed [&_span]:mt-1 shorthand in favour of a direct class
            on each span for clarity.
          */}
          <ol className="ml-5 list-decimal space-y-4 text-lg font-bold text-[#601679] sm:ml-7">
            <li className="text-justify text-pretty">
              Edukasi Finansial yang Relevan
              <span className="mt-1 block text-base font-normal text-black">
                Menyediakan pembelajaran interaktif dan sederhana tentang
                menabung, investasi, dan pengelolaan uang.
              </span>
            </li>
            <li className="text-justify text-pretty">
              Bangun Kebiasaan Finansial Sehat
              <span className="mt-1 block text-base font-normal text-black">
                Membantu pelajar memahami risiko dan strategi investasi melalui
                simulasi portofolio yang berbasis data.
              </span>
            </li>
            <li className="text-justify text-pretty">
              Dorong Gerakan Finansial Muda
              <span className="mt-1 block text-base font-normal text-black">
                Mendorong praktik keuangan yang konsisten dan bertanggung jawab
                dalam kehidupan sehari-hari.
              </span>
            </li>
          </ol>
        </div>
      </Container>

      {/* ── FAQ ── */}
      <Container className="pb-16">
        <SectionDivider label="FAQ" />
        <TentangFaq faqs={[...FAQS]} />
      </Container>

      {/* ── Hubungi Kami ── */}
      <Container className="pb-16">
        <SectionDivider label="Hubungi Kami" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CONTACT.map((c) => (
            /*
              Each card is an <a> with mailto: so tapping on mobile opens
              the mail client — not just decorative text.
              hover:shadow-md requires layout recalc; using ring instead
              is cheaper and consistent with the rest of the design system.
            */
            <a
              key={c.title}
              href={c.href}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-white px-5 py-5 text-center shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <c.Icon className="size-5 text-primary" aria-hidden="true" />
              </span>
              <p className="text-sm font-bold text-foreground">{c.title}</p>
              <p className="text-xs font-semibold text-primary">{c.val}</p>
              <p className="text-xs text-muted-foreground">{c.sub}</p>
            </a>
          ))}
        </div>
      </Container>

      {/* ── CTA ── */}
      <Container className="pb-20">
        <div className="rounded-2xl bg-primary px-8 py-10 text-center text-white">
          <span className="mb-3 flex justify-center" aria-hidden="true">
            <Heart className="size-10 fill-white/80 text-white" />
          </span>

          <h2 className="mb-2 text-2xl font-extrabold">
            Siap mulai perjalanan finansialmu?
          </h2>
          <p className="mx-auto mb-6 max-w-md text-sm text-white/70">
            Bergabunglah dengan ribuan anak muda Indonesia yang sudah mulai
            belajar finansial bersama Dompetin.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/simulasi"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-primary transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Coba Simulasi Gratis →
            </Link>
            <Link
              href="/akademi"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Buka Akademi
            </Link>
          </div>
        </div>
      </Container>

    </div>
  );
}
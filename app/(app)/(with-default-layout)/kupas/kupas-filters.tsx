"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { KupasArticle } from "./kupas-data";

// ─── Constants ────────────────────────────────────────────────────────────────

const TAG_COLOR: Record<string, string> = {
  Saham:        "bg-purple-100 text-purple-700",
  Makro:        "bg-blue-100 text-blue-700",
  "Reksa Dana": "bg-violet-100 text-violet-700",
  "Gaya Hidup": "bg-amber-100 text-amber-700",
  Inflasi:      "bg-orange-100 text-orange-700",
  Properti:     "bg-green-100 text-green-700",
};

const ALL_TAGS = ["Semua", "Saham", "Makro", "Reksa Dana", "Gaya Hidup", "Inflasi", "Properti"];

// ─── Article card — mirrors CardWithImage exactly ─────────────────────────────
//
// Structure (matches screenshot 1 / Image 1):
//   ┌──────────────────────────┐
//   │  pink bg + floating img  │  ← rounded-t-3xl, bg-[#f5c6db] (same pink as CardWithImage's bg-purple)
//   ├──────────────────────────┤
//   │  Tag  ⏱ time · date     │
//   │  Bold title              │  ← centered text, white bg
//   │  Description             │
//   │  [Lihat Selengkapnya >]  │
//   └──────────────────────────┘

function ArticleCard({ article, index }: { article: KupasArticle; index: number }) {
  const tagCls = TAG_COLOR[article.tag] ?? "bg-gray-100 text-gray-600";
  const isReal = article.real;

  const card = (
    <div className="grid auto-rows-fr rounded-3xl bg-white shadow-lg h-full transition-shadow hover:shadow-xl">
      {/* Image header — same structure as CardWithImage */}
      <div className="bg-[#f8c8e4] relative rounded-t-3xl overflow-hidden" style={{ minHeight: 220 }}>
        {article.src && (
          <div className="absolute -top-10 left-0 aspect-square w-full sm:-top-16">
            <Image
              src={article.src}
              alt={`Dompetin | ${article.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        )}
        {/* Coming-soon overlay */}
        {!isReal && (
          <div className="absolute inset-0 flex items-end justify-end p-3">
            <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground backdrop-blur-sm">
              Segera hadir
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="z-20 flex flex-col items-center gap-3 rounded-b-3xl bg-white p-6 text-center">
        {/* Tag + read time */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${tagCls}`}>
            {article.tag}
          </span>
          <span className="text-xs text-muted-foreground">
            ⏱ {article.time} mnt · {article.date}
          </span>
        </div>

        <h3 className="text-xl font-bold leading-snug">{article.title}</h3>
        <p className="text-sm text-muted-foreground">{article.desc}</p>

        {/* Key insight */}
        <div className="w-full rounded-r-lg border-l-2 border-primary bg-primary/5 px-3 py-2 text-left">
          <p className="text-xs font-semibold text-primary">{article.insight}</p>
        </div>

        <Button
          asChild={isReal}
          disabled={!isReal}
          // @ts-expect-error — transition is a custom prop on Button
          transition="scale"
          className={!isReal ? "opacity-50 cursor-not-allowed" : ""}
        >
          {isReal ? (
            <Link href={article.href}>
              Lihat Selengkapnya <ChevronRight className="ml-1 size-4" />
            </Link>
          ) : (
            <span>Segera Hadir <ChevronRight className="ml-1 size-4" /></span>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div
      className="mt-8"
      style={{
        // Stagger handled via inline style for SSR-safe animation
        animationDelay: `${index * 80}ms`,
      }}
    >
      {card}
    </div>
  );
}

// ─── Main client component ────────────────────────────────────────────────────

export function KupasFilters({ articles }: { articles: KupasArticle[] }) {
  const [search,    setSearch]    = useState("");
  const [activeTag, setActiveTag] = useState("Semua");

  const visible = articles.filter((a) => {
    const tagOk    = activeTag === "Semua" || a.tag === activeTag;
    const q        = search.toLowerCase();
    const searchOk = !q ||
      a.title.toLowerCase().includes(q) ||
      a.desc.toLowerCase().includes(q)  ||
      a.tag.toLowerCase().includes(q);
    return tagOk && searchOk;
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Section heading */}
      <div>
        <h2 className="text-xl font-bold text-foreground">Semua Artikel</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Data, visual, dan insight keuangan dari tim Dompetin.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari topik… saham, inflasi, reksa dana"
          className="w-full rounded-xl border border-border bg-white py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Tag filter pills */}
      <div className="flex flex-wrap gap-2">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-4 py-1 text-xs font-semibold transition ${
              activeTag === tag
                ? "border-primary bg-primary text-white"
                : "border-border bg-white text-muted-foreground hover:border-primary/50 hover:text-primary"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Article grid — 2 columns, same as original CardWithImage grid */}
      {visible.length > 0 ? (
        <div className="grid auto-rows-fr grid-cols-1 gap-3 p-4 md:grid-cols-2 md:gap-8">
          {visible.map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-border py-10 text-center text-sm text-muted-foreground">
          Tidak ada artikel untuk &ldquo;{search || activeTag}&rdquo; — coba kata kunci lain.
        </div>
      )}
    </div>
  );
}
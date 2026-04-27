"use client";

export function KupasNewsletter() {
  return (
    <div className="rounded-2xl bg-primary p-6 text-center text-white shadow-lg">
      <p className="text-xl font-extrabold">
        📬 Jangan ketinggalan insight berikutnya!
      </p>
      <p className="mt-1.5 text-sm text-white/70">
        Daftar email dan kami kabari langsung saat ada artikel data baru —
        biasanya 2x sebulan.
      </p>
      <form
        className="mt-5 flex max-w-sm mx-auto gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="email@kamu.com"
          className="flex-1 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
        <button
          type="submit"
          className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-white/90"
        >
          Daftar
        </button>
      </form>
    </div>
  );
}
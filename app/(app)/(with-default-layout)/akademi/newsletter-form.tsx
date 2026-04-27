"use client";
 
export const NewsletterForm = () => (
  <form
    className="mt-5 flex max-w-sm mx-auto gap-2"
    onSubmit={(e) => e.preventDefault()}
  >
    <input
      type="email"
      placeholder="email@kamu.com"
      className="flex-1 rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
    />
    <button
      type="submit"
      className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
    >
      Daftar
    </button>
  </form>
);
 
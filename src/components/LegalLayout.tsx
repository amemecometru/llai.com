import type { ReactNode } from 'react';

export default function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
      <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.12em] text-lemon-deep">{eyebrow}</p>
      <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tightest md:text-6xl">{title}</h1>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-slate dark:text-dark-ink-soft/60">
        {updated}
      </p>
      <article className="mt-12 space-y-5 font-body text-lg leading-relaxed text-ink-soft dark:text-dark-ink-soft [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-ink dark:[&_h2]:text-dark-ink [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink dark:[&_h3]:text-dark-ink [&_a]:underline [&_a]:decoration-lemon [&_a]:underline-offset-4 hover:[&_a]:text-ink dark:hover:[&_a]:text-dark-ink [&_ul]:list-none [&_ul]:space-y-2 [&_li]:relative [&_li]:pl-5 [&_ul_li:before]:absolute [&_ul_li:before]:left-0 [&_ul_li:before]:top-3 [&_ul_li:before]:h-px [&_ul_li:before]:w-3 [&_ul_li:before]:bg-lemon">
        {children}
      </article>
    </main>
  );
}

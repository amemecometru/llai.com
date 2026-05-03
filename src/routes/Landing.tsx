import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { workflows, tiers, faqs, HERO_IMAGE, brand } from '../data/content';
import SentinelShowcase from '../components/SentinelShowcase';

// Inside your Landing return:
<main>
  <Hero />
  <SentinelShowcase />
  <Pricing />
</main>

/* ---------- HERO (full-bleed, no card) ---------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <section ref={ref} className="relative h-[calc(100svh-4rem)] min-h-[640px] w-full overflow-hidden bg-ink">
      {/* Full-bleed image, parallax */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Editorial overlay — keeps text readable on calm side of image */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent"
      />

      {/* Content column — narrow, anchored left */}
      <div className="relative z-10 mx-auto flex h-full max-w-8xl items-center px-6 md:px-10">
        <div className="max-w-2xl text-cream">
          {/* Brand FIRST and loudest */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="mb-12 flex items-center gap-3"
          >
            <span className="grid h-10 w-10 place-items-center rounded-md bg-lemon text-xl">🍋</span>
            <span className="font-display text-2xl font-bold tracking-tight md:text-3xl">{brand.name}</span>
          </motion.div>

          {/* Headline — staggered word reveal */}
          <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tightest text-balance md:text-7xl lg:text-[6rem]">
            <RevealWords text="Stop drowning in" delay={0.2} />
            <br />
            <RevealWords text="Workspace." delay={0.5} accentLast />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-8 max-w-md font-body text-lg leading-snug text-cream/80 md:text-xl"
          >
            AI workflows for your Google Workspace. No code. Real time saved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#pricing"
              className="group inline-flex items-center gap-2 rounded-full bg-lemon px-6 py-3 font-display text-sm font-semibold text-ink transition hover:brightness-110"
            >
              Start free
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#workflows"
              className="text-sm font-medium text-cream/80 underline decoration-cream/30 underline-offset-4 transition hover:text-cream"
            >
              See the workflow library
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs font-medium uppercase tracking-[0.16em] text-cream/60"
      >
        scroll
      </motion.div>
    </section>
  );
}

function RevealWords({ text, delay = 0, accentLast = false }: { text: string; delay?: number; accentLast?: boolean }) {
  const words = text.split(' ');
  return (
    <span className="inline-block">
      {words.map((w, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={`${w}-${i}`}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: delay + i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className={`mr-[0.25em] inline-block ${accentLast && isLast ? 'italic text-lemon' : ''}`}
            style={{ fontStyle: accentLast && isLast ? 'italic' : undefined }}
          >
            {w}
          </motion.span>
        );
      })}
    </span>
  );
}

/* ---------- ONE WORKFLOW IN DETAIL — split, no card ---------- */
function FeatureSpotlight() {
  return (
    <section className="mx-auto max-w-8xl px-6 py-32 md:px-10 md:py-40">
      <div className="grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.12em] text-lemon-deep">
            One workflow, every morning
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl lg:text-6xl">
            Your standup, <em>already written</em>.
          </h2>
          <p className="mt-6 max-w-md font-body text-lg leading-snug text-ink-soft dark:text-dark-ink-soft">
            At 8 AM LogicLemon walks your calendar, your tasks, and yesterday's commits — and posts a clean standup
            update before you're done with coffee.
          </p>
          <ul className="mt-8 space-y-3 font-body text-base text-ink-soft dark:text-dark-ink-soft">
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-6 shrink-0 bg-lemon" />
              <span>Pulls today's meetings + yesterday's deliverables</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-6 shrink-0 bg-lemon" />
              <span>Drafts in your voice using past standups as reference</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-6 shrink-0 bg-lemon" />
              <span>Posts to Slack, Chat, or your inbox</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-7">
          {/* Editorial mockup — composition, not chrome */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-ink p-10 text-cream shadow-2xl shadow-ink/10 dark:bg-dark-bg-3"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/40">
              friday — 8:01 am
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold">Standup · #team-product</h3>
            <div className="mt-6 space-y-3 font-body text-sm leading-relaxed text-cream/85">
              <p>
                <strong className="text-lemon">Yesterday:</strong> Shipped the workflow runner v2. Reviewed Q4 roadmap
                with @sarah. Closed 3 P1 issues.
              </p>
              <p>
                <strong className="text-lemon">Today:</strong> Customer interviews @ 10. Pricing page review @ 1.
                Heads-down on retention dashboard.
              </p>
              <p>
                <strong className="text-lemon">Blocked:</strong> Need design sign-off on the empty state.
              </p>
            </div>
            <div className="absolute bottom-6 right-8 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/30">
              auto · logiclemon
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WORKFLOW LIBRARY — editorial list, NO card grid ---------- */
function Workflows() {
  return (
    <section id="workflows" className="bg-cream-deep py-32 dark:bg-dark-bg-2 md:py-40">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.12em] text-lemon-deep">
            The Workflow Library
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl lg:text-6xl text-balance">
            Five workflows. <em>Hours back</em> every week.
          </h2>
        </div>

        <ul className="border-t border-border dark:border-dark-border">
          {workflows.map((w, idx) => (
            <WorkflowRow key={w.id} workflow={w} index={idx} />
          ))}
        </ul>

        {/* Custom workflow callout — full-bleed band, no card */}
        <div className="mt-32 grid items-center gap-10 border-t border-border py-16 dark:border-dark-border md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-lemon-deep">
              Custom workflows
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
              Describe it. <em>We'll build it.</em>
            </h3>
          </div>
          <div className="md:col-span-8">
            <p className="font-body text-lg leading-snug text-ink-soft dark:text-dark-ink-soft">
              "Every Friday at 4 PM, send my manager a summary of all decisions made in our Tuesday product reviews —
              with links to the relevant docs."
            </p>
            <p className="mt-4 font-body text-base text-slate dark:text-dark-ink-soft/70">
              Your description, on Pro plans and up, is translated into a working workflow in minutes — and the library
              grows with every customer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowRow({ workflow, index }: { workflow: typeof workflows[number]; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative cursor-default border-b border-border py-10 dark:border-dark-border md:py-12"
    >
      {/* Lemon underline that draws on hover */}
      <span className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-0 bg-lemon transition-all duration-700 group-hover:w-full" />

      <div className="grid items-baseline gap-6 md:grid-cols-12">
        <div className="font-mono text-xs text-slate dark:text-dark-ink-soft/60 md:col-span-1">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="md:col-span-4">
          <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            <span className="mr-2 align-baseline text-xl">{workflow.emoji}</span>
            {workflow.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-slate dark:text-dark-ink-soft/60">
            {workflow.trigger} · saves {workflow.saved}
          </p>
        </div>
        <p className="font-body text-base leading-snug text-ink-soft dark:text-dark-ink-soft md:col-span-6">
          {workflow.description}
        </p>
        <div className="md:col-span-1 md:text-right">
          <span className="inline-block translate-x-0 transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </motion.li>
  );
}

/* ---------- PRICING — clean rows, no card grid ---------- */
function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="pricing" className="mx-auto max-w-8xl px-6 py-32 md:px-10 md:py-40">
      <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.12em] text-lemon-deep">
            Simple pricing
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl lg:text-6xl text-balance">
            Pick a plan. <em>Cancel any time.</em>
          </h2>
        </div>

        <div className="inline-flex items-center gap-1 rounded-full border border-border p-1 text-sm dark:border-dark-border">
          <button
            onClick={() => setBilling('monthly')}
            className={`rounded-full px-4 py-1.5 font-display font-medium transition ${
              billing === 'monthly' ? 'bg-ink text-cream dark:bg-dark-ink dark:text-dark-bg' : 'text-ink-soft dark:text-dark-ink-soft'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`rounded-full px-4 py-1.5 font-display font-medium transition ${
              billing === 'annual' ? 'bg-ink text-cream dark:bg-dark-ink dark:text-dark-bg' : 'text-ink-soft dark:text-dark-ink-soft'
            }`}
          >
            Annual <span className="ml-1 text-[11px] text-lemon-deep">−20%</span>
          </button>
        </div>
      </div>

      <ul className="border-t border-border dark:border-dark-border">
        {tiers.map((t) => (
          <li
            key={t.id}
            className={`grid items-baseline gap-6 border-b border-border py-8 dark:border-dark-border md:grid-cols-12 ${
              t.featured ? 'bg-cream/0' : ''
            }`}
          >
            <div className="md:col-span-3">
              <h3
                className={`font-display ${
                  t.featured ? 'text-3xl font-bold tracking-tightest' : 'text-2xl font-semibold tracking-tight'
                }`}
              >
                {t.name}
                {t.featured && (
                  <span className="ml-3 inline-block translate-y-[-2px] rounded-full bg-lemon px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-ink">
                    Recommended
                  </span>
                )}
              </h3>
              <p className="mt-1 font-body text-sm text-ink-soft dark:text-dark-ink-soft">{t.tag}</p>
            </div>
            <div className="md:col-span-3">
              <div className="font-display text-3xl font-bold tracking-tighter md:text-4xl">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={`${t.id}-${billing}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                  >
                    {billing === 'monthly' ? t.monthly : t.annual}
                  </motion.span>
                </AnimatePresence>
                <span className="ml-1 font-body text-base font-normal text-ink-soft dark:text-dark-ink-soft">
                  {t.unit}
                </span>
              </div>
              {t.note && <p className="mt-1 font-body text-xs text-slate dark:text-dark-ink-soft/60">{t.note}</p>}
            </div>
            <ul className="space-y-1 font-body text-sm text-ink-soft dark:text-dark-ink-soft md:col-span-4">
              {t.features.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-px w-3 shrink-0 bg-lemon" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="md:col-span-2 md:text-right">
              <a
                href={t.ctaHref}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-medium transition ${
                  t.featured
                    ? 'bg-ink text-cream hover:brightness-110 dark:bg-dark-ink dark:text-dark-bg'
                    : 'border border-border text-ink hover:border-ink dark:border-dark-border dark:text-dark-ink dark:hover:border-dark-ink'
                }`}
              >
                {t.cta} <span>→</span>
              </a>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-8 font-body text-sm text-slate dark:text-dark-ink-soft/70">
        14-day money-back guarantee on paid plans · Cancel any time · SSL + daily backups included.
      </p>
    </section>
  );
}

/* ---------- FAQ — minimal accordion, no card ---------- */
function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24 md:px-10 md:py-32">
      <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.12em] text-lemon-deep">FAQ</p>
      <h2 className="mb-12 font-display text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl text-balance">
        Questions, <em>answered.</em>
      </h2>
      <ul className="border-t border-border dark:border-dark-border">
        {faqs.map((f, i) => (
          <li key={i} className="border-b border-border dark:border-dark-border">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-display text-lg font-medium tracking-tight">
                {f.q}
                <span className="text-2xl font-light text-slate transition-transform group-open:rotate-45 dark:text-dark-ink-soft">
                  +
                </span>
              </summary>
              <p className="pb-6 font-body text-base leading-relaxed text-ink-soft dark:text-dark-ink-soft">{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- FINAL CTA — full-bleed editorial banner ---------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-cream md:py-36 grain">
      <div
        className="pointer-events-none absolute -right-32 top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(245,197,24,0.18) 0%, transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-8xl px-6 md:px-10">
        <h2 className="max-w-3xl font-display text-5xl font-extrabold leading-[1] tracking-tightest md:text-7xl text-balance">
          Stop drowning. <em className="text-lemon">Start automating.</em>
        </h2>
        <p className="mt-8 max-w-md font-body text-lg text-cream/70">
          Sign up for early access. No credit card. Cancel any time.
        </p>
        <a
          href="mailto:hello@logiclemonai.com?subject=Early+access+request"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-lemon px-7 py-3.5 font-display text-base font-semibold text-ink transition hover:brightness-110"
        >
          Get early access <span>→</span>
        </a>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <main>
      <Hero />
      <FeatureSpotlight />
      <Workflows />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </main>
  );
}

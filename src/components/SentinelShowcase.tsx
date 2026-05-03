import React from 'react';
import { motion } from 'framer-motion';

const SENTINEL_MODES = [
  {
    id: 'arbitrage',
    title: 'Arbitrage',
    description: 'Automated monitoring of auction portals and tax records. Find the deal before it hits the MLS.',
    command: '> gws workflow +meeting-prep --signal="listing_id_88"',
    color: 'text-terracotta'
  },
  {
    id: 'sentinel',
    title: 'Sentinel',
    description: 'Stealth browsing of LinkedIn and niche forums. Turn digital conversations into Google Tasks.',
    command: '> bb publish sentinel-leadforge.ts',
    color: 'text-lemon',
    featured: true
  },
  {
    id: 'watchdog',
    title: 'Watchdog',
    description: '24/7 competitor price tracking and sentiment analysis. Know when they move before they do.',
    command: '> gws workflow +weekly-digest --target="comp_a"',
    color: 'text-terracotta'
  }
];

export default function SentinelShowcase() {
  return (
    <section id="sentinels" className="bg-cream py-32 text-ink border-t border-ink/5">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        
        {/* HEADER */}
        <div className="mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-terracotta font-bold">
            Core Protocol
          </span>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
            One Engine. <br />
            <span className="italic font-serif font-normal lowercase text-terracotta">Infinite</span> Signals.
          </h2>
        </div>

        {/* GRID */}
        <div className="grid gap-1 items-stretch md:grid-cols-3">
          {SENTINEL_MODES.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className={`group relative flex flex-col p-10 border border-ink/10 transition-all duration-500 hover:z-20 
                ${mode.featured ? 'bg-ink text-cream shadow-2xl scale-[1.02]' : 'hover:bg-ink hover:text-cream'}`}
            >
              <h3 className="font-display text-3xl font-bold tracking-tighter uppercase">{mode.title}</h3>
              <p className="mt-6 font-body text-sm leading-relaxed opacity-70 group-hover:opacity-90">
                {mode.description}
              </p>
              
              {/* CLI TERMINAL MOCKUP */}
              <div className="mt-auto pt-12">
                <div className={`font-mono text-[10px] p-3 rounded-[2px] bg-black/5 group-hover:bg-white/5 transition-colors
                  ${mode.featured ? 'text-lemon' : 'text-ink/40 group-hover:text-lemon'}`}>
                  {mode.command}
                </div>
              </div>
              
              {/* DECORATIVE ACCENT */}
              <div className={`absolute top-6 right-8 font-mono text-[10px] opacity-20 group-hover:opacity-100 ${mode.color}`}>
                [0{index + 1}]
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

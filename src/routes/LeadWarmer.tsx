import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeadWarmer() {
  const [step, setStep] = useState<'configure' | 'running' | 'results'>('configure');
  const [prospectUrl, setProspectUrl] = useState('');
  const [template, setTemplate] = useState('warm');
  const [companyContext, setCompanyContext] = useState('');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ prospect: string; company: string; signal: string; draft: string } | null>(null);

  const handleRun = async () => {
    setStep('running');
    setProgress(0);
    const interval = setInterval(() => setProgress(p => Math.min(p + Math.random() * 12, 100)), 400);
    await new Promise(resolve => setTimeout(resolve, 3500));
    clearInterval(interval);
    setResult({
      prospect: 'Alex Rodriguez — VP Engineering at Quantum Labs',
      company: 'Quantum Labs (Series B, 65 people, raised $12M). Recent: hired 2 senior engs, launched new API product line.',
      signal: 'Alex posted about scaling engineering teams. You: Former teammate at CloudWorks. Mutual connection: Sarah Kim (CTO).',
      draft: "Hey Alex, saw Quantum Labs just launched the new API — impressive. We've solved similar scaling challenges for teams at CloudWorks. Would love to share how we helped them cut deployment time by 60%. Open to a 15-min chat this week?",
    });
    setStep('results');
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-ink">
      <header className="border-b border-border dark:border-surface-container-high bg-cream-elev/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔗</span>
            <div>
              <h1 className="font-display text-xl font-bold text-ink dark:text-on-surface">Lead Warmer</h1>
              <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">Personalized outreach at scale</p>
            </div>
          </div>
          {step === 'results' && (
            <button onClick={() => setStep('configure')} className="px-4 py-2 rounded-full border border-border dark:border-surface-container-high text-ink-soft dark:text-on-surface hover:bg-cream-veil dark:hover:bg-surface-container-high transition">← Warm Another Lead</button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 'configure' && (
            <motion.div key="configure" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
              <section className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
                  <span className="text-primary-deep dark:text-primary-soft font-label-sm font-semibold">🎯 PERSONALIZED OUTREACH</span>
                </div>
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-4">Actually close more deals.</h2>
                <p className="text-body-lg text-ink-soft dark:text-on-surface-variant max-w-2xl mx-auto">
                  Outreach at scale sounds soulless — it doesn't have to be. Lead Warmer pulls real context about a prospect, then drafts a personalized message that actually feels human. You review. You send. You convert more.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <section className="space-y-6">
                  <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-4">How it works</h3>
                    <ol className="space-y-4">
                      {[
                        { emoji: '🔗', step: '1', title: 'Paste a LinkedIn profile', desc: 'Or any prospect URL' },
                        { emoji: '🔍', step: '2', title: 'AI researches', desc: 'Company, role, recent activity, mutual connections' },
                        { emoji: '✍️', step: '3', title: 'Draft composes', desc: 'Personalized message in your chosen template' },
                        { emoji: '📨', step: '4', title: 'You send', desc: 'Review the draft, edit if needed, send it' },
                      ].map(item => (
                        <li key={item.step} className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-xl bg-primary/15 dark:bg-primary/20 flex items-center justify-center text-xl shrink-0">{item.emoji}</div>
                          <div>
                            <span className="font-display text-body-sm font-semibold text-primary-deep dark:text-primary-soft">Step {item.step}</span>
                            <p className="font-display text-headline-sm text-ink dark:text-on-surface">{item.title}</p>
                            <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-3">🔒 Data Transparency</h3>
                    <ul className="space-y-2 text-body-sm text-ink-soft dark:text-on-surface-variant">
                      <li className="flex gap-2"><span className="text-success">✓</span> Only publicly available LinkedIn profiles</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> No access to message history or connections</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> Enrichment data is not stored</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="rounded-2xl border-2 border-primary/30 dark:border-primary/20 bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-6">Configure your outreach</h3>

                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Prospect LinkedIn Profile</label>
                      <input type="text" value={prospectUrl} onChange={e => setProspectUrl(e.target.value)} placeholder="https://www.linkedin.com/in/..."
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition placeholder:text-ink-muted/50" />
                    </div>
                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Message Template</label>
                      <select value={template} onChange={e => setTemplate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition">
                        <option value="warm">Warm introduction</option>
                        <option value="value">Value-first (no ask)</option>
                        <option value="partner">Partnership angle</option>
                        <option value="casual">Casual / friend tone</option>
                      </select>
                    </div>
                    <div className="mb-8">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">About Your Company (optional)</label>
                      <textarea value={companyContext} onChange={e => setCompanyContext(e.target.value)} placeholder="e.g., We build AI automation for Google Workspace teams" rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition resize-none placeholder:text-ink-muted/50" />
                    </div>

                    <button onClick={handleRun}
                      className="w-full py-4 rounded-xl bg-primary text-on-primary font-display text-headline-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                      ▶ Research & Draft
                    </button>
                    <p className="text-center text-body-xs text-ink-muted dark:text-on-surface-variant mt-4">💰 Pay-per-result: $9.99 per successful enrichment + draft</p>
                  </div>
                </section>
              </div>
            </motion.div>
          )}

          {step === 'running' && (
            <motion.div key="running" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-32">
              <div className="w-full max-w-md space-y-6 text-center">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-border dark:border-surface-container-high animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <span className="absolute inset-0 flex items-center justify-center text-3xl">🔗</span>
                </div>
                <h3 className="font-display text-headline-md text-ink dark:text-on-surface">Researching prospect...</h3>
                <p className="text-ink-soft dark:text-on-surface-variant">Pulling company info, recent activity, mutual connections</p>
                <div className="w-full bg-surface-container-low rounded-full h-3 overflow-hidden dark:bg-surface-container">
                  <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
                <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">{Math.round(Math.min(progress, 100))}% complete</p>
              </div>
            </motion.div>
          )}

          {step === 'results' && result && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-3xl mx-auto">
              <section className="text-center">
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-2">Lead Warmed Up 🔥</h2>
                <p className="text-headline-sm text-ink-soft dark:text-on-surface-variant">Ready to send. Personalized. On point.</p>
              </section>

              <div className="space-y-4">
                <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6">
                  <h3 className="font-label-sm text-primary-deep dark:text-primary-soft font-semibold mb-2">👤 Prospect</h3>
                  <p className="font-body text-headline-sm text-ink dark:text-on-surface">{result.prospect}</p>
                </div>
                <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6">
                  <h3 className="font-label-sm text-primary-deep dark:text-primary-soft font-semibold mb-2">🏢 Company Context</h3>
                  <p className="font-body text-body-md text-ink-soft dark:text-on-surface-variant">{result.company}</p>
                </div>
                <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6">
                  <h3 className="font-label-sm text-primary-deep dark:text-primary-soft font-semibold mb-2">📶 Key Signal</h3>
                  <p className="font-body text-body-md text-ink-soft dark:text-on-surface-variant">{result.signal}</p>
                </div>
                <div className="rounded-2xl border-2 border-primary/30 dark:border-primary/20 bg-primary/5 dark:bg-primary/10 p-6">
                  <h3 className="font-label-sm text-primary-deep dark:text-primary-soft font-semibold mb-3">✍️ Your Drafted Message</h3>
                  <p className="font-body text-body-md text-ink dark:text-on-surface italic leading-relaxed">&ldquo;{result.draft}&rdquo;</p>
                  <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 rounded-lg bg-primary text-on-primary font-medium hover:brightness-110 transition">📋 Copy to Clipboard</button>
                    <button className="px-4 py-2 rounded-lg border border-border dark:border-surface-container-high text-ink-soft dark:text-on-surface hover:bg-cream-veil dark:hover:bg-surface-container-high transition">✏️ Edit & Regenerate</button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6 text-center">
                <p className="text-body-md text-ink-soft dark:text-on-surface-variant">💰 <span className="font-semibold text-ink dark:text-on-surface">Billable outcome:</span> 1 enriched lead + personalized draft</p>
                <p className="text-body-sm text-ink-muted dark:text-on-surface-variant mt-2">$9.99 — charged only for a successfully completed enrichment.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

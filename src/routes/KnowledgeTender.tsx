import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function KnowledgeTender() {
  const [step, setStep] = useState<'configure' | 'running' | 'results'>('configure');
  const [channels, setChannels] = useState('engineering, decisions');
  const [notionDb, setNotionDb] = useState('Team Knowledge Base');
  const [category, setCategory] = useState('standard');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ captured: { title: string; source: string; tags: string[] }[] } | null>(null);

  const handleRun = async () => {
    setStep('running');
    setProgress(0);
    const interval = setInterval(() => setProgress(p => Math.min(p + Math.random() * 10, 100)), 400);
    await new Promise(resolve => setTimeout(resolve, 3500));
    clearInterval(interval);
    setResult({
      captured: [
        { title: 'Caching Strategy — User Profiles', source: '#engineering · @sarah', tags: ['engineering', 'infrastructure', 'best-practices'] },
        { title: 'Decision: Switch to Stripe for billing', source: '#decisions · @alex', tags: ['decisions', 'billing', 'infrastructure'] },
        { title: 'Troubleshooting: CI pipeline fails on Node 18', source: '#engineering · @mike', tags: ['engineering', 'ci-cd', 'troubleshooting'] },
      ],
    });
    setStep('results');
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-ink">
      <header className="border-b border-border dark:border-surface-container-high bg-cream-elev/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <h1 className="font-display text-xl font-bold text-ink dark:text-on-surface">Knowledge Tender</h1>
              <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">Team knowledge that never gets lost</p>
            </div>
          </div>
          {step === 'results' && (
            <button onClick={() => setStep('configure')} className="px-4 py-2 rounded-full border border-border dark:border-surface-container-high text-ink-soft dark:text-on-surface hover:bg-cream-veil dark:hover:bg-surface-container-high transition">← Run Again</button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 'configure' && (
            <motion.div key="configure" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
              <section className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
                  <span className="text-primary-deep dark:text-primary-soft font-label-sm font-semibold">📚 KNOWLEDGE MANAGEMENT</span>
                </div>
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-4">Nothing gets lost. Everything organized.</h2>
                <p className="text-body-lg text-ink-soft dark:text-on-surface-variant max-w-2xl mx-auto">
                  Slack messages disappear, emails get buried, and your best decisions get forgotten. Knowledge Tender watches your conversations, extracts the insights, and organizes them into your team's living knowledge base. Next time someone asks? It's already there.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <section className="space-y-6">
                  <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-4">How it works</h3>
                    <ol className="space-y-4">
                      {[
                        { emoji: '💬', step: '1', title: 'Monitor channels', desc: 'Slack channels and Gmail labels you approve' },
                        { emoji: '🔍', step: '2', title: 'Extract insights', desc: 'AI identifies decisions, best practices, solutions' },
                        { emoji: '📝', step: '3', title: 'Auto-organize', desc: 'Categorizes, tags, and creates structured wiki pages' },
                        { emoji: '📖', step: '4', title: 'Sync to Notion', desc: 'Your team knowledge base stays always current' },
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4 items-start">
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
                      <li className="flex gap-2"><span className="text-success">✓</span> Only messages from approved channels</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> Everything stays in your Notion workspace</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> Nothing shared externally</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="rounded-2xl border-2 border-primary/30 dark:border-primary/20 bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-6">Configure your knowledge capture</h3>

                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Slack Channels to Monitor</label>
                      <textarea value={channels} onChange={e => setChannels(e.target.value)} placeholder="engineering, decisions, best-practices" rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition resize-none placeholder:text-ink-muted/50" />
                    </div>
                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Notion Database Name</label>
                      <input type="text" value={notionDb} onChange={e => setNotionDb(e.target.value)} placeholder="Team Knowledge Base"
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition" />
                    </div>
                    <div className="mb-8">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Organization Style</label>
                      <select value={category} onChange={e => setCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition">
                        <option value="standard">Decisions, Patterns, Solutions</option>
                        <option value="teams">By team (eng, product, design)</option>
                        <option value="projects">By project</option>
                      </select>
                    </div>

                    <button onClick={handleRun}
                      className="w-full py-4 rounded-xl bg-primary text-on-primary font-display text-headline-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                      ▶ Capture Knowledge
                    </button>
                    <p className="text-center text-body-xs text-ink-muted dark:text-on-surface-variant mt-4">💰 Pay-per-result: $7.99 per successful capture run</p>
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
                  <span className="absolute inset-0 flex items-center justify-center text-3xl">📖</span>
                </div>
                <h3 className="font-display text-headline-md text-ink dark:text-on-surface">Scanning conversations...</h3>
                <p className="text-ink-soft dark:text-on-surface-variant">Extracting decisions and best practices from {channels}</p>
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
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-2">Knowledge Captured ✨</h2>
                <p className="text-headline-sm text-ink-soft dark:text-on-surface-variant">{result.captured.length} insights synced to Notion</p>
              </section>

              <div className="space-y-3">
                {result.captured.map((item, i) => (
                  <div key={i} className="rounded-xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-5">
                    <h3 className="font-display text-headline-sm font-bold text-ink dark:text-on-surface mb-2">{item.title}</h3>
                    <p className="text-body-sm text-ink-muted dark:text-on-surface-variant mb-3">Source: {item.source}</p>
                    <div className="flex gap-2 flex-wrap">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-full bg-primary/10 dark:bg-primary/15 text-body-xs font-medium text-ink-soft dark:text-on-surface-variant">#{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6 text-center">
                <p className="text-body-md text-ink-soft dark:text-on-surface-variant">💰 <span className="font-semibold text-ink dark:text-on-surface">Billable outcome:</span> {result.captured.length} knowledge entries created</p>
                <p className="text-body-sm text-ink-muted dark:text-on-surface-variant mt-2">$7.99 — charged only for a successfully completed capture run.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

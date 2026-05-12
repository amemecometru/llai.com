import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PRReviewBrief() {
  const [step, setStep] = useState<'configure' | 'running' | 'results'>('configure');
  const [repo, setRepo] = useState('');
  const [prNumber, setPrNumber] = useState('');
  const [focus, setFocus] = useState('balanced');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ summary: string; risks: string[]; questions: string[] } | null>(null);

  const handleRun = async () => {
    setStep('running');
    setProgress(0);
    const interval = setInterval(() => setProgress(p => Math.min(p + Math.random() * 15, 100)), 400);
    await new Promise(resolve => setTimeout(resolve, 2500));
    clearInterval(interval);
    setResult({
      summary: 'This PR adds Redis-based caching for user profile endpoints. Changes 4 files, +120 lines, −30 lines. Updates profile.ts (cache layer), redis.ts (new client), user.test.ts (cache invalidation tests), and types.ts (new CacheEntry type). No security concerns detected.',
      risks: ['Cache invalidation triggered only on profile updates — ask if address changes also require invalidation', 'TTL hardcoded at 3600s — consider making configurable'],
      questions: ['How is the cache cleared when user roles change?', 'Are there plans to extend this to other endpoints?'],
    });
    setStep('results');
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-ink">
      <header className="border-b border-border dark:border-surface-container-high bg-cream-elev/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐙</span>
            <div>
              <h1 className="font-display text-xl font-bold text-ink dark:text-on-surface">PR Review Brief</h1>
              <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">One-page review for any PR</p>
            </div>
          </div>
          {step === 'results' && (
            <button onClick={() => setStep('configure')} className="px-4 py-2 rounded-full border border-border dark:border-surface-container-high text-ink-soft dark:text-on-surface hover:bg-cream-veil dark:hover:bg-surface-container-high transition">← Review Another</button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 'configure' && (
            <motion.div key="configure" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
              <section className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
                  <span className="text-primary-deep dark:text-primary-soft font-label-sm font-semibold">⚡ INSTANT PR ANALYSIS</span>
                </div>
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-4">Read PR diffs faster. Spot issues in seconds.</h2>
                <p className="text-body-lg text-ink-soft dark:text-on-surface-variant max-w-2xl mx-auto">
                  Code reviews slow down shipping. We read the diff, surface what changed and why, flag common pitfalls, and give you the key questions to ask. You stay the expert — we just make you faster.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <section className="space-y-6">
                  <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-4">How it works</h3>
                    <ol className="space-y-4">
                      {[
                        { emoji: '🔗', step: '1', title: 'Paste a PR link', desc: 'Or specify a repo to watch all open PRs' },
                        { emoji: '🔍', step: '2', title: 'AI analyzes the diff', desc: 'Reads every file, every change, understands intent' },
                        { emoji: '🚩', step: '3', title: 'Risks flagged', desc: 'Security, performance, and pattern issues identified' },
                        { emoji: '💬', step: '4', title: 'Smart questions generated', desc: '2-3 key questions to ask the author before approving' },
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
                      <li className="flex gap-2"><span className="text-success">✓</span> Reads only the PR diff and test coverage</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> No access to CI/CD secrets or private repos</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> Nothing stored or trained on</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="rounded-2xl border-2 border-primary/30 dark:border-primary/20 bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-6">Configure your review brief</h3>

                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">GitHub Repository</label>
                      <input type="text" value={repo} onChange={e => setRepo(e.target.value)} placeholder="owner/repo"
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition placeholder:text-ink-muted/50" />
                    </div>
                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">PR Number (leave empty for all open PRs)</label>
                      <input type="text" value={prNumber} onChange={e => setPrNumber(e.target.value)} placeholder="42"
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition" />
                    </div>
                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Review Focus</label>
                      <select value={focus} onChange={e => setFocus(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition">
                        <option value="security">Security first</option>
                        <option value="performance">Performance first</option>
                        <option value="quality">Code quality</option>
                        <option value="balanced">Balanced</option>
                      </select>
                    </div>

                    <div className="mb-8">
                      <p className="text-label-sm text-ink-muted dark:text-on-surface-variant mb-3">Connected Services</p>
                      <div className="flex gap-3">
                        {[{ emoji: '🐙', name: 'GitHub' }, { emoji: '🧠', name: 'Claude AI' }].map(s => (
                          <span key={s.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/15 text-sm text-ink-soft dark:text-on-surface-variant">
                            <span>{s.emoji}</span> {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button onClick={handleRun}
                      className="w-full py-4 rounded-xl bg-primary text-on-primary font-display text-headline-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                      ▶ Generate Review Brief
                    </button>
                    <p className="text-center text-body-xs text-ink-muted dark:text-on-surface-variant mt-4">💰 Pay-per-result: $1.99 per successful brief</p>
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
                  <span className="absolute inset-0 flex items-center justify-center text-3xl">🐙</span>
                </div>
                <h3 className="font-display text-headline-md text-ink dark:text-on-surface">Analyzing PR diff...</h3>
                <p className="text-ink-soft dark:text-on-surface-variant">Reading changed files and identifying patterns</p>
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
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-2">Review Brief Ready 🔍</h2>
                <p className="text-headline-sm text-ink-soft dark:text-on-surface-variant">One page. All the context you need.</p>
              </section>

              <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-8">
                <div className="mb-6 p-4 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/20">
                  <h3 className="font-label-sm text-primary-deep dark:text-primary-soft font-semibold mb-2">📋 Summary</h3>
                  <p className="font-body text-ink dark:text-on-surface leading-relaxed">{result.summary}</p>
                </div>
                <div className="mb-6 p-4 rounded-xl bg-warning/10 dark:bg-warning/20 border border-warning/20">
                  <h3 className="font-label-sm text-warning dark:text-warning font-semibold mb-2">🚩 Potential Risks</h3>
                  <ul className="space-y-1 text-body-sm text-ink-soft dark:text-on-surface-variant">
                    {result.risks.map((r, i) => <li key={i}>• {r}</li>)}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-cream-veil dark:bg-surface-container-low">
                  <h3 className="font-label-sm text-ink-muted dark:text-on-surface-variant font-semibold mb-2">💬 Questions to Ask</h3>
                  <ul className="space-y-1 text-body-sm text-ink-soft dark:text-on-surface-variant">
                    {result.questions.map((q, i) => <li key={i}>• {q}</li>)}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6 text-center">
                <p className="text-body-md text-ink-soft dark:text-on-surface-variant">💰 <span className="font-semibold text-ink dark:text-on-surface">Billable outcome:</span> 1 PR review brief generated</p>
                <p className="text-body-sm text-ink-muted dark:text-on-surface-variant mt-2">$1.99 — charged only for a successfully completed brief.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

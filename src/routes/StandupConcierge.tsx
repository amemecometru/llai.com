import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StandupConcierge() {
  const [step, setStep] = useState<'configure' | 'running' | 'results'>('configure');
  const [deliveryTime, setDeliveryTime] = useState('08:00');
  const [slackChannel, setSlackChannel] = useState('#eng-team');
  const [githubRepo, setGithubRepo] = useState('');
  const [includeBlockers, setIncludeBlockers] = useState(true);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ text: string; sources: string } | null>(null);

  const handleRun = async () => {
    setStep('running');
    setProgress(0);
    const interval = setInterval(() => setProgress(prev => prev >= 100 ? 100 : prev + Math.random() * 12), 400);
    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(interval);
    setProgress(100);
    setResult({
      text: "Yesterday: Merged 2 PRs (#147, #152), closed 3 issues (#89, #91, #94). Reviewed Q4 roadmap with @sarah. Shipped auth redesign — tests pass.\nToday: API integration setup at 10am. Pricing page review at 2pm. Heads-down on retention dashboard.\nBlockers: Need design sign-off on empty state. CI pipeline intermittently failing on Node 18.",
      sources: "Slack: 47 messages from #eng-team · GitHub: 8 commits, 3 closed PRs · Calendar: 2 meetings today",
    });
    setStep('results');
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-ink">
      <header className="border-b border-border dark:border-surface-container-high bg-cream-elev/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <h1 className="font-display text-xl font-bold text-ink dark:text-on-surface">Standup Concierge</h1>
              <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">Your standup writes itself</p>
            </div>
          </div>
          {step === 'results' && (
            <button onClick={() => setStep('configure')}
              className="px-4 py-2 rounded-full border border-border dark:border-surface-container-high text-ink-soft dark:text-on-surface hover:bg-cream-veil dark:hover:bg-surface-container-high transition">
              ← Run Again
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 'configure' && (
            <motion.div key="configure" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
              <section className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
                  <span className="text-primary-deep dark:text-primary-soft font-label-sm font-semibold">✨ AI-POWERED STANDUP GENERATION</span>
                </div>
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-4">Standup time? Done before coffee.</h2>
                <p className="text-body-lg text-ink-soft dark:text-on-surface-variant max-w-2xl mx-auto">
                  Standup Concierge pulls your Slack activity, GitHub work, and calendar events into one polished summary. No more "uhhhh, what did I do yesterday?" Set it up once and get your standup delivered every morning.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <section className="space-y-6">
                  <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-4">How it works</h3>
                    <ol className="space-y-4">
                      {[
                        { emoji: '💬', step: '1', title: 'Connect your sources', desc: 'Slack channels, GitHub repos, Google Calendar' },
                        { emoji: '🤖', step: '2', title: 'AI synthesizes', desc: 'Pulls commits, PRs, Slack messages, calendar events' },
                        { emoji: '📝', step: '3', title: 'Summary generated', desc: 'Yesterday, Today, Blockers — formatted for your team' },
                        { emoji: '📨', step: '4', title: 'Delivered on schedule', desc: 'Sent to Slack or email at your preferred time' },
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
                      <li className="flex gap-2"><span className="text-success">✓</span> Reads only your authored commits and PRs</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> Scans only selected Slack channels</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> Nothing stored after report is generated</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="rounded-2xl border-2 border-primary/30 dark:border-primary/20 bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-6">Configure your standup</h3>
                    
                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Slack Channel</label>
                      <input type="text" value={slackChannel} onChange={e => setSlackChannel(e.target.value)} placeholder="#general"
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition" />
                    </div>
                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">GitHub Repo</label>
                      <input type="text" value={githubRepo} onChange={e => setGithubRepo(e.target.value)} placeholder="owner/repo"
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition placeholder:text-ink-muted/50" />
                    </div>
                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Delivery Time</label>
                      <select value={deliveryTime} onChange={e => setDeliveryTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition">
                        <option value="07:00">7:00 AM</option><option value="08:00">8:00 AM</option><option value="09:00">9:00 AM</option><option value="10:00">10:00 AM</option>
                      </select>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-cream-veil dark:bg-surface-container-low">
                        <div>
                          <p className="font-body text-sm font-medium text-ink dark:text-on-surface">Include blockers</p>
                          <p className="text-body-xs text-ink-muted dark:text-on-surface-variant">AI identifies potential blockers from conversations</p>
                        </div>
                        <button onClick={() => setIncludeBlockers(!includeBlockers)}
                          className={`relative w-12 h-7 rounded-full transition-colors ${includeBlockers ? 'bg-primary' : 'bg-border dark:bg-surface-container-high'}`}>
                          <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${includeBlockers ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <button onClick={handleRun}
                      className="w-full py-4 rounded-xl bg-primary text-on-primary font-display text-headline-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                      ▶ Generate Standup
                    </button>
                    <p className="text-center text-body-xs text-ink-muted dark:text-on-surface-variant mt-4">💰 Pay-per-result: $2.99 per successful summary</p>
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
                  <span className="absolute inset-0 flex items-center justify-center text-3xl">💬</span>
                </div>
                <h3 className="font-display text-headline-md text-ink dark:text-on-surface">Generating your standup...</h3>
                <p className="text-ink-soft dark:text-on-surface-variant">Pulling Slack messages, GitHub commits, and calendar events</p>
                <div className="w-full bg-surface-container-low rounded-full h-3 overflow-hidden dark:bg-surface-container">
                  <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
                <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">{Math.round(Math.min(progress, 100))}% complete</p>
              </div>
            </motion.div>
          )}

          {step === 'results' && result && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <section className="text-center">
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-2">Standup Ready ☕</h2>
                <p className="text-headline-sm text-ink-soft dark:text-on-surface-variant mb-6">Your daily digest, clean and ready to share</p>
              </section>

              <div className="max-w-3xl mx-auto">
                <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-8">
                  <div className="mb-6 p-4 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/20">
                    <h3 className="font-display text-headline-sm text-primary-deep dark:text-primary-soft mb-4">📋 Today's Standup</h3>
                    <div className="space-y-4 font-body text-ink dark:text-on-surface whitespace-pre-line leading-relaxed">
                      {result.text}
                    </div>
                  </div>
                  <div className="text-body-sm text-ink-muted dark:text-on-surface-variant">{result.sources}</div>
                </div>
              </div>

              <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6 text-center">
                <p className="text-body-md text-ink-soft dark:text-on-surface-variant">💰 <span className="font-semibold text-ink dark:text-on-surface">Billable outcome:</span> 1 standup summary generated</p>
                <p className="text-body-sm text-ink-muted dark:text-on-surface-variant mt-2">$2.99 — charged only for a successfully completed summary.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

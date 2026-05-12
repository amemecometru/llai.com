import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RevenuePulse() {
  const [step, setStep] = useState<'configure' | 'running' | 'results'>('configure');
  const [day, setDay] = useState('friday');
  const [channel, setChannel] = useState('slack');
  const [alert, setAlert] = useState('both');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ mrr: string; arr: string; growth: string; churn: string; newCustomers: number; expansion: string } | null>(null);

  const handleRun = async () => {
    setStep('running');
    setProgress(0);
    const interval = setInterval(() => setProgress(p => Math.min(p + Math.random() * 14, 100)), 400);
    await new Promise(resolve => setTimeout(resolve, 2500));
    clearInterval(interval);
    setResult({ mrr: '$12,450', arr: '$149,400', growth: '+6.1% vs last week', churn: '0.8%', newCustomers: 12, expansion: '+$800' });
    setStep('results');
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-ink">
      <header className="border-b border-border dark:border-surface-container-high bg-cream-elev/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💳</span>
            <div>
              <h1 className="font-display text-xl font-bold text-ink dark:text-on-surface">Revenue Pulse</h1>
              <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">Real-time business health, no spreadsheets</p>
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
                  <span className="text-primary-deep dark:text-primary-soft font-label-sm font-semibold">📊 REVENUE INTELLIGENCE</span>
                </div>
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-4">Know your business health. Instantly.</h2>
                <p className="text-body-lg text-ink-soft dark:text-on-surface-variant max-w-2xl mx-auto">
                  Wondering if you're growing? Checking spreadsheets is for accountants. We connect to your Stripe account, pull the real numbers, and deliver them in one clean digest: MRR, churn, LTV, expansion, trending. No manual work. Always accurate.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <section className="space-y-6">
                  <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-4">How it works</h3>
                    <ol className="space-y-4">
                      {[
                        { emoji: '💳', step: '1', title: 'Connect your Stripe', desc: 'Read-only access to billing metrics' },
                        { emoji: '📊', step: '2', title: 'AI analyzes trends', desc: 'MRR, churn, LTV, growth patterns, anomalies' },
                        { emoji: '📝', step: '3', title: 'Digest composed', desc: 'Weekly revenue report with insights and alerts' },
                        { emoji: '📨', step: '4', title: 'Delivered on schedule', desc: 'Slack, email, or both — on the day you choose' },
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
                      <li className="flex gap-2"><span className="text-success">✓</span> Stripe billing metrics only</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> Never accesses customer data or payment methods</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> All data stays in your delivery channel</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="rounded-2xl border-2 border-primary/30 dark:border-primary/20 bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-6">Configure your revenue pulse</h3>

                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Delivery Day</label>
                      <select value={day} onChange={e => setDay(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition">
                        <option value="friday">Friday</option><option value="monday">Monday</option><option value="sunday">Sunday</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Where to Send?</label>
                      <select value={channel} onChange={e => setChannel(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition">
                        <option value="slack">Slack #revenue</option><option value="email">Your email</option><option value="both">Both Slack + email</option>
                      </select>
                    </div>
                    <div className="mb-8">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Alert Me On?</label>
                      <select value={alert} onChange={e => setAlert(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition">
                        <option value="churn">Churn spike (&gt;10%)</option>
                        <option value="growth">Unusually high MRR growth</option>
                        <option value="both">Both</option>
                        <option value="none">Digest only</option>
                      </select>
                    </div>

                    <button onClick={handleRun}
                      className="w-full py-4 rounded-xl bg-primary text-on-primary font-display text-headline-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                      ▶ Pull Revenue Pulse
                    </button>
                    <p className="text-center text-body-xs text-ink-muted dark:text-on-surface-variant mt-4">💰 Pay-per-result: $3.99 per successful digest</p>
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
                  <span className="absolute inset-0 flex items-center justify-center text-3xl">💳</span>
                </div>
                <h3 className="font-display text-headline-md text-ink dark:text-on-surface">Analyzing your Stripe data...</h3>
                <p className="text-ink-soft dark:text-on-surface-variant">Calculating MRR, churn, LTV, and growth trends</p>
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
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-2">Revenue Pulse 📊</h2>
                <p className="text-headline-sm text-ink-soft dark:text-on-surface-variant mb-6">{day} digest, ready to share</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {[
                    { label: 'MRR', value: result.mrr, color: 'text-success' },
                    { label: 'ARR', value: result.arr, color: 'text-success' },
                    { label: 'Growth', value: result.growth, color: 'text-success' },
                    { label: 'Churn', value: result.churn, color: result.churn.includes('0.8%') ? 'text-success' : 'text-error' },
                    { label: 'New Customers', value: String(result.newCustomers), color: 'text-ink dark:text-on-surface' },
                    { label: 'Expansion', value: result.expansion, color: 'text-success' },
                  ].map(stat => (
                    <div key={stat.label} className="rounded-2xl bg-cream-elev dark:bg-surface-container border border-border dark:border-surface-container-high p-6 text-center">
                      <p className="text-label-sm text-ink-muted dark:text-on-surface-variant mb-1">{stat.label}</p>
                      <p className={`font-display text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6 text-center max-w-3xl mx-auto">
                <p className="text-body-md text-ink-soft dark:text-on-surface-variant">💰 <span className="font-semibold text-ink dark:text-on-surface">Billable outcome:</span> 1 revenue digest generated</p>
                <p className="text-body-sm text-ink-muted dark:text-on-surface-variant mt-2">$3.99 — charged only for a successfully completed digest.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

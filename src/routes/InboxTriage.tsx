import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TriageResult {
  id: string;
  subject: string;
  from: string;
  date: string;
  category: 'actionable' | 'newsletter' | 'archive';
  action: 'reply' | 'task' | 'snooze' | 'none';
}

export default function InboxTriage() {
  const [step, setStep] = useState<'configure' | 'running' | 'results'>('configure');
  const [timeWindow, setTimeWindow] = useState('24h');
  const [maxEmails, setMaxEmails] = useState(100);
  const [autoDraft, setAutoDraft] = useState(true);
  const [autoTask, setAutoTask] = useState(true);
  const [results, setResults] = useState<TriageResult[]>([]);
  const [progress, setProgress] = useState(0);

  const handleRun = async () => {
    setStep('running');
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 400);

    // Simulate triage work
    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(interval);
    setProgress(100);

    // Demo results
    setResults([
      { id: '1', subject: 'Q4 Budget Review - Action Required', from: 'finance@yourcompany.com', date: '14 min ago', category: 'actionable', action: 'reply' },
      { id: '2', subject: 'Client Meeting Follow-Up Items', from: 'sarah@clientco.com', date: '28 min ago', category: 'actionable', action: 'task' },
      { id: '3', subject: 'Your Weekly Newsletter - TechTrends', from: 'newsletter@techtrends.io', date: '1 hr ago', category: 'newsletter', action: 'none' },
      { id: '4', subject: 'Invoice #INV-2047 from AWS', from: 'billing@aws.amazon.com', date: '2 hrs ago', category: 'actionable', action: 'task' },
      { id: '5', subject: 'Promotional: 50% Off Spring Collection', from: 'deals@retailer.com', date: '3 hrs ago', category: 'archive', action: 'none' },
    ]);

    setStep('results');
  };

  const actionable = results.filter(r => r.category === 'actionable').length;
  const newsletters = results.filter(r => r.category === 'newsletter').length;
  const archived = results.filter(r => r.category === 'archive').length;

  return (
    <div className="min-h-screen bg-cream dark:bg-ink">
      {/* Header */}
      <header className="border-b border-border dark:border-surface-container-high bg-cream-elev/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍋</span>
            <div>
              <h1 className="font-display text-xl font-bold text-ink dark:text-on-surface">Inbox Triage</h1>
              <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">AI-powered email prioritization</p>
            </div>
          </div>
          {step === 'results' && (
            <button
              onClick={() => setStep('configure')}
              className="px-4 py-2 rounded-full border border-border dark:border-surface-container-high text-ink-soft dark:text-on-surface hover:bg-cream-veil dark:hover:bg-surface-container-high transition"
            >
              ← Run Again
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: Configuration */}
          {step === 'configure' && (
            <motion.div
              key="configure"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Hero Section */}
              <section className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
                  <span className="text-primary-deep dark:text-primary-soft font-label-sm font-semibold">✨ AI-POWERED EMAIL SORTING</span>
                </div>
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-4">
                  Your inbox, organized in seconds.
                </h2>
                <p className="text-body-lg text-ink-soft dark:text-on-surface-variant max-w-2xl mx-auto">
                  LogicLemon scans your Gmail, classifies every message by importance, drafts replies in your voice, and surfaces only what matters. You review. You send. Zero inbox overwhelm.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column: Instructions */}
                <section className="space-y-6">
                  <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-4">
                      How it works
                    </h3>
                    <ol className="space-y-4">
                      {[
                        { emoji: '📧', step: '1', title: 'Select your time window', desc: 'Choose how far back to scan — from 4 hours to 30 days' },
                        { emoji: '🤖', step: '2', title: 'AI reads & classifies', desc: 'Each email is sorted: actionable, newsletter, or archive' },
                        { emoji: '✍️', step: '3', title: 'Replies drafted for you', desc: 'For actionable emails, we draft a reply in your tone' },
                        { emoji: '✅', step: '4', title: 'Review & send', desc: 'One-click send on replies you approve. Tasks auto-created.' },
                      ].map((item) => (
                        <li key={item.step} className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-xl bg-primary/15 dark:bg-primary/20 flex items-center justify-center text-xl shrink-0">
                            {item.emoji}
                          </div>
                          <div>
                            <span className="font-display text-body-sm font-semibold text-primary-deep dark:text-primary-soft">Step {item.step}</span>
                            <p className="font-display text-headline-sm text-ink dark:text-on-surface">{item.title}</p>
                            <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Data Transparency */}
                  <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-3">
                      🔒 Data Transparency
                    </h3>
                    <ul className="space-y-2 text-body-sm text-ink-soft dark:text-on-surface-variant">
                      <li className="flex gap-2"><span className="text-success">✓</span> We only read Gmail messages you select</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> No passwords, contacts, or calendar access</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> Zero data used for model training</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> Drafts created only — you approve before sending</li>
                    </ul>
                  </div>
                </section>

                {/* Right Column: Configuration Form */}
                <section className="space-y-6">
                  <div className="rounded-2xl border-2 border-primary/30 dark:border-primary/20 bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-6">
                      Configure your triage run
                    </h3>

                    {/* Time Window */}
                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">
                        Time Window
                      </label>
                      <select
                        value={timeWindow}
                        onChange={e => setTimeWindow(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition"
                      >
                        <option value="4h">Last 4 hours — Quick check</option>
                        <option value="24h">Last 24 hours — Daily clean</option>
                        <option value="7d">Last 7 days — Weekly reset</option>
                        <option value="30d">Last 30 days — Deep clean</option>
                      </select>
                    </div>

                    {/* Max Emails */}
                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">
                        Max Emails to Scan: {maxEmails}
                      </label>
                      <input
                        type="range"
                        min="25"
                        max="500"
                        step="25"
                        value={maxEmails}
                        onChange={e => setMaxEmails(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <div className="flex justify-between text-body-xs text-ink-muted dark:text-on-surface-variant mt-1">
                        <span>25</span>
                        <span>500</span>
                      </div>
                    </div>

                    {/* Toggles */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-cream-veil dark:bg-surface-container-low">
                        <div>
                          <p className="font-body text-sm font-medium text-ink dark:text-on-surface">Auto-draft replies</p>
                          <p className="text-body-xs text-ink-muted dark:text-on-surface-variant">AI drafts responses for actionable emails</p>
                        </div>
                        <button
                          onClick={() => setAutoDraft(!autoDraft)}
                          className={`relative w-12 h-7 rounded-full transition-colors ${autoDraft ? 'bg-primary' : 'bg-border dark:bg-surface-container-high'}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${autoDraft ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-cream-veil dark:bg-surface-container-low">
                        <div>
                          <p className="font-body text-sm font-medium text-ink dark:text-on-surface">Create tasks</p>
                          <p className="text-body-xs text-ink-muted dark:text-on-surface-variant">Actionable items → Google Tasks</p>
                        </div>
                        <button
                          onClick={() => setAutoTask(!autoTask)}
                          className={`relative w-12 h-7 rounded-full transition-colors ${autoTask ? 'bg-primary' : 'bg-border dark:bg-surface-container-high'}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${autoTask ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Integrations */}
                    <div className="mb-8">
                      <p className="text-label-sm text-ink-muted dark:text-on-surface-variant mb-3">Connected Services</p>
                      <div className="flex gap-3">
                        {[
                          { emoji: '📧', name: 'Gmail' },
                          { emoji: '✅', name: 'Google Tasks' },
                          { emoji: '🤖', name: 'Gemini AI' },
                        ].map(s => (
                          <span key={s.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/15 text-sm text-ink-soft dark:text-on-surface-variant">
                            <span>{s.emoji}</span> {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Run Button */}
                    <button
                      onClick={handleRun}
                      className="w-full py-4 rounded-xl bg-primary text-on-primary font-display text-headline-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                    >
                      ▶ Run Inbox Triage
                    </button>

                    <p className="text-center text-body-xs text-ink-muted dark:text-on-surface-variant mt-4">
                      💰 Pay-per-result: Only charged for actionable emails surfaced
                    </p>
                  </div>
                </section>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Running */}
          {step === 'running' && (
            <motion.div
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <div className="w-full max-w-md space-y-6 text-center">
                {/* Animated scanning indicator */}
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-border dark:border-surface-container-high animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <span className="absolute inset-0 flex items-center justify-center text-3xl">📧</span>
                </div>

                <h3 className="font-display text-headline-md text-ink dark:text-on-surface">
                  Scanning your inbox...
                </h3>
                <p className="text-ink-soft dark:text-on-surface-variant">
                  Reading {maxEmails} emails from the last {timeWindow === '4h' ? '4 hours' : timeWindow === '24h' ? '24 hours' : timeWindow === '7d' ? '7 days' : '30 days'}
                </p>

                <div className="w-full bg-surface-container-low rounded-full h-3 overflow-hidden dark:bg-surface-container">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">
                  {Math.round(Math.min(progress, 100))}% complete
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Results */}
          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Summary Stats */}
              <section className="text-center">
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-2">
                  Triage Complete ✨
                </h2>
                <p className="text-headline-sm text-ink-soft dark:text-on-surface-variant mb-6">
                  {results.length} emails scanned and organized
                </p>

                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {[
                    { label: 'Actionable', count: actionable, color: 'bg-success/10 dark:bg-success/20', textColor: 'text-success dark:text-success', emoji: '🎯' },
                    { label: 'Newsletters', count: newsletters, color: 'bg-warning/10 dark:bg-warning/20', textColor: 'text-warning dark:text-warning', emoji: '📰' },
                    { label: 'Archived', count: archived, color: 'bg-surface-container dark:bg-surface-container-high', textColor: 'text-ink-muted dark:text-on-surface-variant', emoji: '📦' },
                  ].map(stat => (
                    <div key={stat.label} className={`rounded-2xl ${stat.color} p-6`}>
                      <span className="text-4xl mb-2 block">{stat.emoji}</span>
                      <p className={`font-display text-3xl font-bold ${stat.textColor}`}>{stat.count}</p>
                      <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Email List */}
              <section className="space-y-3">
                <h3 className="font-display text-headline-md text-ink dark:text-on-surface">Results</h3>
                <div className="space-y-3">
                  {results.map(email => (
                    <div
                      key={email.id}
                      className={`rounded-xl border p-4 transition hover:shadow-md ${
                        email.category === 'actionable'
                          ? 'border-primary/30 bg-cream-elev dark:bg-surface-container'
                          : 'border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${
                          email.category === 'actionable' ? 'bg-primary' :
                          email.category === 'newsletter' ? 'bg-warning' : 'bg-border dark:bg-surface-container-high'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-medium text-ink dark:text-on-surface truncate">
                            {email.subject}
                          </p>
                          <p className="text-body-xs text-ink-muted dark:text-on-surface-variant">
                            {email.from} · {email.date}
                          </p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          {email.category === 'actionable' && email.action === 'reply' && (
                            <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-body-sm font-medium hover:brightness-110 transition">
                              ✍️ Draft Ready
                            </button>
                          )}
                          {email.category === 'actionable' && email.action === 'task' && (
                            <button className="px-3 py-1.5 rounded-lg bg-success text-on-success text-body-sm font-medium">
                              ✅ Task Created
                            </button>
                          )}
                          {email.category === 'newsletter' && (
                            <span className="px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-body-sm font-medium">
                              📰 Newsletter
                            </span>
                          )}
                          {email.category === 'archive' && (
                            <span className="px-3 py-1.5 rounded-lg bg-surface-container dark:bg-surface-container-high text-ink-muted dark:text-on-surface-variant text-body-sm">
                              🗑️ Archived
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Billing */}
              <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6 text-center">
                <p className="text-body-md text-ink-soft dark:text-on-surface-variant">
                  💰 <span className="font-semibold text-ink dark:text-on-surface">Billable outcomes:</span> {actionable} actionable emails surfaced
                </p>
                <p className="text-body-sm text-ink-muted dark:text-on-surface-variant mt-2">
                  Newsletters and archived emails are free — you only pay when we surface something that needs your attention.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

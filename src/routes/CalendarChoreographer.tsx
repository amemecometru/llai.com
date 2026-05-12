import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CalendarChoreographer() {
  const [step, setStep] = useState<'configure' | 'running' | 'results'>('configure');
  const [calendar, setCalendar] = useState('primary');
  const [briefTime, setBriefTime] = useState('15');
  const [includeAttendees, setIncludeAttendees] = useState(true);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ meetings: { title: string; time: string; brief: string }[] } | null>(null);

  const handleRun = async () => {
    setStep('running');
    setProgress(0);
    const interval = setInterval(() => setProgress(p => Math.min(p + Math.random() * 12, 100)), 400);
    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(interval);
    setResult({
      meetings: [
        { title: 'Client Call — Acme Corp', time: '2:00 PM', brief: 'Last spoke 3 weeks ago. SOW from Jan signed, last invoice paid. Pending integration update. Suggested topics: timeline check, next phase scope, open questions from engineering.' },
        { title: 'Team Sync — Product', time: '4:00 PM', brief: 'Weekly product alignment. 8 attendees. Recent doc: Q4 Roadmap v2 (updated yesterday). Key decisions needed: feature priorities, sprint velocity target.' },
      ],
    });
    setStep('results');
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-ink">
      <header className="border-b border-border dark:border-surface-container-high bg-cream-elev/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <h1 className="font-display text-xl font-bold text-ink dark:text-on-surface">Calendar Choreographer</h1>
              <p className="text-body-sm text-ink-muted dark:text-on-surface-variant">Never walk into a meeting unprepared</p>
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
                  <span className="text-primary-deep dark:text-primary-soft font-label-sm font-semibold">📋 SMART MEETING PREP</span>
                </div>
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-4">Walk in prepared. Every time.</h2>
                <p className="text-body-lg text-ink-soft dark:text-on-surface-variant max-w-2xl mx-auto">
                  15 minutes before each meeting, Calendar Choreographer pulls attendee context, recent shared docs, suggested talking points, and a quick agenda. You're the expert in the room — we just make sure you walk in that way.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <section className="space-y-6">
                  <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-4">How it works</h3>
                    <ol className="space-y-4">
                      {[
                        { emoji: '📅', step: '1', title: 'Reads your calendar', desc: 'Checks upcoming meetings and attendee lists' },
                        { emoji: '🔍', step: '2', title: 'Pulls context', desc: 'Recent emails, shared docs, past decisions with attendees' },
                        { emoji: '📝', step: '3', title: 'Creates a brief', desc: 'Attendee info, agenda suggestions, talking points' },
                        { emoji: '📨', step: '4', title: 'Delivers on time', desc: 'Sent to email or Slack at your chosen interval' },
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
                      <li className="flex gap-2"><span className="text-success">✓</span> Reads only calendar events and emails to attendees</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> No access to confidential folders</li>
                      <li className="flex gap-2"><span className="text-success">✓</span> All context stays in your account</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="rounded-2xl border-2 border-primary/30 dark:border-primary/20 bg-cream-elev dark:bg-surface-container p-6">
                    <h3 className="font-display text-headline-sm text-ink dark:text-on-surface mb-6">Configure your briefs</h3>

                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Which Calendar?</label>
                      <select value={calendar} onChange={e => setCalendar(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition">
                        <option value="primary">Primary</option><option value="work">Work</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">Brief Timing</label>
                      <select value={briefTime} onChange={e => setBriefTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition">
                        <option value="10">10 minutes before</option><option value="15">15 minutes before</option><option value="30">30 minutes before</option>
                      </select>
                    </div>
                    <div className="mb-8">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-cream-veil dark:bg-surface-container-low">
                        <div>
                          <p className="font-body text-sm font-medium text-ink dark:text-on-surface">Include attendee context</p>
                          <p className="text-body-xs text-ink-muted dark:text-on-surface-variant">LinkedIn/company info when available</p>
                        </div>
                        <button onClick={() => setIncludeAttendees(!includeAttendees)}
                          className={`relative w-12 h-7 rounded-full transition-colors ${includeAttendees ? 'bg-primary' : 'bg-border dark:bg-surface-container-high'}`}>
                          <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${includeAttendees ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <button onClick={handleRun}
                      className="w-full py-4 rounded-xl bg-primary text-on-primary font-display text-headline-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                      ▶ Run Calendar Choreographer
                    </button>
                    <p className="text-center text-body-xs text-ink-muted dark:text-on-surface-variant mt-4">💰 Pay-per-result: $5.99 per successful brief</p>
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
                  <span className="absolute inset-0 flex items-center justify-center text-3xl">📅</span>
                </div>
                <h3 className="font-display text-headline-md text-ink dark:text-on-surface">Preparing meeting briefs...</h3>
                <p className="text-ink-soft dark:text-on-surface-variant">Pulling attendee context, shared docs, and talking points</p>
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
                <h2 className="font-display text-display-lg text-ink dark:text-on-surface mb-2">Meeting Briefs Ready 📋</h2>
                <p className="text-headline-sm text-ink-soft dark:text-on-surface-variant">{result.meetings.length} meetings prepped</p>
              </section>

              <div className="space-y-4">
                {result.meetings.map((m, i) => (
                  <div key={i} className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-primary-deep dark:text-primary-soft font-label-sm font-bold">{m.time}</span>
                      <h3 className="font-display text-headline-sm font-bold text-ink dark:text-on-surface">{m.title}</h3>
                    </div>
                    <p className="font-body text-ink dark:text-on-surface leading-relaxed mb-4">{m.brief}</p>
                    <button className="px-4 py-2 rounded-lg bg-primary text-on-primary text-body-sm font-medium hover:brightness-110 transition">📋 Copy to Clipboard</button>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border dark:border-surface-container-high bg-cream-elev dark:bg-surface-container p-6 text-center">
                <p className="text-body-md text-ink-soft dark:text-on-surface-variant">💰 <span className="font-semibold text-ink dark:text-on-surface">Billable outcome:</span> {result.meetings.length} meeting briefs generated</p>
                <p className="text-body-sm text-ink-muted dark:text-on-surface-variant mt-2">$5.99 per brief — charged only for successfully completed briefs.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

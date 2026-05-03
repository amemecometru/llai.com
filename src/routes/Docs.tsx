import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Section = { id: string; label: string };

const sections: Section[] = [
  { id: 'getting-started', label: 'Getting started' },
  { id: 'connect-workspace', label: 'Connect your Workspace' },
  { id: 'workflow-reference', label: 'Workflow reference' },
  { id: 'custom-workflows', label: 'Custom workflows' },
  { id: 'security-data', label: 'Security & data' },
  { id: 'limits-pricing', label: 'Limits & pricing' },
  { id: 'changelog', label: 'Changelog' },
];

export default function Docs() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="mx-auto max-w-8xl px-6 py-16 md:px-10 md:py-24">
      {/* Page header */}
      <header className="mb-16 max-w-3xl">
        <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.12em] text-lemon-deep">
          Documentation · v1
        </p>
        <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tightest md:text-7xl">
          Build workflows that <em>actually save time</em>.
        </h1>
        <p className="mt-6 max-w-xl font-body text-lg text-ink-soft dark:text-dark-ink-soft">
          Everything you need to connect Google Workspace, deploy workflows, and write your own — without writing a
          single line of code.
        </p>
      </header>

      <div className="grid gap-16 md:grid-cols-12">
        {/* TOC sidebar */}
        <aside className="md:col-span-3">
          <nav className="sticky top-24">
            <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.12em] text-slate dark:text-dark-ink-soft/60">
              On this page
            </p>
            <ul className="space-y-2 border-l border-border dark:border-dark-border">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`-ml-px block border-l-2 py-1 pl-4 font-body text-sm transition ${
                      active === s.id
                        ? 'border-lemon text-ink dark:text-dark-ink'
                        : 'border-transparent text-ink-soft hover:text-ink dark:text-dark-ink-soft dark:hover:text-dark-ink'
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 rule-bottom pb-6">
              <Link
                to="/contact"
                className="font-body text-sm text-ink-soft underline decoration-border underline-offset-4 hover:text-ink hover:decoration-lemon dark:text-dark-ink-soft dark:hover:text-dark-ink"
              >
                Have a question? →
              </Link>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <article className="prose-style md:col-span-9">
          <Section id="getting-started" title="Getting started">
            <p>
              LogicLemon is a workflow runtime for Google Workspace. You install the app, connect your Workspace via
              OAuth, choose from a library of pre-built workflows (or describe your own in plain English), and let it
              run on your schedule.
            </p>
            <p>
              From sign-up to your first running workflow takes about five minutes. You don't need to know how to code,
              and you don't need to deploy anything yourself.
            </p>
            <Steps
              steps={[
                ['Create your account', 'Sign up with the Google account you want LogicLemon to act on. The Free plan covers your first 10 runs per month.'],
                ['Authorize Workspace scopes', 'Grant the specific scopes each workflow needs. You can review and revoke at any time.'],
                ['Pick a workflow', 'Browse the library, choose your first workflow, and configure schedule + recipients.'],
                ['Run it', 'Trigger manually to verify, or wait for the next cron tick. Every run is logged in your dashboard.'],
              ]}
            />
          </Section>

          <Section id="connect-workspace" title="Connect your Workspace">
            <p>
              LogicLemon uses Composio (SOC 2 Type II) to handle the OAuth handshake with Google. Tokens are stored and
              rotated by Composio — never on our infrastructure.
            </p>
            <h3>Required scopes by workflow</h3>
            <Table
              head={['Workflow', 'Scopes requested']}
              rows={[
                ['Daily Standup Report', 'calendar.readonly · tasks.readonly · gmail.send'],
                ['Meeting Prep Brief', 'calendar.readonly · drive.metadata.readonly'],
                ['Smart Email Triage', 'gmail.modify · tasks'],
                ['Weekly Workspace Digest', 'calendar.readonly · gmail.readonly · drive.metadata.readonly'],
                ['File Announce', 'drive.metadata.readonly · chat.spaces'],
              ]}
            />
            <p>
              You authorize per workflow, not all at once. Disabling a workflow revokes its scopes immediately.
            </p>
          </Section>

          <Section id="workflow-reference" title="Workflow reference">
            <p>The five hero workflows that ship with v1.</p>
            <Workflow
              name="Daily Standup Report"
              schedule="Cron · 8:00 AM (your timezone)"
              outputs="Slack message · Chat post · email"
              description="Walks today's calendar + yesterday's task closures + recent commits, drafts a standup in your voice using a small reference set of past updates."
            />
            <Workflow
              name="Meeting Prep Brief"
              schedule="15 min before each meeting"
              outputs="Email · Slack DM · Calendar event note"
              description="For each event with two or more attendees: pulls attendee context, links to recently shared docs, and an AI-generated agenda you can accept or edit."
            />
            <Workflow
              name="Smart Email Triage"
              schedule="On every inbox change"
              outputs="Gmail labels · drafted replies · Tasks entries"
              description="Categorizes inbound mail into priority buckets, drafts replies for confirmation, and converts action items into Google Tasks with due dates."
            />
            <Workflow
              name="Weekly Workspace Digest"
              schedule="Cron · Friday 4:00 PM"
              outputs="Email · shareable doc"
              description="The week summarized: meetings attended, decisions made, key documents touched, top inbox themes."
            />
            <Workflow
              name="File Announce"
              schedule="On Drive file events"
              outputs="Chat space message"
              description="When a file is shared with a team, posts an AI-generated summary into the most relevant Chat space with a link to the file."
            />
          </Section>

          <Section id="custom-workflows" title="Custom workflows">
            <p>
              On Pro plans and above, the Custom Workflow Builder lets you describe what you want in plain English. The
              compiler turns your description into a workflow definition you can review before deployment.
            </p>
            <Code
              code={`# Generated from:
# "Every Friday at 4 PM, send my manager a summary of all decisions
#  made in our Tuesday product reviews this week, with doc links."

trigger: cron("0 16 * * FRI", timezone: "America/New_York")
steps:
  - calendar.search:
      query: "Product Review"
      since: start_of_week
  - drive.find_attached_docs
  - ai.extract_decisions:
      from: meeting_notes + linked_docs
  - gmail.send:
      to: manager_email
      subject: "This week's product decisions"
      body: ai_summary_with_doc_links`}
            />
            <p>
              Generated workflows are versioned. You can edit the generated definition directly, fork it, or roll back
              to any prior version.
            </p>
          </Section>

          <Section id="security-data" title="Security & data">
            <p>
              Your Workspace data is processed only when a workflow runs, and only with the scopes you authorized. We
              do not train AI models on your content. Read the full posture on our{' '}
              <Link to="/security" className="underline decoration-lemon underline-offset-4">
                Security page
              </Link>.
            </p>
          </Section>

          <Section id="limits-pricing" title="Limits & pricing">
            <p>
              Plans are metered by workflow runs. A "run" is one full execution of one workflow — regardless of how
              many sub-steps or API calls it makes. See{' '}
              <Link to="/#pricing" className="underline decoration-lemon underline-offset-4">
                pricing
              </Link>{' '}
              for current limits per tier.
            </p>
          </Section>

          <Section id="changelog" title="Changelog">
            <ul className="not-prose space-y-6">
              <ChangelogEntry version="0.1.0" date="May 2026">
                Initial public beta. Five hero workflows live. Free + Personal + Pro tiers open. Custom workflow
                builder in private alpha for Pro customers.
              </ChangelogEntry>
            </ul>
          </Section>
        </article>
      </div>
    </main>
  );
}

/* ---------- helpers (defined inline for single-file portability) ---------- */

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-border py-12 first:pt-0 last:border-b-0 dark:border-dark-border">
      <h2 className="mb-6 font-display text-3xl font-bold tracking-tighter md:text-4xl">{title}</h2>
      <div className="space-y-5 font-body text-lg leading-relaxed text-ink-soft dark:text-dark-ink-soft [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink dark:[&_h3]:text-dark-ink [&_a]:underline [&_a]:decoration-lemon [&_a]:underline-offset-4">
        {children}
      </div>
    </section>
  );
}

function Steps({ steps }: { steps: [string, string][] }) {
  return (
    <ol className="not-prose mt-6 space-y-6 border-l border-border pl-6 dark:border-dark-border">
      {steps.map(([title, desc], i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[33px] grid h-6 w-6 place-items-center rounded-full bg-cream-deep font-mono text-[11px] font-bold dark:bg-dark-bg-3">
            {i + 1}
          </span>
          <h4 className="font-display text-lg font-semibold text-ink dark:text-dark-ink">{title}</h4>
          <p className="mt-1 font-body text-base text-ink-soft dark:text-dark-ink-soft">{desc}</p>
        </li>
      ))}
    </ol>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="not-prose my-8 overflow-x-auto border border-border dark:border-dark-border">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-cream-deep dark:border-dark-border dark:bg-dark-bg-2">
            {head.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-[0.1em] text-ink dark:text-dark-ink"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border last:border-0 dark:border-dark-border">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 align-top font-body text-sm ${
                    j === 0 ? 'font-medium text-ink dark:text-dark-ink' : 'font-mono text-xs text-ink-soft dark:text-dark-ink-soft'
                  }`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Workflow({
  name,
  schedule,
  outputs,
  description,
}: {
  name: string;
  schedule: string;
  outputs: string;
  description: string;
}) {
  return (
    <div className="not-prose my-8 border-t border-border py-6 dark:border-dark-border">
      <h3 className="font-display text-xl font-semibold text-ink dark:text-dark-ink">{name}</h3>
      <dl className="mt-3 grid gap-2 text-sm md:grid-cols-2">
        <div className="flex gap-3">
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate dark:text-dark-ink-soft/60">Trigger</dt>
          <dd className="font-body text-ink-soft dark:text-dark-ink-soft">{schedule}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate dark:text-dark-ink-soft/60">Outputs</dt>
          <dd className="font-body text-ink-soft dark:text-dark-ink-soft">{outputs}</dd>
        </div>
      </dl>
      <p className="mt-3 font-body text-base text-ink-soft dark:text-dark-ink-soft">{description}</p>
    </div>
  );
}

function Code({ code }: { code: string }) {
  return (
    <pre className="not-prose my-6 overflow-x-auto rounded-sm border border-border bg-ink p-6 font-mono text-[13px] leading-relaxed text-cream/85 dark:border-dark-border dark:bg-dark-bg-3">
      <code>{code}</code>
    </pre>
  );
}

function ChangelogEntry({ version, date, children }: { version: string; date: string; children: React.ReactNode }) {
  return (
    <li className="grid gap-3 md:grid-cols-12">
      <div className="md:col-span-3">
        <div className="font-display text-lg font-semibold text-ink dark:text-dark-ink">v{version}</div>
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate dark:text-dark-ink-soft/60">{date}</div>
      </div>
      <p className="font-body text-base text-ink-soft dark:text-dark-ink-soft md:col-span-9">{children}</p>
    </li>
  );
}

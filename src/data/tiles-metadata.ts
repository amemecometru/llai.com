// Single source of truth for all tile workflows.
// Outcome-focused: tells users what problem you solve, what they get, real examples, transparency.

export interface TileIntegration {
  name: string;
  emoji: string;
  scope?: string;
}

export interface FormInput {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  helpText?: string;
  options?: { label: string; value: string }[];
}

export interface TileMetadata {
  slug: string;
  name: string;
  tagline: string;              // the outcome in one line
  description: string;           // plain English: what it does
  whatYouGet: string;            // concrete deliverables
  example: string;               // real-world scenario
  integrations: TileIntegration[];
  scopeWarning: string;          // data transparency
  inputs: FormInput[];
}

export const tilesMetadata: TileMetadata[] = [
  {
    slug: 'inbox-triage',
    name: 'Inbox Triage',
    tagline: 'AI auto-sorts your Gmail into priority buckets—never lose important emails again',
    description: 'Reads your inbound Gmail, classifies emails as actionable or routine, auto-drafts replies in your voice, and surfaces only what matters. Your inbox goes from overwhelming to organized in seconds.',
    whatYouGet: 'Priority-sorted emails + AI-drafted replies ready to send + actionable items auto-created in Google Tasks',
    example: 'You run it on "last 24 hours." It scans 247 emails, identifies 12 urgent ones, auto-drafts 8 replies in your tone, and creates 5 tasks. You click Send on the replies you like and move on.',
    integrations: [
      { name: 'Gmail', emoji: '📧', scope: 'inbox read' },
      { name: 'Google Tasks', emoji: '✅', scope: 'task create' },
      { name: 'Gemini', emoji: '🤖', scope: 'classification + drafting' },
    ],
    scopeWarning: 'We read only Gmail inbox items in your selected time window. We never access passwords, contacts, or calendar. Zero data is used for model training. Drafts are created only—you approve before sending.',
    inputs: [
      {
        key: 'timeWindow',
        label: 'Time Window',
        type: 'select',
        helpText: 'How far back to scan for emails',
        options: [
          { label: 'Last 24 hours', value: '24h' },
          { label: 'Last 7 days', value: '7d' },
          { label: 'Last 30 days', value: '30d' },
        ],
      },
      {
        key: 'priorityThreshold',
        label: 'Priority Threshold (Optional)',
        type: 'select',
        helpText: 'Only surface emails above this importance level',
        options: [
          { label: 'All emails', value: 'low' },
          { label: 'Medium priority+', value: 'medium' },
          { label: 'High priority only', value: 'high' },
        ],
      },
    ],
  },
  {
    slug: 'standup-concierge',
    name: 'Standup Concierge',
    tagline: 'Auto-generate your daily standup from Slack + GitHub—no more "what did I do yesterday?"',
    description: 'Pulls your recent Slack activity, GitHub commits, and PRs, then generates a polished standup post tailored to your team's format. Post to Slack, chat, or email.',
    whatYouGet: 'Complete standup report: yesterday's work, today's plan, blockers, and GitHub activity—ready to paste',
    example: 'Friday 4 PM. You run it. It finds your 3 commits this week, 1 closed PR, Slack messages in #eng-team. Outputs: "Yesterday: reviewed 2 PRs, shipped auth redesign. Today: API integration, deploys. Blocked on: design review."',
    integrations: [
      { name: 'GitHub', emoji: '🐙', scope: 'commits + PRs read' },
      { name: 'Slack', emoji: '💬', scope: 'messages read' },
      { name: 'Gemini', emoji: '🤖', scope: 'synthesis' },
    ],
    scopeWarning: 'Reads only your authored commits and PRs. Scans only messages you authored in selected Slack channels. Nothing is stored after the report is generated.',
    inputs: [
      {
        key: 'slackChannels',
        label: 'Slack Channels',
        type: 'textarea',
        placeholder: '#eng-team\n#product',
        helpText: 'Channels to scan for your activity (one per line)',
      },
      {
        key: 'githubRepo',
        label: 'GitHub Repo',
        type: 'text',
        placeholder: 'owner/repo',
        helpText: 'Main repo to pull commits from',
      },
    ],
  },
  {
    slug: 'pr-review-brief',
    name: 'PR Review Brief',
    tagline: 'Get a one-page review brief for any PR—no more scanning 500 lines of context',
    description: 'Generates a concise review brief for pull requests: summary, key changes, testing notes, and risk assessment. Save time on code review.',
    whatYouGet: 'One-page brief: what changed, why, testing guidance, and review-ready talking points',
    example: 'PR#1234 is 600 lines. You run the brief. Output: "Auth migration PR. Changes login flow, updates 3 tests, 0 risky patterns. Testing: ran e2e tests locally. Approve if tests pass."',
    integrations: [
      { name: 'GitHub', emoji: '🐙', scope: 'PR diff read' },
      { name: 'Gemini', emoji: '🤖', scope: 'analysis' },
    ],
    scopeWarning: 'Reads only the PR diff and test coverage. No access to CI/CD, secrets, or private repos beyond those you authorize.',
    inputs: [
      {
        key: 'repository',
        label: 'Repository',
        type: 'text',
        placeholder: 'owner/repo',
        helpText: 'GitHub repo where PRs live',
      },
      {
        key: 'prNumber',
        label: 'PR Number (Optional)',
        type: 'text',
        placeholder: '1234',
        helpText: 'Leave empty to scan all open PRs',
      },
    ],
  },
  {
    slug: 'calendar-choreographer',
    name: 'Calendar Choreographer',
    tagline: 'Meeting prep delivered 15 minutes before each call—attendee research, docs, talking points',
    description: 'Before each meeting: fetches attendee info, recent shared docs, suggested agenda, and AI talking points. Walk in prepared.',
    whatYouGet: 'Meeting brief: attendees, context from recent emails/docs, suggested talking points, and prep checklist',
    example: 'Your 2 PM with the exec team is in 15 minutes. Auto-generated: attendees, last 5 relevant emails, 2 decision docs, suggested talking points. Read it while getting coffee.',
    integrations: [
      { name: 'Google Calendar', emoji: '📅', scope: 'events read' },
      { name: 'Gmail', emoji: '📧', scope: 'context emails' },
      { name: 'Google Drive', emoji: '📄', scope: 'shared docs' },
      { name: 'Gemini', emoji: '🤖', scope: 'briefing' },
    ],
    scopeWarning: 'Reads only your calendar events and emails sent to attendees in the last 30 days. No access to confidential folders.',
    inputs: [
      {
        key: 'calendar',
        label: 'Which Calendar?',
        type: 'select',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Work', value: 'work' },
        ],
      },
      {
        key: 'lookAhead',
        label: 'Look Ahead Window',
        type: 'select',
        helpText: 'When to start sending briefs before meetings',
        options: [
          { label: '15 minutes', value: '15m' },
          { label: '30 minutes', value: '30m' },
          { label: '1 hour', value: '1h' },
        ],
      },
    ],
  },
  {
    slug: 'knowledge-tender',
    name: 'Knowledge Tender',
    tagline: 'Capture team knowledge once—auto-sync Notion database with docs, email, Slack',
    description: 'Converts emails, Slack threads, and shared docs into structured Notion entries. Your team's institutional knowledge, organized automatically.',
    whatYouGet: 'Structured Notion entries with context, metadata, and linked references—instantly searchable',
    example: 'Someone posts a detailed how-to in Slack. Knowledge Tender captures it, cleans it up, adds metadata (author, date, tags), and syncs it to your Notion Wiki. Your team finds it next week.',
    integrations: [
      { name: 'Notion', emoji: '📝', scope: 'database write' },
      { name: 'Slack', emoji: '💬', scope: 'messages read' },
      { name: 'Gmail', emoji: '📧', scope: 'forwarded docs' },
      { name: 'Gemini', emoji: '🤖', scope: 'extraction + tagging' },
    ],
    scopeWarning: 'Reads only messages/emails you explicitly forward or tag with #capture. Never scrapes Notion for re-training.',
    inputs: [
      {
        key: 'notionDatabase',
        label: 'Notion Database ID',
        type: 'text',
        placeholder: 'abc123def456',
        helpText: 'ID of your Notion database (find in Notion URL)',
      },
      {
        key: 'autoTags',
        label: 'Auto-Apply Tags',
        type: 'textarea',
        placeholder: 'engineering\nbest-practices\nrunbooks',
        helpText: 'Tags to auto-add to captured items (optional)',
      },
    ],
  },
  {
    slug: 'revenue-pulse',
    name: 'Revenue Pulse',
    tagline: 'Stripe metrics at a glance—MRR, ARR, churn, monthly reports sent to Slack',
    description: 'Pulls revenue metrics from your Stripe account, generates reports, and sends weekly/monthly summaries to your Slack. Know your business health instantly.',
    whatYouGet: 'Weekly revenue report: MRR, ARR, new customers, churn rate, and trend analysis',
    example: 'Every Monday at 9 AM, Slack gets your revenue snapshot: "MRR: $12,450 (+$850). ARR: $149,400. New subs: 12. Churn: 0.8%. Best plan: Pro."',
    integrations: [
      { name: 'Stripe', emoji: '💳', scope: 'revenue data read' },
      { name: 'Slack', emoji: '💬', scope: 'message send' },
      { name: 'Gemini', emoji: '🤖', scope: 'analysis + insights' },
    ],
    scopeWarning: 'Reads Stripe billing data only. Does not access customer PII or payment methods. No access to Stripe logs.',
    inputs: [
      {
        key: 'reportType',
        label: 'Report Type',
        type: 'select',
        options: [
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
        ],
      },
      {
        key: 'slackChannel',
        label: 'Slack Channel',
        type: 'text',
        placeholder: '#revenue',
        helpText: 'Where to post the report',
      },
    ],
  },
  {
    slug: 'lead-warmer',
    name: 'Lead Warmer',
    tagline: 'Enrich LinkedIn leads + auto-draft personalized outreach—warm leads in minutes',
    description: 'Takes a LinkedIn profile, researches the person (recent activity, company, mutual connections), and drafts a personalized intro message.',
    whatYouGet: 'Enriched lead profile + 2-3 draft outreach messages in your voice—ready to send or customize',
    example: 'You find a prospect on LinkedIn. You paste the URL. Lead Warmer: finds their company, recent posts, mutual connections, and drafts: "Hey Alex, I saw your post on [topic]. We\'ve solved that for companies like [similar]. Worth 15min?"',
    integrations: [
      { name: 'LinkedIn', emoji: '💼', scope: 'profile read' },
      { name: 'Clearbit', emoji: '🔍', scope: 'company enrichment' },
      { name: 'Gemini', emoji: '🤖', scope: 'personalization' },
    ],
    scopeWarning: 'Reads only public LinkedIn profiles. No access to your message history or connections. Enrichment data from Clearbit is not re-used for training.',
    inputs: [
      {
        key: 'linkedinUrl',
        label: 'LinkedIn Profile URL',
        type: 'text',
        placeholder: 'https://www.linkedin.com/in/...',
        helpText: 'URL of the prospect\'s LinkedIn profile',
      },
      {
        key: 'outreachTemplate',
        label: 'Outreach Template',
        type: 'select',
        options: [
          { label: 'Cold Introduction', value: 'intro' },
          { label: 'Value-First', value: 'value' },
          { label: 'Mutual Connection', value: 'connection' },
          { label: 'Follow-Up', value: 'followup' },
        ],
      },
    ],
  },
];

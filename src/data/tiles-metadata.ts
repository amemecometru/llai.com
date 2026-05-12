// LogicLemon AI · Tile Metadata
// Single source of truth for all workflows.
// Outcome-focused, client-first copywriting.

export interface TileInput {
  key: string;
  label: string;
  helpText?: string;
  placeholder?: string;
  type: 'text' | 'textarea' | 'select';
  options?: { label: string; value: string }[];
}

export interface Integration {
  name: string;
  emoji: string;
}

export interface TileMetadata {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  whatYouGet: string;
  example: string;
  scopeWarning: string;
  integrations: Integration[];
  inputs: TileInput[];
  priceCents: number;
}

export const tilesMetadata: TileMetadata[] = [
  {
    slug: 'inbox-triage',
    name: 'Inbox Triage',
    tagline: 'Your inbox finally works for you—not against you.',
    description:
      'Stop drowning in email. We scan your inbox, instantly separate signal from noise, and surface what actually matters. Actionable emails get priority. Newsletters get filed. Spam gets trashed. And for every email that needs a reply? We draft one in your voice so you just review and send.',
    whatYouGet:
      '✓ Priority-ranked actionable emails · ✓ AI-drafted replies in your tone · ✓ Auto-created tasks for follow-ups · ✓ Clean folders (no manual sorting)',
    example:
      'Run it on "last 24 hours." You get back: 47 emails processed, 12 marked urgent (client requests, action items), 8 replies ready to review, 5 tasks auto-added to your list. You go from overwhelmed to on top of it in 90 seconds.',
    scopeWarning:
      'We read your Gmail inbox (the messages you select) to classify and extract actions. We never train on your data or keep copies. You revoke access anytime.',
    integrations: [
      { name: 'Gmail', emoji: '📧' },
      { name: 'Google Tasks', emoji: '✅' },
      { name: 'Gemini AI', emoji: '🤖' },
    ],
    inputs: [
      {
        key: 'time_window',
        label: 'Time Window',
        helpText: 'How far back to scan for emails (we process only unread or recent by default)',
        type: 'select',
        options: [
          { label: 'Last 4 hours', value: '4h' },
          { label: 'Last 24 hours', value: '24h' },
          { label: 'Last 7 days', value: '7d' },
          { label: 'Last 30 days', value: '30d' },
        ],
      },
    ],
    priceCents: 499,
  },
  {
    slug: 'standup-concierge',
    name: 'Standup Concierge',
    tagline: 'Your standup writes itself. Every morning, on time.',
    description:
      'Standup time shouldn\'t be a scramble. We pull yesterday\'s wins from Slack and GitHub, today\'s priorities from your calendar, and blockers from recent conversations. One clean summary. Zero "uhhhh, what did I do?"',
    whatYouGet:
      '✓ Daily standup digest sent to Slack/email at your time · ✓ Yesterday\'s PRs, commits, completed tasks · ✓ Today\'s meetings and priorities · ✓ Blockers flagged if any · ✓ Ready to copy-paste or present',
    example:
      'Set it for 8 AM. At 7:55 AM, you get: "Yesterday: Merged 2 PRs, closed 3 issues, 5 tasks done. Today: Team sync 10am, design review 2pm. No blockers." Standup time? Done before coffee.',
    scopeWarning:
      'We integrate with Slack (read public channels you specify), GitHub (your repos), and your Google Calendar. We never store conversations—only surface what\'s relevant to your standup.',
    integrations: [
      { name: 'Slack', emoji: '💬' },
      { name: 'GitHub', emoji: '🐙' },
      { name: 'Google Calendar', emoji: '📅' },
    ],
    inputs: [
      {
        key: 'slack_channel',
        label: 'Slack Channel (optional)',
        helpText: 'Leave blank to use your default. Format: #channel-name or just the name',
        type: 'text',
        placeholder: '#general or engineering',
      },
      {
        key: 'github_repo',
        label: 'GitHub Repository',
        helpText: 'Your main repo. Format: owner/repo',
        type: 'text',
        placeholder: 'your-org/main-repo',
      },
      {
        key: 'delivery_time',
        label: 'Delivery Time (your timezone)',
        helpText: 'What time each morning should your standup arrive?',
        type: 'select',
        options: [
          { label: '7:00 AM', value: '07:00' },
          { label: '8:00 AM', value: '08:00' },
          { label: '9:00 AM', value: '09:00' },
          { label: '10:00 AM', value: '10:00' },
        ],
      },
    ],
    priceCents: 299,
  },
  {
    slug: 'pr-review-brief',
    priceCents: 199,
    name: 'PR Review Brief',
    tagline: 'Read PR diffs faster. Spot issues in seconds, not hours.',
    description:
      'Code reviews slow down shipping. We read the diff, surface what changed and *why*, flag common pitfalls (security, performance, patterns), and give you the key questions to ask. You stay the expert. We just make you faster.',
    whatYouGet:
      '✓ One-page PR summary · ✓ What changed and why (intent + impact) · ✓ Potential issues flagged · ✓ Key review questions · ✓ Before/after code comparison · ✓ Ready for async reviews',
    example:
      'Paste a PR link. In 3 seconds: "This adds caching for user profiles. Changes 4 files, +120 lines. Potential issue: cache invalidation on profile edits—ask about TTL strategy. No security concerns. Good test coverage." You ask 2 smart questions instead of reading 200 lines.',
    scopeWarning:
      'We read the PR files from GitHub—nothing is stored or trained on. Your repos stay private. You can review specific PRs or set us to watch a repository.',
    integrations: [
      { name: 'GitHub', emoji: '🐙' },
      { name: 'Claude AI', emoji: '🧠' },
    ],
    inputs: [
      {
        key: 'github_repo',
        label: 'GitHub Repository',
        helpText: 'Which repo to monitor (owner/repo)',
        type: 'text',
        placeholder: 'your-org/repo',
      },
      {
        key: 'pr_number',
        label: 'PR Number (optional)',
        helpText: 'Leave blank to watch all open PRs. Or specify one: #42',
        type: 'text',
        placeholder: 'Leave empty or enter: 42',
      },
      {
        key: 'focus',
        label: 'Review Focus',
        helpText: 'What should we prioritize in reviews?',
        type: 'select',
        options: [
          { label: 'Security first', value: 'security' },
          { label: 'Performance first', value: 'performance' },
          { label: 'Code quality', value: 'quality' },
          { label: 'Balanced', value: 'balanced' },
        ],
      },
    ],
  },
  {
    slug: 'calendar-choreographer',
    priceCents: 599,
    name: 'Calendar Choreographer',
    tagline: 'Never walk into a meeting unprepared again.',
    description:
      'Great meetings aren\'t about showing up. They\'re about being ready. 15 minutes before each meeting, we pull attendee context, recent shared docs, suggested talking points, and a quick agenda. Walk in knowing what matters.',
    whatYouGet:
      '✓ Pre-meeting brief 15 min before · ✓ Who\'s attending + their recent work · ✓ Relevant docs and decisions · ✓ Suggested agenda · ✓ Key talking points · ✓ Sent to your email or Slack',
    example:
      'You have a client call in 15 min. Brief arrives: "Client: Acme Corp, last spoke 3 weeks ago, pending integration update. Recent docs: SOW from Jan, last invoice paid. Suggested topics: integration timeline, next phase, open questions." You\'re the expert in the room.',
    scopeWarning:
      'We read your Google Calendar and recent emails/docs to surface context. We never share or train on your data. All context stays in your account.',
    integrations: [
      { name: 'Google Calendar', emoji: '📅' },
      { name: 'Google Drive', emoji: '📄' },
      { name: 'Gmail', emoji: '📧' },
    ],
    inputs: [
      {
        key: 'calendar_select',
        label: 'Which Calendar?',
        helpText: 'Usually your primary calendar',
        type: 'select',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Work', value: 'work' },
        ],
      },
      {
        key: 'brief_time',
        label: 'Brief Timing',
        helpText: 'How many minutes before each meeting?',
        type: 'select',
        options: [
          { label: '10 minutes before', value: '10' },
          { label: '15 minutes before', value: '15' },
          { label: '30 minutes before', value: '30' },
        ],
      },
      {
        key: 'include_attendees',
        label: 'Include Attendee Context?',
        helpText: 'LinkedIn/company info on attendees (if available)',
        type: 'select',
        options: [
          { label: 'Yes, include context', value: 'yes' },
          { label: 'No, just agenda', value: 'no' },
        ],
      },
    ],
  },
  {
    slug: 'knowledge-tender',
    priceCents: 799,
    name: 'Knowledge Tender',
    tagline: 'Teamwork memory that actually works. Nothing gets lost.',
    description:
      'Great teams are built on shared knowledge. But Slack messages disappear, emails get buried, and your best decisions get forgotten. We watch your conversations, extract the insights, and organize them into your team\'s living knowledge base.',
    whatYouGet:
      '✓ Auto-populated Notion wiki · ✓ Decisions captured · ✓ Best practices organized · ✓ Problem solutions preserved · ✓ Searchable by team · ✓ Always current',
    example:
      'Someone in Slack: "Hey, we solved the caching issue. Use Redis with 1-hour TTL, invalidate on user profile updates." That becomes a wiki page: "Caching Strategy – User Profiles." Next month when someone asks? It\'s there. No "I think someone solved this once..."',
    scopeWarning:
      'We monitor your Slack channels (ones you approve) and Gmail labels to find decisions, solutions, and patterns. Everything goes to your private Notion workspace. Nothing is shared externally.',
    integrations: [
      { name: 'Slack', emoji: '💬' },
      { name: 'Gmail', emoji: '📧' },
      { name: 'Notion', emoji: '📖' },
    ],
    inputs: [
      {
        key: 'slack_channels',
        label: 'Slack Channels to Monitor',
        helpText: 'Comma-separated. e.g., engineering, product, decisions',
        type: 'textarea',
        placeholder: 'engineering, decisions, best-practices',
      },
      {
        key: 'notion_db',
        label: 'Notion Database Name',
        helpText: 'Where should knowledge be stored? (we\'ll create if needed)',
        type: 'text',
        placeholder: 'Team Knowledge Base',
      },
      {
        key: 'categories',
        label: 'Knowledge Categories',
        helpText: 'How to organize? (we auto-categorize by topic)',
        type: 'select',
        options: [
          { label: 'Decisions, Patterns, Solutions', value: 'standard' },
          { label: 'By team (eng, product, design)', value: 'teams' },
          { label: 'By project', value: 'projects' },
        ],
      },
    ],
  },
  {
    slug: 'revenue-pulse',
    priceCents: 399,
    name: 'Revenue Pulse',
    tagline: 'Your business health. In real time. No spreadsheets.',
    description:
      'Wondering if you\'re growing? Checking spreadsheets is for accountants. We connect to your Stripe account, pull the real numbers, and deliver them every Friday: MRR, churn, LTV, expansion, trending. No manual work. Always accurate.',
    whatYouGet:
      '✓ Weekly revenue digest · ✓ MRR + growth trend · ✓ Churn rate + reasons · ✓ LTV and payback period · ✓ New customers vs expansion · ✓ Alerts on anomalies',
    example:
      'Friday 2 PM, Slack notification: "Weekly Revenue: MRR $12.5k (+5% vs last week). 2 new customers, 1 churn, $800 expansion. LTV: $3200. On track for 40% YoY." You know your business without the spreadsheet grind.',
    scopeWarning:
      'We read your Stripe account (metrics only—we never see customer data or payment methods). All data stays in your Slack. No external storage or sharing.',
    integrations: [
      { name: 'Stripe', emoji: '💳' },
      { name: 'Slack', emoji: '💬' },
      { name: 'Google Sheets (optional)', emoji: '📊' },
    ],
    inputs: [
      {
        key: 'delivery_day',
        label: 'Delivery Day',
        helpText: 'What day should your revenue digest arrive?',
        type: 'select',
        options: [
          { label: 'Friday', value: 'friday' },
          { label: 'Monday', value: 'monday' },
          { label: 'Sunday', value: 'sunday' },
        ],
      },
      {
        key: 'delivery_channel',
        label: 'Where to Send It?',
        helpText: 'Slack channel or email',
        type: 'select',
        options: [
          { label: 'Slack #revenue', value: 'slack' },
          { label: 'Your email', value: 'email' },
          { label: 'Both', value: 'both' },
        ],
      },
      {
        key: 'include_alerts',
        label: 'Alert Me On?',
        helpText: 'Get notified immediately if something unexpected happens',
        type: 'select',
        options: [
          { label: 'Churn spike (>10%)', value: 'churn' },
          { label: 'Unusually high MRR growth', value: 'growth' },
          { label: 'Both', value: 'both' },
          { label: 'Digest only', value: 'none' },
        ],
      },
    ],
  },
  {
    slug: 'lead-warmer',
    priceCents: 999,
    name: 'Lead Warmer',
    tagline: 'Personalization at scale. Actually close more deals.',
    description:
      'Outreach at scale sounds soulless. It doesn\'t have to be. We pull real context about a prospect (their company, recent activity, mutual connections, role), then draft a personalized message that actually feels like it\'s from a human. You review. You send. You convert more.',
    whatYouGet:
      '✓ Prospect research in 10 seconds · ✓ Company + role context · ✓ Recent news and signals · ✓ Personalized message draft · ✓ Multiple templates · ✓ Higher reply rates',
    example:
      'Paste a LinkedIn profile. In 5 seconds: "Sarah Chen, Head of Eng at TechStart (Series A, 25 people, raised $3M). Recent: hired 3 engineers, integrated new DB. You: Former teammate at OtherCo. Message ready: \'Hey Sarah, saw TechStart landed Series A—congrats! Remember that caching discussion we had? Might be relevant to your scaling...\'" You send it. They reply.',
    scopeWarning:
      'We pull publicly available info from LinkedIn, company websites, and public signals. We never store prospect data. One-off enrichment, sent to you—that\'s it.',
    integrations: [
      { name: 'LinkedIn', emoji: '🔗' },
      { name: 'Clearbit', emoji: '🔍' },
      { name: 'Gmail/Slack', emoji: '📨' },
    ],
    inputs: [
      {
        key: 'prospect_url',
        label: 'Prospect LinkedIn Profile',
        helpText: 'Paste the full LinkedIn profile URL',
        type: 'text',
        placeholder: 'https://www.linkedin.com/in/username',
      },
      {
        key: 'template',
        label: 'Message Template',
        helpText: 'What\'s your outreach vibe?',
        type: 'select',
        options: [
          { label: 'Warm introduction', value: 'warm' },
          { label: 'Value-first (no ask)', value: 'value' },
          { label: 'Partnership angle', value: 'partner' },
          { label: 'Casual / friend tone', value: 'casual' },
        ],
      },
      {
        key: 'company_context',
        label: 'Context About Your Company',
        helpText: 'What should they know about you? (1-2 lines)',
        type: 'textarea',
        placeholder: 'e.g., We build AI automation for Google Workspace teams',
      },
    ],
  },
];

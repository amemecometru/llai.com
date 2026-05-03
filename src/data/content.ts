// Single source of truth for landing copy + pricing + FAQ.
// Cleanly importable, easy to edit.

export const brand = {
  name: 'LogicLemon',
  tagline: 'AI workflows for your Google Workspace.',
  promise: 'Stop drowning in Workspace.',
  email: 'hello@logiclemonai.com',
};

export type Workflow = {
  id: string;
  title: string;
  description: string;
  trigger: string;
  saved: string;
  emoji: string;
};

export const workflows: Workflow[] = [
  {
    id: 'standup',
    title: 'Daily Standup Report',
    description:
      "Compiles today's meetings, open tasks, and yesterday's deliverables into a clean standup post. Sent to Slack, Chat, or your inbox at 8 AM. Never write a status update again.",
    trigger: 'Cron · 8:00 AM local',
    saved: '~30 min / week',
    emoji: '📋',
  },
  {
    id: 'meeting-prep',
    title: 'Meeting Prep Brief',
    description:
      '15 minutes before each meeting: attendee research, recent shared docs, suggested agenda, AI talking points. Walk in prepared.',
    trigger: 'Calendar event',
    saved: '~45 min / week',
    emoji: '🎯',
  },
  {
    id: 'email-triage',
    title: 'Smart Email Triage',
    description:
      'Auto-categorizes Gmail into priority buckets, drafts replies in your voice, and converts action items into Google Tasks.',
    trigger: 'Inbox webhook',
    saved: '~60 min / week',
    emoji: '📥',
  },
  {
    id: 'weekly-digest',
    title: 'Weekly Workspace Digest',
    description:
      "Friday afternoon: this week's meetings, decisions made, key emails, and important docs — summarized into one digest you can share.",
    trigger: 'Cron · Friday 4 PM',
    saved: '~20 min / week',
    emoji: '📊',
  },
  {
    id: 'file-announce',
    title: 'File Announce',
    description:
      'New Drive file? Auto-broadcast to the right Chat space with an AI-generated summary so context never gets lost.',
    trigger: 'Drive webhook',
    saved: '~10 min / week',
    emoji: '📢',
  },
];

export type Tier = {
  id: string;
  name: string;
  tag: string;
  monthly: string;
  annual: string;
  unit: string;
  note?: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: 'free',
    name: 'Free',
    tag: 'Try the workflow library at no cost.',
    monthly: '$0',
    annual: '$0',
    unit: 'forever',
    features: ['10 workflow runs / mo', '3 saved workflows', '1 Workspace account', 'Community support'],
    cta: 'Start free',
    ctaHref: 'mailto:hello@logiclemonai.com?subject=Free+plan+early+access',
  },
  {
    id: 'personal',
    name: 'Personal',
    tag: 'For solo professionals.',
    monthly: '$12',
    annual: '$10',
    unit: '/ month',
    features: ['200 runs / mo', '10 saved workflows', 'All 5 hero workflows', 'Email support'],
    cta: 'Get Personal',
    ctaHref: 'mailto:hello@logiclemonai.com?subject=Personal+plan+early+access',
  },
  {
    id: 'pro',
    name: 'Pro',
    tag: 'For power users and consultants.',
    monthly: '$39',
    annual: '$31',
    unit: '/ month',
    features: [
      'Unlimited workflow runs',
      'Unlimited workflows',
      'Custom workflow builder',
      'Slack & Chat integrations',
      'Priority email support',
    ],
    cta: 'Get Pro',
    ctaHref: 'mailto:hello@logiclemonai.com?subject=Pro+plan+early+access',
    featured: true,
  },
  {
    id: 'team',
    name: 'Team',
    tag: 'For small teams. Min 5 seats.',
    monthly: '$19',
    annual: '$15',
    unit: '/ seat / month',
    note: 'From $95 / mo (5 seats)',
    features: ['Everything in Pro', 'Shared team workflows', 'Audit log + admin controls', 'Up to 20 seats'],
    cta: 'Get Team',
    ctaHref: 'mailto:hello@logiclemonai.com?subject=Team+plan+early+access',
  },
  {
    id: 'business',
    name: 'Business',
    tag: 'For mid-market. Min 20 seats.',
    monthly: '$39',
    annual: '$31',
    unit: '/ seat / month',
    note: 'From $780 / mo (20 seats)',
    features: ['Everything in Team', 'SSO (Google / Okta)', 'Advanced security controls', 'Priority support, 1-day SLA'],
    cta: 'Get Business',
    ctaHref: 'mailto:hello@logiclemonai.com?subject=Business+plan+early+access',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tag: 'For 200+ employee orgs.',
    monthly: 'Custom',
    annual: 'Custom',
    unit: '',
    note: 'Contact us for pricing',
    features: ['Everything in Business', 'Custom workflow development', 'On-prem option', 'SLA + dedicated success'],
    cta: 'Contact sales',
    ctaHref: 'mailto:hello@logiclemonai.com?subject=Enterprise+inquiry',
  },
];

export const faqs = [
  {
    q: 'How does LogicLemon connect to my Google Workspace?',
    a: "Through standard Google OAuth. You authorize specific scopes (Calendar read, Gmail read/send, Drive read, etc.) for each workflow. Tokens are managed by Composio, our enterprise OAuth provider. Revoke any time from your Google account settings.",
  },
  {
    q: 'Is my data safe? What about my emails and documents?',
    a: "We process your Workspace data only when you explicitly run a workflow. We don't train AI models on your data. Data in transit is TLS-encrypted; data at rest is encrypted via Google Cloud's managed infrastructure.",
  },
  {
    q: 'What happens if a workflow makes a mistake?',
    a: 'Irreversible actions (sending emails, modifying docs) require human-in-the-loop confirmation by default. Every action is logged in your dashboard.',
  },
  {
    q: 'Can I cancel my subscription any time?',
    a: 'Yes. Cancel from your dashboard with one click. 14-day money-back guarantee on all paid plans.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'No. The hero workflow library works out of the box. Custom workflows are described in plain English — our AI translates your description into the underlying automation.',
  },
];

// Real photographic anchor — replace with your own asset if you have one
export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=2400&q=80&auto=format&fit=crop';

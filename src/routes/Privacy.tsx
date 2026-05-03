import LegalLayout from '../components/LegalLayout';

export default function Privacy() {
  return (
    <LegalLayout eyebrow="Legal" title={<>Privacy <em>Policy</em></>} updated="Last updated: May 1, 2026">
      <Callout>
        <strong>Plain English:</strong> We collect what we need to run your workflows. We never sell your data. We
        don't train AI models on your Workspace content. You can export or delete your data any time.
      </Callout>

      <h2>1. Information we collect</h2>
      <h3>Account information</h3>
      <ul>
        <li>Name, email, billing details</li>
        <li>Workflow configurations you create</li>
        <li>Communications with our support team</li>
      </ul>
      <h3>From your Workspace (with OAuth consent)</h3>
      <ul>
        <li>Calendar events</li>
        <li>Email metadata and content (only as needed for triage / digest workflows)</li>
        <li>Drive file metadata (file names, sharing status)</li>
        <li>Tasks and Chat data only as the workflows you enable require</li>
      </ul>
      <h3>Automatically collected</h3>
      <ul>
        <li>Usage data — workflow runs, errors, response times</li>
        <li>Device and log data — IP address, browser type, pages visited</li>
        <li>Authentication cookies and (optionally) analytics cookies</li>
      </ul>

      <h2>2. How we use information</h2>
      <ul>
        <li>To provide, maintain, and improve the Service</li>
        <li>To execute the workflows you configure</li>
        <li>To process payments and manage subscriptions</li>
        <li>To detect and prevent fraud, abuse, and security incidents</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>3. What we don't do</h2>
      <ul>
        <li><strong>We don't sell your data.</strong></li>
        <li><strong>We don't train AI models on your Workspace content.</strong></li>
        <li><strong>We don't share your data with advertisers.</strong></li>
      </ul>

      <h2>4. AI processing</h2>
      <p>
        Some workflows use Google Vertex AI (Gemini) for tasks like summarization or classification. We send only the
        minimum content needed and instruct providers not to retain or train on your data.
      </p>

      <h2>5. Sharing</h2>
      <ul>
        <li>
          <strong>Service providers:</strong> Stripe (payments), Composio (OAuth), Google Cloud (infrastructure),
          Cloudflare (CDN/DNS) — each bound by data processing agreements
        </li>
        <li>
          <strong>Legal requests:</strong> when required by law; we will notify you unless prohibited
        </li>
        <li>
          <strong>Business transfers:</strong> in the event of a merger or asset sale; we will notify you in advance
        </li>
      </ul>

      <h2>6. Data retention</h2>
      <p>
        Active accounts: data retained while account is active. After cancellation: billing records retained per tax
        and accounting law (typically 7 years). Workflow logs: 90 days. You may request earlier deletion at
        hello@logiclemonai.com.
      </p>

      <h2>7. Your rights</h2>
      <p>
        Subject to your jurisdiction, you may have rights to access, correct, delete, export, or restrict processing
        of your data. Email <a href="mailto:hello@logiclemonai.com">hello@logiclemonai.com</a> to exercise these
        rights. We respond within 30 days.
      </p>

      <h2>8. International transfers</h2>
      <p>
        We process data primarily in the United States. EU/UK transfers rely on Standard Contractual Clauses.
      </p>

      <h2>9. Children</h2>
      <p>The Service is not directed at children under 16. We do not knowingly collect data from children.</p>

      <h2>10. Contact</h2>
      <p>Privacy questions: <a href="mailto:hello@logiclemonai.com">hello@logiclemonai.com</a></p>
    </LegalLayout>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 border-l-2 border-lemon bg-lemon-soft px-5 py-4 dark:bg-lemon/10">
      <p className="font-body text-base text-ink dark:text-dark-ink">{children}</p>
    </div>
  );
}

import LegalLayout from '../components/LegalLayout';

export default function Security() {
  return (
    <LegalLayout
      eyebrow="Trust & security"
      title={<>How we keep your <em>data safe</em></>}
      updated="Last updated: May 1, 2026"
    >
      <Callout>
        <strong>Plain English:</strong> Encrypted at rest and in transit. We don't train AI on your Workspace content.
        OAuth tokens managed by SOC 2-certified Composio. We're working toward our own SOC 2 Type II certification.
      </Callout>

      <h2>Infrastructure</h2>
      <ul>
        <li><strong>Hosting:</strong> Google Cloud Run (serverless, isolated workloads)</li>
        <li><strong>Database:</strong> Firestore with managed encryption at rest</li>
        <li><strong>Secrets:</strong> Google Cloud Secret Manager (no plaintext secrets in code or config)</li>
        <li><strong>CDN/DNS:</strong> Cloudflare with TLS 1.3, automatic HTTPS, DDoS protection</li>
        <li><strong>Region:</strong> Primary processing in US data centers</li>
      </ul>

      <h2>Encryption</h2>
      <ul>
        <li><strong>In transit:</strong> TLS 1.2+ for all client-server communication. HSTS enabled.</li>
        <li><strong>At rest:</strong> AES-256 via Google Cloud's managed infrastructure</li>
        <li><strong>OAuth tokens:</strong> Stored and rotated by Composio (SOC 2 Type II certified)</li>
      </ul>

      <h2>Access controls</h2>
      <ul>
        <li>Least-privilege IAM for internal access</li>
        <li>2FA required on all administrative accounts</li>
        <li>Audit logging via Google Cloud Logging</li>
        <li>No raw production database access — all queries through audited interfaces</li>
      </ul>

      <h2>Workspace integration</h2>
      <p>
        We integrate via official OAuth scopes — never via scraping or unofficial APIs. You authorize specific scopes
        per workflow (e.g., <code>calendar.readonly</code> for Meeting Prep). Revoke any time from your Google account.
      </p>
      <p>OAuth tokens are managed by Composio, a SOC 2 Type II certified provider. We never store raw tokens on our infrastructure.</p>

      <h2>AI processing</h2>
      <p>
        Some workflows use Google Vertex AI (Gemini) for tasks like summarization or classification. We send only the
        minimum content needed and instruct providers not to retain or train on your data.
      </p>

      <h2>What we don't do</h2>
      <ul>
        <li>We don't train AI models on your Workspace content.</li>
        <li>We don't sell or share your data with advertisers.</li>
        <li>We don't store OAuth tokens in plaintext.</li>
        <li>We don't access your data outside of executing your enabled workflows.</li>
      </ul>

      <h2>Compliance roadmap</h2>
      <ul>
        <li><strong>SOC 2 Type II:</strong> in progress, targeted within 12 months of launch</li>
        <li><strong>GDPR:</strong> we follow GDPR principles; SCCs cover EU transfers</li>
        <li><strong>CCPA:</strong> California users have access, deletion, and opt-out rights per our Privacy Policy</li>
        <li><strong>HIPAA:</strong> not currently HIPAA-compliant; do not use for protected health information</li>
      </ul>

      <h2>Incident response</h2>
      <p>
        If we identify a security incident affecting your data, we will notify affected users within 72 hours of
        discovery. Subscribe at status.logiclemonai.com.
      </p>

      <h2>Reporting vulnerabilities</h2>
      <p>
        Email <a href="mailto:hello@logiclemonai.com?subject=Security+disclosure">hello@logiclemonai.com</a> with the
        subject "Security disclosure." We'll acknowledge within 2 business days, investigate within 7, and credit you
        for the discovery (with permission) once the issue is resolved.
      </p>
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

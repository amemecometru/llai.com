import LegalLayout from '../components/LegalLayout';

export default function Terms() {
  return (
    <LegalLayout eyebrow="Legal" title={<>Terms of <em>Service</em></>} updated="Last updated: May 1, 2026">
      <Callout>
        <strong>Plain English:</strong> Use LogicLemon lawfully, pay your subscription, keep your account safe. We
        keep the service running, protect your data, and let you cancel any time.
      </Callout>

      <h2>1. Agreement to Terms</h2>
      <p>
        These Terms of Service ("Terms") govern your access to and use of the LogicLemon AI platform, website
        (logiclemonai.com), and related services (collectively, the "Service") provided by LogicLemon AI ("we," "us,"
        or "our"). By creating an account or using the Service, you agree to be bound by these Terms.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 and capable of entering into a binding contract. If you act on behalf of an
        organization, you represent that you have authority to bind it.
      </p>

      <h2>3. The Service</h2>
      <p>
        LogicLemon provides AI-powered automation workflows for Google Workspace. The Service connects via OAuth and
        executes workflows you configure. You authorize specific OAuth scopes per workflow and may revoke access at any
        time.
      </p>

      <h2>4. Subscriptions and Payment</h2>
      <p>
        Paid plans are billed via Stripe. By subscribing, you authorize recurring charges to your payment method until
        you cancel. We offer a 14-day money-back guarantee on first-time paid plans (see{' '}
        <a href="/refund">Refund Policy</a>). Cancellation takes effect at the end of your current billing period.
      </p>

      <h2>5. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Service for any illegal purpose or to violate applicable law</li>
        <li>Send spam, phishing messages, or unsolicited communications</li>
        <li>Reverse engineer, decompile, or extract source code from the Service</li>
        <li>Access accounts or data not belonging to you</li>
        <li>Resell or sublicense the Service without our written consent</li>
        <li>Violate Google's Terms of Service or Workspace API policies</li>
      </ul>

      <h2>6. Customer Data</h2>
      <p>
        You retain rights to data you provide ("Customer Data"). You grant us a limited license to process Customer
        Data solely to provide the Service. We do not use Customer Data to train AI models. See our{' '}
        <a href="/privacy">Privacy Policy</a> for details.
      </p>

      <h2>7. Disclaimers and Liability</h2>
      <p>
        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT
        PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIM IS LIMITED TO THE AMOUNT YOU PAID US IN THE 12 MONTHS
        PRECEDING THE CLAIM. AI-generated content should be reviewed before relying on it for important decisions.
      </p>

      <h2>8. Termination</h2>
      <p>
        We may suspend or terminate your access for material breach. You may terminate by canceling your subscription
        and emailing hello@logiclemonai.com to request account deletion.
      </p>

      <h2>9. Changes</h2>
      <p>We will notify you of material changes via email or in-product notice. Continued use after changes take effect constitutes acceptance.</p>

      <h2>10. Contact</h2>
      <p>Questions? <a href="mailto:hello@logiclemonai.com">hello@logiclemonai.com</a>.</p>

      <Callout>
        <strong>Note:</strong> This is a starter Terms of Service template. Have these reviewed by an attorney
        licensed in your jurisdiction before processing real payments.
      </Callout>
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

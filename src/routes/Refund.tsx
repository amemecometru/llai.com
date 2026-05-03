import LegalLayout from '../components/LegalLayout';

export default function Refund() {
  return (
    <LegalLayout eyebrow="Legal" title={<>Refund <em>Policy</em></>} updated="Last updated: May 1, 2026">
      <Callout>
        <strong>The short version:</strong> Don't love LogicLemon in the first 14 days of your first paid
        subscription? Email us and we'll refund it. No questions, no friction.
      </Callout>

      <h2>14-day money-back guarantee</h2>
      <p>
        We offer a 14-day money-back guarantee on your first paid subscription. If LogicLemon doesn't save you time,
        we'll refund your first month (or the equivalent prorated amount of your annual plan) — no questions asked.
      </p>

      <h3>How to request a refund</h3>
      <ul>
        <li>
          Email <a href="mailto:hello@logiclemonai.com?subject=Refund+request">hello@logiclemonai.com</a> with the
          subject "Refund request"
        </li>
        <li>Include the email address associated with your account</li>
        <li>Refunds processed within 5 business days to your original payment method</li>
      </ul>

      <h2>What qualifies</h2>
      <ul>
        <li>Your first-ever paid subscription on Personal, Pro, Team, or Business plans</li>
        <li>Refund requested within 14 days of the original charge</li>
      </ul>

      <h2>What doesn't qualify</h2>
      <ul>
        <li>Renewals or subsequent billing periods after your first month</li>
        <li>Plan upgrades after the initial 14-day window</li>
        <li>Enterprise plans (governed by individual contracts)</li>
        <li>Accounts terminated for ToS violations</li>
      </ul>

      <h2>Annual plans</h2>
      <p>
        Annual plans are eligible for a full refund within the first 14 days. After 14 days, annual plans are
        non-refundable for the remainder of the period, but you can cancel and prevent future renewals.
      </p>

      <h2>Disputes and chargebacks</h2>
      <p>
        Email us first — we will almost always resolve issues directly. Initiating a chargeback without contacting us
        first may result in immediate account termination.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? <a href="mailto:hello@logiclemonai.com">hello@logiclemonai.com</a> · response within 1 business day.
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

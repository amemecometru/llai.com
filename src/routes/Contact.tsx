import LegalLayout from '../components/LegalLayout';

export default function Contact() {
  return (
    <LegalLayout eyebrow="Get in touch" title={<>Contact <em>us</em></>} updated="We respond within one business day.">
      <Block label="General & Support" body="Questions, technical issues, anything else.">
        <a href="mailto:hello@logiclemonai.com">hello@logiclemonai.com</a>
      </Block>

      <Block label="Sales & Enterprise" body="Deploy across a team or organization. We'll set up a call.">
        <a href="mailto:hello@logiclemonai.com?subject=Enterprise+inquiry">
          hello@logiclemonai.com (subject: Enterprise inquiry)
        </a>
      </Block>

      <Block label="Privacy & Security" body="Privacy requests, security disclosures, data deletion requests.">
        <a href="mailto:hello@logiclemonai.com?subject=Privacy+request">
          hello@logiclemonai.com (subject: Privacy request)
        </a>
      </Block>

      <Block label="Business Information" body="">
        <p className="font-body text-base">
          <strong>Company:</strong> LogicLemon AI
          <br />
          <strong>Website:</strong> logiclemonai.com
          <br />
          <strong>Mailing address:</strong> [Add your business mailing address before going live]
          <br />
          <strong>Support hours:</strong> Mon–Fri, 9 AM–6 PM ET
        </p>
      </Block>

      <div className="my-6 border-l-2 border-lemon bg-lemon-soft px-5 py-4 dark:bg-lemon/10">
        <p className="font-body text-base text-ink dark:text-dark-ink">
          <strong>Before going live with Stripe:</strong> Replace the bracketed mailing address above with a real
          postal address (a virtual mailbox or PO box is fine).
        </p>
      </div>
    </LegalLayout>
  );
}

function Block({ label, body, children }: { label: string; body: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-8 first:border-t-0 dark:border-dark-border">
      <h2 className="font-display text-xl font-semibold tracking-tight">{label}</h2>
      {body && <p className="mt-2 font-body text-base text-ink-soft dark:text-dark-ink-soft">{body}</p>}
      <div className="mt-3 font-body text-base">{children}</div>
    </section>
  );
}

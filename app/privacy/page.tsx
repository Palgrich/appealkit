export const metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <div className="prose prose-slate mx-auto max-w-3xl px-4 py-12 prose-headings:font-semibold">
      <h1>Privacy Policy</h1>
      <h2>What we collect</h2>
      <p>
        The information you type into a letter form is sent to our servers solely to generate
        your document, and to our AI provider (Anthropic) for text generation. We do not sell
        your information. Form contents are stored in your own browser (localStorage) so your
        letter can be produced after payment; they are not retained in a database on our
        servers.
      </p>
      <h2>Payments</h2>
      <p>
        Payments are processed by Stripe. We never see or store your card details. Stripe may
        collect your email address for receipts, subject to Stripe&apos;s privacy policy.
      </p>
      <h2>Analytics</h2>
      <p>
        We may use privacy-respecting, cookie-free analytics to count page visits. We do not
        run third-party advertising trackers.
      </p>
      <h2>Contact</h2>
      <p>For any privacy question or deletion request, email us at support@appealkits.com.</p>
    </div>
  );
}

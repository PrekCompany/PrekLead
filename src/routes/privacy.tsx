import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { BackLink } from "@/components/BackLink";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — PREKLEAD" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-up px-4">
          <div>
            <div className="mb-6"><BackLink to="/" /></div>
            <h1 className="text-3xl font-bold font-display">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm mt-2">Last updated: June 2025</p>
          </div>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">1. Information We Collect</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We collect information you provide directly to us when registering for and using our services, including:
              account credentials (email address, encrypted password), profile information (name, business name, business type),
              subscription and billing information, usage data (messages processed, leads generated, feature utilization),
              and communication data (messages, attachments, and content processed through our AI systems).
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">2. How We Use Your Information</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use collected information to provide, maintain, and improve our AI-powered communication services.
              This includes processing messages through our AI engine for classification, intent detection, lead scoring,
              and reply generation. We analyze usage patterns to optimize platform performance and deliver personalized
              experiences. Account information is used for authentication, subscription management, and customer support.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">3. Data Storage and Security</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your data is stored using enterprise-grade cloud infrastructure including Cloudflare D1 database,
              Cloudflare KV for session management, and Cloudflare R2 for file storage. All data in transit is
              encrypted via TLS 1.3. Passwords are hashed using SHA-256. Session tokens are stored securely with
              configurable TTL. We implement appropriate technical and organizational security measures to protect
              your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">4. Data Sharing and Disclosure</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. Data may be shared with
              trusted service providers who assist in platform operation, subject to strict confidentiality obligations.
              We may disclose information when required by law, to protect our rights or safety, or to prevent fraud.
              Aggregated, anonymized usage statistics may be used for research and service improvement purposes.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">5. AI and Automated Processing</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our platform utilizes artificial intelligence to analyze communication content, classify messages,
              detect intent, score leads, and generate suggested replies. AI processing is performed server-side
              and outputs are generated based on patterns in your data. You maintain full control over AI-generated
              content and may review, modify, or discard any AI suggestions before use. AI processing does not involve
              training on your personal data outside your account context unless explicitly configured.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">6. Third-Party Integrations</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our platform integrates with third-party communication channels including Telegram, with additional
              integrations planned for Instagram and WhatsApp. When connecting third-party accounts, we store session
              data necessary for message synchronization. Third-party services operate under their respective privacy
              policies. We recommend reviewing the privacy policies of any integrated services. Integration data is
              processed in accordance with this policy and applicable service terms.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">7. Cookies and Tracking</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use essential cookies and similar technologies to maintain session state, remember preferences,
              and ensure platform security. Analytics cookies help us understand how users interact with our services
              to improve functionality. You may accept or reject non-essential cookies through our cookie consent
              banner. Essential cookies required for authentication and security cannot be disabled. Cookie preferences
              are stored locally and may be modified at any time through account settings.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">8. Your Rights</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You have the right to access, correct, or delete your personal data. You may request a complete export
              of your account data or request account deletion at any time. Subscription and usage data may be retained
              for billing and audit purposes as required by law. Data deletion requests are processed within 30 days.
              You may opt out of non-essential communications through account settings. Data portability requests will
              be fulfilled within a reasonable timeframe in standard machine-readable formats.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">9. Contact Information</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For privacy-related inquiries, data requests, or concerns about this policy, please contact us at
              privacy@preklead.com. We aim to respond to all privacy inquiries within 5 business days.
              For account-specific data requests, authenticated users may use the account deletion or data export
              features available in application settings.
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}

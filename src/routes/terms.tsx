import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { BackLink } from "@/components/BackLink";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — PREKLEAD" }] }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-up px-4">
          <div>
            <div className="mb-6"><BackLink to="/" /></div>
            <h1 className="text-3xl font-bold font-display">Terms of Service</h1>
            <p className="text-muted-foreground text-sm mt-2">Last updated: June 2025</p>
          </div>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By accessing or using PREKLEAD services, you agree to be bound by these Terms of Service.
              If you do not agree to all terms and conditions, you may not access or use the service.
              These terms constitute a legally binding agreement between you and PREKLEAD.
              We reserve the right to modify these terms at any time, with continued use constituting acceptance.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">2. Service Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PREKLEAD provides AI-powered communication automation, lead management, customer relationship management,
              and analytics platform. Services include message classification, intent detection, lead scoring,
              AI-generated reply suggestions, and multi-channel inbox management. Service availability is subject to
              our infrastructure capabilities and maintenance requirements. We strive to maintain 99.9% uptime but
              do not guarantee uninterrupted service.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">3. User Accounts</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials and for all
              activities that occur under your account. You must notify us immediately of any unauthorized use
              of your account. We reserve the right to suspend or terminate accounts that violate these terms
              or engage in fraudulent, abusive, or illegal activities. Account sharing is not permitted.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">4. Subscription and Billing</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Subscription fees are billed in advance on a monthly or annual basis as selected during registration.
              All fees are non-refundable except as required by applicable law. We reserve the right to modify
              pricing with 30 days notice. Cancellation takes effect at the end of the current billing period.
              downgraded accounts retain access to previously purchased features until the end of the billing cycle.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">5. Acceptable Use</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You agree not to use the service for any unlawful purpose or in violation of any applicable laws
              or regulations. You may not use the service to transmit spam, malware, or harmful content.
              Automated access (scraping, crawling) without our express written permission is prohibited.
              You retain all rights to your data but grant us the technical access necessary to provide the service.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">6. Limitation of Liability</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PREKLEAD shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use or inability to use the service. Our total liability for any claims arising
              from these terms shall not exceed the amount paid by you in the 12 months preceding the claim.
              Some jurisdictions do not allow limitations of liability, so this limitation may not apply to you.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">7. Intellectual Property</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The PREKLEAD platform, including its code, design, branding, and AI models, is protected by
              intellectual property laws. You may not copy, modify, distribute, or create derivative works
              without our explicit permission. Feedback and suggestions you provide may be used to improve
              our services without compensation.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">8. Data Protection</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We process your data in accordance with our Privacy Policy and applicable data protection laws.
              Data is stored on secure servers with encryption at rest and in transit. We implement appropriate
              technical and organizational measures to protect personal data. Data processing agreements are
              available upon request for enterprise customers.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">9. Termination</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Either party may terminate this agreement at any time. Upon termination, your access to the service
              will be revoked within 30 days. We will provide a reasonable period to export your data before
              permanent deletion. Termination does not relieve you of payment obligations incurred prior to
              termination. Sections 5-8 of these terms survive termination.
            </p>
          </section>

          <section className="glass-strong rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">10. Contact</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For questions about these terms, please contact us at legal@preklead.com.
              These terms were last updated in June 2025.
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}

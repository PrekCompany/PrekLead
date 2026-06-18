import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — PREKLEAD" }] }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 space-y-8 animate-fade-up">
      <div>
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
          AI-generated reply suggestions, customer profiling, and integration with third-party communication channels.
          Service availability, features, and pricing are subject to change with prior notice where feasible.
        </p>
      </section>

      <section className="glass-strong rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">3. Account Responsibilities</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Users are responsible for maintaining the confidentiality of account credentials and for all activities
          under their account. You must provide accurate and complete registration information and keep it updated.
          You agree to notify us immediately of any unauthorized access or security breach. Accounts found in
          violation of acceptable use policies may be suspended or terminated without prior notice.
          You are responsible for all content and actions performed through your account.
        </p>
      </section>

      <section className="glass-strong rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">4. Subscription and Billing</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Subscription plans are billed in advance on a recurring basis according to the selected billing cycle.
          All fees are non-refundable except as required by law or as explicitly stated.
          Plan limits including message processing, lead count, and storage capacity are strictly enforced.
          Overage beyond plan limits may result in service throttling, additional charges, or account suspension.
          Subscription terms may be modified with 30 days prior notice to registered email addresses.
        </p>
      </section>

      <section className="glass-strong rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">5. Acceptable Use</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You agree not to use the service for any unlawful purpose, to transmit harmful or malicious content,
          to attempt unauthorized access to any portion of the service, to interfere with service operation,
          or to violate any applicable laws or regulations. Spam, harassment, fraud, or any activity that may
          damage, disable, or impair the service is strictly prohibited. We reserve the right to investigate
          violations and take appropriate legal action.
        </p>
      </section>

      <section className="glass-strong rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">6. Intellectual Property</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The PREKLEAD platform, including all software, design, trademarks, and content, is owned by PREKLEAD
          and protected by intellectual property laws. User data remains the property of the respective users.
          AI-generated content produced through the service is provided to users for their use. Platform
          improvements may incorporate anonymized usage patterns. No license is granted for resale, redistribution,
          or commercial exploitation of the service beyond stated subscription terms.
        </p>
      </section>

      <section className="glass-strong rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">7. Limitation of Liability</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          PREKLEAD services are provided on an as-is basis without warranties of any kind, either express or implied.
          We do not guarantee uninterrupted, error-free, or completely secure service operation.
          To the maximum extent permitted by law, PREKLEAD shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages, including loss of profits, data, or business opportunities,
          arising from use of or inability to use the service.
        </p>
      </section>

      <section className="glass-strong rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">8. Termination</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Either party may terminate the service agreement at any time. Upon termination, your right to use the
          service ceases immediately. We may retain certain data as required by law or for legitimate business
          purposes including fraud prevention and security. Data export options are available prior to account
          deletion. Termination does not affect rights and obligations accrued prior to termination.
          Sections regarding intellectual property, limitation of liability, and general provisions survive termination.
        </p>
      </section>

      <section className="glass-strong rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">9. Contact</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For questions regarding these Terms of Service, please contact legal@preklead.com.
          Legal notices should be directed to our registered agent at the address provided upon request.
          We will make reasonable efforts to respond to legitimate inquiries within a commercially reasonable timeframe.
        </p>
      </section>
    </div>
  );
}

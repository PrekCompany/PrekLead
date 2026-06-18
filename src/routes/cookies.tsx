import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Check, X, Settings2 } from "lucide-react";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: "Cookie Policy — PREKLEAD" }] }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 space-y-8 animate-fade-up">
      <div>
        <h1 className="text-3xl font-bold font-display">Cookie Policy</h1>
        <p className="text-muted-foreground text-sm mt-2">Last updated: June 2025</p>
      </div>

      <section className="glass-strong rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">1. What Are Cookies</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Cookies are small text files stored on your device when you visit our website. They are widely used
          to make websites work more efficiently and to provide reporting information to site owners.
          This Cookie Policy explains how PREKLEAD uses cookies and similar tracking technologies.
        </p>
      </section>

      <section className="glass-strong rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">2. Types of Cookies We Use</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Essential cookies: Required for platform operation, authentication, and security. These cannot be disabled.
          Functional cookies: Remember your preferences and settings to provide enhanced functionality.
          Analytics cookies: Collect information about how you use our platform to help us improve performance.
          Marketing cookies: Used to track visitors across websites for advertising purposes (if applicable).
        </p>
      </section>

      <section className="glass-strong rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">3. Managing Your Preferences</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You can accept or reject non-essential cookies through our cookie consent banner.
          You may also manage cookie preferences through your browser settings.
          Disabling essential cookies may affect platform functionality and security.
          Cookie preferences are stored locally and may be updated at any time.
        </p>
      </section>

      <section className="glass-strong rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">4. Third-Party Cookies</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Some cookies may be placed by third-party service providers integrated with our platform.
          These third parties may use cookies to collect information about your online activities over time
          and across different websites. We do not control these third-party cookies and recommend reviewing
          the privacy policies of any integrated services for their cookie practices.
        </p>
      </section>

      <section className="glass-strong rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">5. Updates to This Policy</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We may update this Cookie Policy from time to time to reflect changes in technology, legislation,
          or our business operations. Any changes will be posted on this page with an updated revision date.
          We encourage you to review this policy periodically. Continued use of the platform following
          such changes constitutes acceptance of the updated Cookie Policy.
        </p>
      </section>
    </div>
  );
}

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [settings, setSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setShow(true), 800);
    }
  }, []);

  if (!show) return null;

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ essential: true, analytics: true, marketing: true, date: new Date().toISOString() }));
    setShow(false);
  };

  const rejectNonEssential = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ essential: true, analytics: false, marketing: false, date: new Date().toISOString() }));
    setShow(false);
  };

  const saveSettings = () => {
    const analytics = (document.getElementById("cookie-analytics") as HTMLInputElement)?.checked || false;
    const marketing = (document.getElementById("cookie-marketing") as HTMLInputElement)?.checked || false;
    localStorage.setItem("cookie-consent", JSON.stringify({ essential: true, analytics, marketing, date: new Date().toISOString() }));
    setShow(false);
    setSettings(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-5xl mx-auto glass-strong rounded-2xl p-5 space-y-4 animate-fade-up">
        {!settings ? (
          <>
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center shrink-0">
                <Settings2 size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold">Cookie Preferences</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  We use cookies to enhance your experience, analyze site traffic, and for marketing purposes.
                  You can customize your preferences or accept all cookies.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end">
              <button onClick={rejectNonEssential} className="px-4 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
                Reject All
              </button>
              <button onClick={() => setSettings(true)} className="px-4 py-2 rounded-lg text-xs font-medium border border-border hover:bg-white/5 transition-all">
                Settings
              </button>
              <button onClick={acceptAll} className="px-4 py-2 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                Accept All
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-sm font-semibold">Cookie Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-border/50">
                <div>
                  <div className="text-xs font-medium">Essential Cookies</div>
                  <div className="text-[10px] text-muted-foreground">Required for authentication and security</div>
                </div>
                <input type="checkbox" checked disabled className="size-4 rounded accent-primary" />
              </label>
              <label className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-border/50">
                <div>
                  <div className="text-xs font-medium">Analytics Cookies</div>
                  <div className="text-[10px] text-muted-foreground">Help us improve platform performance</div>
                </div>
                <input id="cookie-analytics" type="checkbox" className="size-4 rounded accent-primary" />
              </label>
              <label className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-border/50">
                <div>
                  <div className="text-xs font-medium">Marketing Cookies</div>
                  <div className="text-[10px] text-muted-foreground">Used for targeted advertising</div>
                </div>
                <input id="cookie-marketing" type="checkbox" className="size-4 rounded accent-primary" />
              </label>
            </div>
            <div className="flex items-center gap-3 justify-end">
              <button onClick={() => setSettings(false)} className="px-4 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
                Back
              </button>
              <button onClick={saveSettings} className="px-4 py-2 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                Save Preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

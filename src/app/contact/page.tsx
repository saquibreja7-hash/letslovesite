import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact - Let's Love",
  description: "Contact Let's Love support for help, feedback, legal, privacy, or account questions.",
};

export default function ContactPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link href="/" className="legal-brand" aria-label="Back to Let's Love home">
          <Image src="/logo.png" alt="Let's Love logo" width={38} height={38} className="site-logo" priority />
          <span>Let&apos;s Love by JAMSAQ STUDIO</span>
        </Link>
        <Link href="/" className="legal-home-link">
          Home
        </Link>
      </header>

      <article className="legal-document">
        <section className="doc-header">
          <p className="kicker">Contact</p>
          <h1>Write to Let&apos;s Love support</h1>
          <p className="summary">
            For help, feedback, legal, privacy, account deletion, payment-support, or safety questions, reach us by email.
          </p>
          <span className="updated">Support email: support@jamsaq.in</span>
        </section>

        <section className="notice">
          <h2>Support</h2>
          <p>
            Email us at <a href="mailto:support@jamsaq.in">support@jamsaq.in</a>. If your message is about your account,
            please write from the email address linked to your Let&apos;s Love account where possible.
          </p>
          <div className="cta-row">
            <a className="button primary" href="mailto:support@jamsaq.in">
              <Mail className="size-4 shrink-0" />
              Email support
            </a>
          </div>
        </section>
      </article>

      <footer className="legal-footer">
        <p>Let&apos;s Love by JAMSAQ STUDIO</p>
        <a href="mailto:support@jamsaq.in">support@jamsaq.in</a>
      </footer>
    </main>
  );
}

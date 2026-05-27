import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getLegalSnapshot, legalSnapshots } from "@/app/legalSnapshots";

type LegalRouteProps = {
  params: Promise<{
    legalSlug: string;
  }>;
};

export function generateStaticParams() {
  return legalSnapshots.map((page) => ({ legalSlug: page.slug }));
}

export async function generateMetadata({ params }: LegalRouteProps): Promise<Metadata> {
  const { legalSlug } = await params;
  const page = getLegalSnapshot(legalSlug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function LegalPage({ params }: LegalRouteProps) {
  const { legalSlug } = await params;
  const page = getLegalSnapshot(legalSlug);

  if (!page) {
    notFound();
  }

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

      <article className="legal-document document" dangerouslySetInnerHTML={{ __html: page.html }} />

      <footer className="legal-footer">
        <p>Let&apos;s Love by JAMSAQ STUDIO</p>
        <a href="mailto:support@jamsaq.in">support@jamsaq.in</a>
      </footer>
    </main>
  );
}

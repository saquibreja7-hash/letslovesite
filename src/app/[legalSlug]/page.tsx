import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getLegalSnapshot, legalSnapshots } from "@/app/legalSnapshots";
import { defaultOpenGraphImage, siteConfig } from "@/app/seo";

type LegalRouteProps = {
  params: Promise<{
    legalSlug: string;
  }>;
};

export function generateStaticParams() {
  return [
    ...legalSnapshots.map((page) => ({ legalSlug: page.slug })),
    { legalSlug: "privacy-policy" },
    { legalSlug: "terms-and-conditions" },
    { legalSlug: "delete-account" },
  ];
}

export async function generateMetadata({ params }: LegalRouteProps): Promise<Metadata> {
  const { legalSlug } = await params;
  const page = getLegalSnapshot(legalSlug);

  if (!page) {
    return {};
  }

  return {
    title: {
      absolute: page.title,
    },
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/${page.slug}`,
      siteName: siteConfig.name,
      images: [defaultOpenGraphImage],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [defaultOpenGraphImage.url],
    },
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

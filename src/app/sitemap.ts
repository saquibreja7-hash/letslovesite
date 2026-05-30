import type { MetadataRoute } from "next";

import { legalSnapshots } from "@/app/legalSnapshots";
import { absoluteUrl } from "@/app/seo";

const lastModified = new Date("2026-05-30T00:00:00.000Z");

const coreRoutes = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.6,
  },
] satisfies Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const legalRoutes = legalSnapshots.map((page) => ({
    path: `/${page.slug}`,
    changeFrequency: "yearly" as const,
    priority: page.slug === "privacy" || page.slug === "terms" ? 0.5 : 0.4,
  }));

  return [...coreRoutes, ...legalRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

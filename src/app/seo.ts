export const siteConfig = {
  name: "Let's Love",
  companyName: "JAMSAQ STUDIO",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://letslove.jamsaq.in").replace(/\/+$/, ""),
  title: "Let's Love - Private Couple App for Chat, Memories, Goals, Dates, and Daily Connection",
  description:
    "Let's Love is an Android-first private couple app for partners to chat, save memories, track goals, plan dates, answer daily questions, play games, and stay emotionally connected.",
  locale: "en_US",
  supportEmail: "support@jamsaq.in",
  instagramUrl: "https://www.instagram.com/letsloveapp",
};

export const defaultOpenGraphImage = {
  url: "/link-preview.png",
  width: 1200,
  height: 630,
  alt: "Let's Love private couple app landing page preview",
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(normalizedPath, `${siteConfig.url}/`).toString();
}

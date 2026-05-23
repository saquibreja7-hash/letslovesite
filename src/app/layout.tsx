import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Let’s Love — A Private Couple App for Memories, Goals, Chat, and Daily Connection",
  description: "Let’s Love is a private app for couples to chat, save memories, track goals, share todos, answer daily questions, plan dates, and stay emotionally connected every day.",
  keywords: "couple app, relationship app, app for couples, long distance couple app, shared calendar for couples, couple goals app, private couple chat, relationship tracker, love app for couples, daily questions for couples, couple memories app, mood check-in app for couples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Instrument_Serif, Inter, Schoolbell } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const schoolbell = Schoolbell({
  variable: "--font-organic",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Let's Love - Private Couple App for Chat, Memories, Goals, Dates, and Daily Connection",
  description:
    "Let's Love is an Android-first private couple app for paired partners to chat, send voice notes, save memories, track goals and todos, plan dates, answer daily questions, play games, and stay emotionally connected.",
  keywords:
    "couple app, relationship app, app for couples, long distance couple app, shared calendar for couples, couple goals app, private couple chat, voice notes for couples, date ideas app, love touch app, daily questions for couples, couple memories app, mood check-in app for couples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${schoolbell.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

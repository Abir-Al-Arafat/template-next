import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Template Next | Modern Web Starter",
    template: "%s | Template Next",
  },
  description:
    "A production-grade Next.js starter template featuring React 19, Tailwind CSS, TypeScript, and modular architecture.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Starter Template",
    "Modern Web",
  ],
  authors: [{ name: "Template Next Team" }],
  creator: "Template Next",
  metadataBase: new URL("https://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://localhost:3000",
    title: "Template Next | Modern Web Starter",
    description:
      "A production-grade Next.js starter template featuring React 19, Tailwind CSS, TypeScript, and modular architecture.",
    siteName: "Template Next",
  },
  twitter: {
    card: "summary_large_image",
    title: "Template Next | Modern Web Starter",
    description:
      "A production-grade Next.js starter template featuring React 19, Tailwind CSS, TypeScript, and modular architecture.",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

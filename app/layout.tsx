// app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "TicketPilot — Resolve 3x more tickets without hiring 3x more agents",
  description:
    "AI-powered support ticket triage for growing teams. Auto-resolve simple tickets, draft replies for agent review, and escalate the rest with full context.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "TicketPilot",
    description: "Resolve 3x more tickets without hiring 3x more agents.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TicketPilot",
    description: "Resolve 3x more tickets without hiring 3x more agents.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

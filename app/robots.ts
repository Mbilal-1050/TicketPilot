// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://ticketpilot.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/inbox", "/settings", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}

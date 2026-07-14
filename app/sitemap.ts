// app/sitemap.ts
import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://ticketpilot.com";

  const staticRoutes = ["", "/pricing", "/about", "/privacy-policy", "/terms-of-service", "/blog"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));

  const blogDir = path.join(process.cwd(), "content/blog");
  const blogRoutes = fs.existsSync(blogDir)
    ? fs
        .readdirSync(blogDir)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => ({
          url: `${base}/blog/${f.replace(".mdx", "")}`,
          lastModified: new Date(),
        }))
    : [];

  return [...staticRoutes, ...blogRoutes];
}

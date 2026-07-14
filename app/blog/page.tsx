// app/blog/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — TicketPilot",
  description: "Ideas on support ops, AI triage, and cutting response time without hiring.",
};

function getPosts() {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return data as { title: string; slug: string; description: string; date: string; status: string };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <>
      <MarketingNavbar />
      <section className="max-w-3xl mx-auto px-6 py-20">
        <p className="font-mono text-xs text-beacon-600 uppercase tracking-wide mb-3">Blog</p>
        <h1 className="text-4xl font-display font-semibold text-runway-900 mb-10">
          Notes on support ops
        </h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <p className="text-xs text-steel font-mono mb-1">{post.date}</p>
              <h2 className="text-xl font-display font-semibold text-runway-900 group-hover:text-beacon transition-colors">
                {post.title}
              </h2>
              <p className="text-steel text-sm mt-1">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </>
  );
}

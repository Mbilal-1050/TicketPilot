// app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data, content } as { data: { title: string; description: string; date: string }; content: string };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  return { title: `${post.data.title} — TicketPilot Blog`, description: post.data.description };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  // Simple markdown-to-paragraph rendering (swap for next-mdx-remote if richer formatting is needed)
  const paragraphs = post.content.trim().split("\n\n");

  return (
    <>
      <MarketingNavbar />
      <article className="max-w-2xl mx-auto px-6 py-20">
        <p className="text-xs text-steel font-mono mb-3">{post.data.date}</p>
        <h1 className="text-3xl font-display font-semibold text-runway-900 mb-8 leading-tight">
          {post.data.title}
        </h1>
        <div className="prose prose-runway text-runway-700 space-y-4 leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
          ))}
        </div>
      </article>
      <MarketingFooter />
    </>
  );
}

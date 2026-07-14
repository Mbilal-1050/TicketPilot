// components/marketing/navbar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MarketingNavbar() {
  return (
    <header className="border-b border-runway-100 bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-sm bg-beacon flex items-center justify-center font-mono text-xs font-bold text-white">
            TP
          </div>
          <span className="font-display font-semibold text-runway-900 tracking-tight">TicketPilot</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-runway-600">
          <Link href="/#features" className="hover:text-runway-900">Features</Link>
          <Link href="/pricing" className="hover:text-runway-900">Pricing</Link>
          <Link href="/about" className="hover:text-runway-900">About</Link>
          <Link href="/blog" className="hover:text-runway-900">Blog</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-runway-600 hover:text-runway-900 hidden sm:block">
            Log in
          </Link>
          <Link href="/pricing">
            <Button size="sm">Start free trial</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

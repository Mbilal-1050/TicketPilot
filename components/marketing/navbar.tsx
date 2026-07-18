// components/marketing/navbar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function MarketingNavbar() {
  return (
    <header className="border-b border-runway-100 dark:border-runway-700 bg-white/80 dark:bg-runway-900/80 backdrop-blur sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-sm bg-beacon flex items-center justify-center font-mono text-xs font-bold text-white">
            TP
          </div>
          <span className="font-display font-semibold text-runway-900 dark:text-white tracking-tight">TicketPilot</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-runway-600 dark:text-runway-300">
          <Link href="/#features" className="hover:text-runway-900 dark:hover:text-white">Features</Link>
          <Link href="/pricing" className="hover:text-runway-900 dark:hover:text-white">Pricing</Link>
          <Link href="/about" className="hover:text-runway-900 dark:hover:text-white">About</Link>
          <Link href="/blog" className="hover:text-runway-900 dark:hover:text-white">Blog</Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link href="/api/auth/login" className="text-sm text-runway-600 dark:text-runway-300 hover:text-runway-900 dark:hover:text-white hidden sm:block">
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

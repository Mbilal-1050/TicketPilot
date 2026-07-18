// components/marketing/footer.tsx
import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-runway-100 dark:border-runway-700 bg-white dark:bg-runway-900 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-sm bg-beacon flex items-center justify-center font-mono text-xs font-bold text-white">
              TP
            </div>
            <span className="font-display font-semibold text-runway-900 dark:text-white">TicketPilot</span>
          </div>
          <p className="text-sm text-steel dark:text-runway-400">Resolve 3x more tickets without hiring 3x more agents.</p>
        </div>

        <FooterCol title="Product" links={[
          { label: "Features", href: "/#features" },
          { label: "Pricing", href: "/pricing" },
          { label: "Changelog", href: "/changelog" },
        ]} />
        <FooterCol title="Company" links={[
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
        ]} />
        <FooterCol title="Legal" links={[
          { label: "Privacy policy", href: "/privacy-policy" },
          { label: "Terms of service", href: "/terms-of-service" },
        ]} />
      </div>
      <div className="border-t border-runway-100 dark:border-runway-700 py-6 text-center text-xs text-steel dark:text-runway-500">
        © {new Date().getFullYear()} TicketPilot. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold text-runway-900 dark:text-white uppercase tracking-wide mb-3">{title}</p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-steel dark:text-runway-400 hover:text-runway-900 dark:hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

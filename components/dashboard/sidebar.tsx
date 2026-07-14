// components/dashboard/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "◱" },
  { href: "/inbox", label: "Inbox", icon: "◧" },
  { href: "/routing", label: "Routing rules", icon: "◈" },
  { href: "/knowledge-base", label: "Knowledge base", icon: "◫" },
  { href: "/settings", label: "Settings", icon: "◐" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-runway-900 text-runway-100 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-6 flex items-center gap-2">
        <div className="w-7 h-7 rounded-sm bg-beacon flex items-center justify-center font-mono text-xs font-bold text-white">
          TP
        </div>
        <span className="font-display font-semibold text-white tracking-tight">TicketPilot</span>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-DEFAULT text-sm transition-colors",
                active
                  ? "bg-runway-800 text-white font-medium"
                  : "text-runway-300 hover:bg-runway-800/60 hover:text-white"
              )}
            >
              <span className="font-mono text-xs w-4 text-center opacity-70">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-5 pt-3 border-t border-runway-700">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-DEFAULT text-sm text-runway-300 hover:bg-runway-800/60 hover:text-white transition-colors"
        >
          <span className="w-7 h-7 rounded-full bg-runway-700 flex items-center justify-center text-xs font-medium text-white">
            AO
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-white text-sm">Acme Outfitters</span>
            <span className="text-runway-400 text-xs">Growth plan</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}

// components/dashboard/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "◱" },
  { href: "/inbox", label: "Inbox", icon: "◧" },
  { href: "/routing", label: "Routing rules", icon: "◈" },
  { href: "/knowledge-base", label: "Knowledge base", icon: "◫" },
  { href: "/settings", label: "Settings", icon: "◐" },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
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
              onClick={onNavigate}
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
          onClick={onNavigate}
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
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-runway-900 text-white px-4 h-14 border-b border-runway-700">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-sm bg-beacon flex items-center justify-center font-mono text-xs font-bold text-white">
            TP
          </div>
          <span className="font-display font-semibold tracking-tight text-sm">TicketPilot</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="w-9 h-9 flex items-center justify-center rounded-DEFAULT hover:bg-runway-800"
        >
          <span className="text-lg leading-none">☰</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-runway-900 h-full shadow-card">
            <div className="flex justify-end px-3 pt-3">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-8 h-8 flex items-center justify-center rounded-DEFAULT text-runway-300 hover:bg-runway-800 hover:text-white"
              >
                ✕
              </button>
            </div>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
        </div>
      )}

      <aside className="hidden md:flex w-60 shrink-0 bg-runway-900 text-runway-100 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
}

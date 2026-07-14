// components/ui/status-tag.tsx
//
// Signature element: ticket classification rendered like a departures-board
// gate tag — monospace, terse, color-coded. Used throughout the inbox and
// dashboard so status is always scannable at a glance.

import { clsx } from "@/lib/utils";

type Classification = "AUTO_RESOLVE" | "DRAFT_FOR_REVIEW" | "ESCALATE" | "UNCLASSIFIED";

const CONFIG: Record<Classification, { label: string; className: string }> = {
  AUTO_RESOLVE: { label: "AUTO", className: "bg-cleared-50 text-cleared-600 border-cleared-100" },
  DRAFT_FOR_REVIEW: { label: "DRAFT", className: "bg-beacon-50 text-beacon-600 border-beacon-100" },
  ESCALATE: { label: "ESC", className: "bg-ember-50 text-ember-600 border-ember-100" },
  UNCLASSIFIED: { label: "PENDING", className: "bg-runway-100 text-runway-500 border-runway-200" },
};

export function StatusTag({ classification }: { classification: Classification }) {
  const cfg = CONFIG[classification];
  return (
    <span
      className={clsx(
        "inline-flex items-center font-mono text-xs font-semibold tracking-wide px-2 py-1 rounded-sm border",
        cfg.className
      )}
    >
      {cfg.label}
    </span>
  );
}

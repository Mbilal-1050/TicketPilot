// components/dashboard/stat-card.tsx
import { Card } from "@/components/ui/card";
import { clsx } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  deltaTone = "positive",
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "positive" | "negative" | "neutral";
}) {
  return (
    <Card className="p-5">
      <p className="text-xs font-medium text-steel uppercase tracking-wide">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-display font-semibold text-runway-900">{value}</span>
        {delta && (
          <span
            className={clsx(
              "text-xs font-medium",
              deltaTone === "positive" && "text-cleared-600",
              deltaTone === "negative" && "text-ember-600",
              deltaTone === "neutral" && "text-steel"
            )}
          >
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}

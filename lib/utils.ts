// lib/utils.ts
export function clsx(...args: (string | false | null | undefined)[]) {
  return args.filter(Boolean).join(" ");
}

export function formatNumber(n: number) {
  if (n === Infinity) return "Unlimited";
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatRelativeTime(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = Date.now() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

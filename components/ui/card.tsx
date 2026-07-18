// components/ui/card.tsx
import { HTMLAttributes } from "react";
import { clsx } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-runway-800 border border-runway-100 dark:border-runway-700 rounded-lg shadow-card transition-colors",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("px-5 pt-5 pb-3", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("px-5 pb-5", className)} {...props} />;
}

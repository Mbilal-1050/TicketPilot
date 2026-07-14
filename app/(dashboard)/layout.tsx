// app/(dashboard)/layout.tsx
import { Sidebar } from "@/components/dashboard/sidebar";
import { FeedbackWidget } from "@/components/feedback-widget";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-cloud">
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
      <FeedbackWidget />
    </div>
  );
}

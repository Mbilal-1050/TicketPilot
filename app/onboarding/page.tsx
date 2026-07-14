// app/onboarding/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusTag } from "@/components/ui/status-tag";

const STEPS = ["Connect a helpdesk", "AI classifies your last 20 tickets", "You're set"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-runway-900 flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        <div className="flex items-center gap-2 mb-8 justify-center">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${
                  i <= step ? "bg-beacon text-white" : "bg-runway-700 text-runway-400"
                }`}
              >
                {i + 1}
              </div>
              {i < STEPS.length - 1 && <div className="w-8 h-px bg-runway-700" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-card">
          {step === 0 && (
            <div className="text-center">
              <h1 className="text-xl font-display font-semibold text-runway-900 mb-2">
                Connect your helpdesk
              </h1>
              <p className="text-steel text-sm mb-6">
                We'll pull in your last 20 tickets and show you AI triage live — takes under 2 minutes.
              </p>
              <div className="space-y-2">
                <Button className="w-full" onClick={() => setStep(1)}>Connect Zendesk</Button>
                <Button className="w-full" variant="secondary" onClick={() => setStep(1)}>Connect Intercom</Button>
              </div>
              <p className="text-xs text-steel mt-4">
                No helpdesk yet?{" "}
                <button className="text-beacon underline" onClick={() => setStep(1)}>
                  Explore with sample data instead
                </button>
              </p>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 className="text-xl font-display font-semibold text-runway-900 mb-1 text-center">
                Classifying your tickets...
              </h1>
              <p className="text-steel text-sm mb-6 text-center">This usually takes a few seconds.</p>
              <div className="space-y-2 mb-6">
                {[
                  { tag: "AUTO_RESOLVE" as const, text: "Where is my order #4821?" },
                  { tag: "DRAFT_FOR_REVIEW" as const, text: "Wrong size received, need exchange" },
                  { tag: "ESCALATE" as const, text: "Charged twice — very frustrated" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3 bg-runway-50 rounded-sm px-3 py-2.5">
                    <StatusTag classification={row.tag} />
                    <span className="text-runway-800 text-sm flex-1 truncate">{row.text}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full" onClick={() => setStep(2)}>Continue</Button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <h1 className="text-xl font-display font-semibold text-runway-900 mb-2">You're all set</h1>
              <p className="text-steel text-sm mb-6">
                Your queue is live. Head to your inbox to review the first batch of drafts.
              </p>
              <a href="/inbox">
                <Button className="w-full">Go to inbox</Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

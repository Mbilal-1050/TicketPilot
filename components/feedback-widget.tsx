// components/feedback-widget.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  async function submit() {
    // TODO: POST to /api/feedback once that route is built
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setSent(false);
      setMessage("");
    }, 1500);
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open ? (
        <div className="bg-white border border-runway-100 rounded-lg shadow-card p-4 w-72">
          {sent ? (
            <p className="text-sm text-cleared-600 font-medium">Thanks — feedback sent.</p>
          ) : (
            <>
              <p className="text-sm font-medium text-runway-900 mb-2">Send feedback</p>
              <textarea
                className="w-full border border-runway-200 rounded-sm text-sm p-2 h-20 resize-none"
                placeholder="What's working, what's not?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <Button size="sm" onClick={submit} disabled={!message.trim()}>Send</Button>
                <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-runway-900 text-white text-sm px-4 py-2.5 rounded-full shadow-card hover:bg-runway-800"
        >
          Feedback
        </button>
      )}
    </div>
  );
}

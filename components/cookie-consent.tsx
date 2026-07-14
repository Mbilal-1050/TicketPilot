// components/cookie-consent.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = document.cookie.includes("tp_cookie_consent=");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    document.cookie = "tp_cookie_consent=accepted; max-age=31536000; path=/";
    setVisible(false);
  }

  function decline() {
    document.cookie = "tp_cookie_consent=declined; max-age=31536000; path=/";
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm bg-runway-900 text-white rounded-lg p-4 shadow-card z-50">
      <p className="text-sm text-runway-200">
        We use essential cookies to run TicketPilot, and optional analytics cookies to
        understand usage. You can decline non-essential cookies.
      </p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={accept}>Accept all</Button>
        <Button size="sm" variant="secondary" onClick={decline}>Essential only</Button>
      </div>
    </div>
  );
}

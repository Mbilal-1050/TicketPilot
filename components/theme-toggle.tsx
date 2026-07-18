// components/theme-toggle.tsx
"use client";

import { useEffect, useState } from "react";

export function ThemeToggle({ dark = false }: { dark?: boolean }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("tp_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored ? stored === "dark" : prefersDark;
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("tp_theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={
        dark
          ? "w-9 h-9 flex items-center justify-center rounded-DEFAULT text-runway-300 hover:bg-runway-800 hover:text-white transition-colors"
          : "w-9 h-9 flex items-center justify-center rounded-DEFAULT text-runway-500 hover:bg-runway-100 hover:text-runway-900 transition-colors"
      }
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}

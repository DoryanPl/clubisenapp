import { useEffect, useState } from "react";

export default function useDarkMode() {
  // Render the same markup on server and client, then sync theme after mount
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const preferred = (() => {
      if (typeof window === "undefined") return "light";
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    })();

    setTheme(preferred);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return [theme, setTheme] as const;
}
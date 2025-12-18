"use client";

import { useState, ReactNode, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: "light" | "dark";
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = "light",
}) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return initialTheme;

    const persisted = window.localStorage.getItem("theme");
    if (persisted === "light" || persisted === "dark") return persisted;

    // Respect the theme raised by the hydration script.
    if (document.documentElement.classList.contains("dark")) return "dark";
    const datasetTheme = document.documentElement.dataset.theme;
    if (datasetTheme === "light" || datasetTheme === "dark") return datasetTheme;

    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Apply the theme class to the root element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.dataset.theme = theme;
    // Persist the preference
    try {
      window.localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

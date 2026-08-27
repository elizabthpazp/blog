"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import "@theme-toggles/react/css/Expand.css";
import { Expand } from "@theme-toggles/react";

export function ThemeSwitcher({ classNameProp }: { classNameProp: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={classNameProp} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* @ts-ignore */}
      <Expand
        onToggle={() => setTheme(theme == "dark" ? "light" : "dark")}
        duration={750}
        idPrefix={'moon'}
        className="text-gray-700 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        style={{ width: "42px", height: "24px", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}
      />
    </div>
  );
}

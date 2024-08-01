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
    <div>
      <Expand
        onToggle={() => setTheme(theme == "dark" ? "light" : "dark")}
        duration={750} idPrefix={'moon'}
        style={{ width: "55px", height: "30px", paddingTop: "6px", marginTop: "0px", fontSize: "25px" }} placeholder={""} onPointerEnterCapture={""} onPointerLeaveCapture={""} />
    </div>
  );
}

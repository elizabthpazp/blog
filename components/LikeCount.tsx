"use client"
import { useEffect, useState } from "react";
import { getLikesPage } from "../get-likes-post";

export default function LikeCount({
  slug,
  title,
  animation,
}: {
  slug: any;
  title: string;
  animation: boolean;
}) {
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const c = await getLikesPage(slug);
        if (!cancelled) setCount(c);
      } catch {
        if (!cancelled) setCount(0);
      }
      try {
        if (typeof window !== "undefined" && localStorage.getItem(`liked:${slug}`)) {
          if (!cancelled) setIsLiked(true);
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const insertLike = async () => {
    if (isLiked || loading) return;
    setLoading(true);
    setCount((c) => c + 1);
    setIsLiked(true);

    try {
      const res = await fetch(`/api/post?id=${encodeURIComponent(slug)}`, {
        cache: "no-store",
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(`Failed: ${res.status} ${data?.error || ""}`.trim());
      }
      if (typeof data?.count === "number") {
        setCount(data.count);
      }
      try {
        localStorage.setItem(`liked:${slug}`, "1");
      } catch {}
    } catch (e) {
      console.error("insertLike failed", e);
      setCount((c) => Math.max(0, c - 1));
      setIsLiked(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={insertLike}
      disabled={loading}
      aria-label={isLiked ? "Liked" : "Like this article"}
      aria-pressed={isLiked}
      title={isLiked ? "You liked this article" : "Like this article"}
      className={`group flex items-center gap-2 px-3.5 py-2 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
        isLiked
          ? "bg-gradient-to-br from-pink-500/15 to-rose-500/10 border-pink-500/60 shadow-lg shadow-pink-500/25"
          : "bg-white/70 dark:bg-[#161926]/70 border-black/10 dark:border-white/10 hover:border-pink-400 shadow-md hover:shadow-pink-500/20"
      }`}
    >
      <span
        className={`relative inline-flex items-center justify-center w-6 h-6 transition-transform duration-300 ${
          animation ? "group-hover:scale-125" : ""
        } ${isLiked ? "animate-bounce" : ""}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`hg-${slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6aa6" />
              <stop offset="55%" stopColor="#ff2d6f" />
              <stop offset="100%" stopColor="#e0004f" />
            </linearGradient>
          </defs>
          <path
            d="M12 21s-7.5-4.6-9.6-9.1C.7 7.7 3.5 3.5 7.5 3.5c2 0 3.5 1 4.5 2.5 1-1.5 2.5-2.5 4.5-2.5 4 0 6.8 4.2 5.1 8.4C19.5 16.4 12 21 12 21z"
            fill={isLiked ? `url(#hg-${slug})` : "none"}
            stroke={
              isLiked
                ? `url(#hg-${slug})`
                : "currentColor"
            }
            strokeWidth={isLiked ? 0 : 1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={
              isLiked
                ? ""
                : "text-gray-500 dark:text-gray-400 group-hover:text-pink-500 transition-colors duration-300"
            }
          />
        </svg>
      </span>
      <span
        className={`font-semibold text-sm tabular-nums transition-colors duration-300 ${
          isLiked
            ? "bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"
            : "text-gray-800 dark:text-gray-200"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

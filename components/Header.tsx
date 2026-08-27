"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import LocaleSwitcher from "./LocaleSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { links } from "../links-web";
import { Locale } from "../i18n-config";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
  icon: (props: { className?: string }) => ReactNode;
  accent?: "violet" | "cyan" | "rose" | "amber";
};

const ACCENT_MAP: Record<NonNullable<NavLink["accent"]>, string> = {
  violet:
    "from-violet-500/15 to-indigo-500/15 text-violet-600 dark:text-violet-400 group-hover:from-violet-500/25 group-hover:to-indigo-500/25",
  cyan: "from-cyan-500/15 to-sky-500/15 text-cyan-600 dark:text-cyan-400 group-hover:from-cyan-500/25 group-hover:to-sky-500/25",
  rose: "from-rose-500/15 to-pink-500/15 text-rose-600 dark:text-rose-400 group-hover:from-rose-500/25 group-hover:to-pink-500/25",
  amber:
    "from-amber-500/15 to-orange-500/15 text-amber-600 dark:text-amber-400 group-hover:from-amber-500/25 group-hover:to-orange-500/25",
};

export default function Header({
  actual,
  showHome,
}: {
  actual?: Locale;
  showHome?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastState = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 8;
        if (next !== lastState) {
          lastState = next;
          setScrolled(next);
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const socialLinks: NavLink[] = [
    {
      href: links.github,
      label: "GitHub",
      external: true,
      icon: GithubIcon,
      accent: "violet",
    },
    {
      href: links.twitter,
      label: "Twitter",
      external: true,
      icon: TwitterIcon,
      accent: "cyan",
    },
    {
      href: links.linkedin,
      label: "LinkedIn",
      external: true,
      icon: LinkedinIcon,
      accent: "violet",
    },
    {
      href: links.instagram,
      label: "Instagram",
      external: true,
      icon: InstagramIcon,
      accent: "rose",
    },
    {
      href: links.youtube,
      label: "YouTube",
      external: true,
      icon: YoutubeIcon,
      accent: "rose",
    },
    {
      href: links.web,
      label: "elijs.dev",
      external: true,
      icon: GlobeIcon,
      accent: "amber",
    },
  ];

  return (
    <>
      <header
        style={{ transform: 'translateZ(0)', willChange: 'transform' } as any}
        className={`sticky top-0 z-40 w-full transition-all duration-300 transform-gpu ${
          scrolled
            ? "py-2 backdrop-blur-lg md:backdrop-blur-xl bg-white/80 dark:bg-[#0b0d14]/80 shadow-lg shadow-black/[0.03] dark:shadow-black/20"
            : "py-3 backdrop-blur-md md:backdrop-blur-xl bg-white/70 dark:bg-[#0b0d14]/70 shadow-sm"
        }`}
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent opacity-70" />

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="relative group flex items-center shrink-0"
            aria-label={links.username}
          >
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500/0 to-indigo-500/0 group-hover:from-violet-500/25 group-hover:to-indigo-500/25 blur-md transition-all duration-500" />
            <span className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <img
                alt={links.username}
                title={links.username}
                src={links.logo}
                className="h-8 sm:h-9 w-auto object-contain forcedImage transition-transform duration-300 group-hover:rotate-[-4deg] drop-shadow-[0_0_8px_rgba(124,58,237,0.25)]"
              />
            </span>
          </Link>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
            {showHome && (
              <NavButton href="/" title="Home" label="Home">
                <HomeIcon className="w-[18px] h-[18px]" />
              </NavButton>
            )}

            <div className="px-1.5 py-1 rounded-xl hover:bg-violet-500/10 transition-colors">
              <LocaleSwitcher actual={actual} classNameProp="switch-lang" />
            </div>

            <div className="p-1 rounded-full hover:bg-violet-500/10 transition-colors flex items-center justify-center">
              <ThemeSwitcher classNameProp="cursor-pointer flex items-center justify-center" />
            </div>

            <Link
              href={links.githubBlog}
              title="GitHub repository"
              rel="noopener noreferrer"
              target="_blank"
              className="btn-primary !py-2 !px-3.5 !rounded-xl !text-sm flex items-center gap-2 shadow-sm hover:shadow-violet-500/40"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="font-semibold">GitHub</span>
              <ArrowUpRightIcon className="w-3 h-3 opacity-70" />
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-1">
            <div className="p-1 rounded-full hover:bg-violet-500/10 transition-colors flex items-center justify-center">
              <ThemeSwitcher classNameProp="cursor-pointer flex items-center justify-center" />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10 hover:bg-violet-500/10 hover:border-violet-500/30 text-gray-800 dark:text-gray-200 transition-all duration-200 cursor-pointer"
            >
              <MenuIcon className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu sheet */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        actual={actual}
        showHome={showHome}
        socialLinks={socialLinks}
      />
    </>
  );
}

function NavButton({
  href,
  title,
  label,
  children,
}: {
  href: string;
  title: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      title={title}
      aria-label={label}
      className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10 hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-violet-600 dark:hover:text-violet-400 text-gray-700 dark:text-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-violet-500/10"
    >
      {children}
    </Link>
  );
}

function MobileMenu({
  open,
  onClose,
  actual,
  showHome,
  socialLinks,
}: {
  open: boolean;
  onClose: () => void;
  actual?: Locale;
  showHome?: boolean;
  socialLinks: NavLink[];
}) {
  return (
    <>
      {/* Backdrop - sin blur ni bg cuando cerrado para no crear layer GPU que frena scroll */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
          open ? "bg-black/40 backdrop-blur-sm opacity-100" : "bg-transparent backdrop-blur-none opacity-0 pointer-events-none"
        }`}
        style={{ contain: open ? 'paint' : 'none', willChange: 'opacity' } as any}
      />

      {/* Sheet - evita layer fijo cuando cerrado */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-x-0 top-0 z-50 md:hidden transition-all duration-300 ease-out ${
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ contain: open ? 'paint' : 'none', willChange: 'transform, opacity', visibility: open ? 'visible' : 'hidden' } as any}
      >
        <div className={`relative mx-3 mt-3 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl shadow-violet-500/10 overflow-hidden ${open ? "backdrop-blur-2xl bg-white/95 dark:bg-[#0b0d14]/95" : "backdrop-blur-none bg-white dark:bg-[#0b0d14]"}`}>
          {/* Decorative gradient orb */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gradient-to-br from-indigo-500/15 to-violet-500/15 blur-3xl pointer-events-none" />

          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.06]">
              <Link
                href="/"
                onClick={onClose}
                aria-label={links.username}
                className="relative group flex items-center shrink-0"
              >
                <span className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500/0 to-indigo-500/0 group-hover:from-violet-500/25 group-hover:to-indigo-500/25 blur-md transition-all duration-500" />
                <span className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <img
                    src={links.logo}
                    alt={links.username}
                    className="h-8 w-auto forcedImage drop-shadow-[0_0_8px_rgba(124,58,237,0.25)]"
                  />
                </span>
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-rose-500/10 hover:text-rose-500 text-gray-700 dark:text-gray-200 transition-all duration-200 cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Quick controls */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-black/[0.06] dark:border-white/[0.06]">
              <div className="flex-1 flex items-center gap-2 px-2 py-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 pl-1">
                  Theme
                </span>
                <div className="ml-auto">
                  <ThemeSwitcher classNameProp="cursor-pointer flex items-center" />
                </div>
              </div>

              <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 pl-1 pr-2">
                  Lang
                </span>
                <LocaleSwitcher actual={actual} classNameProp="switch-lang" />
              </div>
            </div>

            {/* Nav links */}
            <nav className="px-3 py-3 max-h-[60vh] overflow-y-auto">
              {showHome && (
                <MobileNavLink
                  href="/"
                  label="Home"
                  icon={<HomeIcon className="w-5 h-5" />}
                  accent="violet"
                  onClick={onClose}
                />
              )}

              <p className="px-3 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Connect
              </p>

              <div className="grid grid-cols-1 gap-1.5">
                {socialLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={onClose}
                      style={{ animationDelay: `${idx * 40}ms` }}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-gradient-to-r ${
                        ACCENT_MAP[link.accent || "violet"]
                      } border border-transparent hover:border-current/20 transition-all duration-200 cursor-pointer animate-fade-in-up`}
                    >
                      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/80 dark:bg-[#121520]/80 border border-black/5 dark:border-white/10 shrink-0">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="flex-1 text-sm font-semibold">
                        {link.label}
                      </span>
                      <ArrowUpRightIcon className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-black/[0.06] dark:border-white/[0.06] bg-gradient-to-r from-violet-500/[0.04] to-indigo-500/[0.04]">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 text-center font-medium">
                Made with <span className="text-violet-500">💜</span> by elijs.dev
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileNavLink({
  href,
  label,
  icon,
  accent,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  accent: keyof typeof ACCENT_MAP;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-gradient-to-r ${ACCENT_MAP[accent]} border border-transparent hover:border-current/20 transition-all duration-200 animate-fade-in-up`}
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/80 dark:bg-[#121520]/80 border border-black/5 dark:border-white/10 shrink-0">
        {icon}
      </span>
      <span className="flex-1 text-sm font-semibold">{label}</span>
      <ArrowUpRightIcon className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </Link>
  );
}

/* ===== Icons ===== */

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M7 17 17 7M7 7h10v10"
      />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9"
      />
    </svg>
  );
}
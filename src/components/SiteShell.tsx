"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TelegramBubble } from "./TelegramBubble";

type NavItem =
  | { kind: "route"; to: string; label: string }
  | { kind: "link"; href: string; label: string; easterEgg?: string };

const NAV: readonly NavItem[] = [
  { kind: "route", to: "/", label: "Index" },
  { kind: "route", to: "/bookmarks", label: "Bookmarks" },
  { kind: "route", to: "/brain", label: "Brain" },
  { kind: "link", href: "https://www.youtube.com/@christarasovs", label: "youtube" },
  { kind: "link", href: "#", label: "onlyfans", easterEgg: "omg, could you imagine??" },
  { kind: "link", href: "https://x.com/tarasovs_", label: "twitter" },
  { kind: "link", href: "mailto:me@christarasovs.com", label: "contact" },
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [easterEgg, setEasterEgg] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 pt-6 pb-0">
          <div className="flex items-center justify-between gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/chris-profile.png"
                alt="Chris Tarasovs"
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
              <span className="mono text-sm tracking-tight">ChrisTarasovs</span>
            </Link>
            <div className="hidden sm:flex items-center gap-4">
              <div className="mono text-xs text-muted-foreground flex items-center gap-2">
                <span>London</span>
                <span className="signal-dot" />
                <span>available</span>
              </div>
              <a
                href="https://calendar.app.google/Fc7Kbm3jeQH2a9FR9"
                target="_blank"
                rel="noreferrer"
                className="mono text-xs px-3 py-1.5 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors rounded-sm"
              >
                Book a call →
              </a>
            </div>
          </div>
          {easterEgg && (
            <div
              className="fixed inset-0 z-50 grid place-items-center bg-background/90 backdrop-blur-sm cursor-pointer px-6"
              onClick={() => setEasterEgg(null)}
              role="button"
              aria-label="Dismiss"
            >
              <button
                type="button"
                onClick={() => setEasterEgg(null)}
                className="absolute top-6 right-6 size-12 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-3xl"
                aria-label="Close"
              >
                ×
              </button>
              <p className="mono text-2xl sm:text-4xl italic text-accent text-center max-w-3xl">
                {easterEgg}
              </p>
            </div>
          )}
          <nav className="mt-6 -mb-px flex items-center gap-0 overflow-x-auto">
            {NAV.map((item) => {
              const baseCls =
                "mono text-xs px-3 py-2.5 border-b transition-colors whitespace-nowrap";
              if (item.kind === "route") {
                const active =
                  item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    href={item.to}
                    className={`${baseCls} ${
                      active
                        ? "text-foreground border-foreground"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  onClick={(e) => {
                    if (item.easterEgg) {
                      e.preventDefault();
                      setEasterEgg(easterEgg ? null : item.easterEgg);
                    } else {
                      setEasterEgg(null);
                    }
                  }}
                  className={`${baseCls} text-muted-foreground border-transparent hover:text-foreground hover:border-border`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-16">
          {children}
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8 flex items-center justify-between">
          <p className="mono text-xs text-muted-foreground">
            © 2026 — built quietly
          </p>
          <p className="mono text-xs text-muted-foreground">
            v0.4.2 · last deploy 2d ago
          </p>
        </div>
      </footer>

      <TelegramBubble />
    </div>
  );
}

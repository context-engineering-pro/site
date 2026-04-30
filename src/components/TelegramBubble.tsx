"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const TG_URL = "https://t.me/ThisIsMyPitch";

export function TelegramBubble() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      } ${scrolled ? "max-w-[280px]" : "max-w-[340px]"}`}
      role="complementary"
      aria-label="Telegram group invite"
    >
      <div className={`flex items-end transition-all duration-500 ease-out ${scrolled ? "gap-2" : "gap-3"}`}>
        <Image
          src="/chris-profile.png"
          alt=""
          width={56}
          height={56}
          aria-hidden
          className={`shrink-0 rounded-full object-cover transition-all duration-500 ease-out ${
            scrolled ? "!w-8 !h-8" : "!w-14 !h-14"
          }`}
        />
        <div className="relative">
          <div className={`bg-card border border-border rounded-2xl rounded-bl-sm shadow-lg transition-all duration-500 ease-out ${
            scrolled ? "p-3 pr-8" : "p-4 pr-10"
          }`}>
            <p className={`mono text-muted-foreground mb-1 transition-all duration-500 ${
              scrolled ? "text-[10px]" : "text-xs"
            }`}>Chris · {time}</p>
            <p className={`leading-snug transition-all duration-500 ${
              scrolled ? "text-sm" : "text-base"
            }`}>
              hey — building in public over here.{" "}
              <a
                href={TG_URL}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline underline-offset-2 hover:no-underline font-medium"
              >
                join the Telegram group →
              </a>
            </p>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className={`absolute grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-xs ${
                scrolled ? "top-1.5 right-1.5 size-5" : "top-2 right-2 size-6"
              }`}
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

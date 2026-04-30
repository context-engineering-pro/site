"use client";

import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import initialBookmarksData from "@/data/bookmarks.json";
import type { Metadata } from "next";

const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  automation: { label: "Automation", color: "bg-rose-500/10 text-rose-400 border-rose-500/20", icon: "⚡" },
  docs: { label: "Docs & Guides", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", icon: "📖" },
  ai: { label: "AI & ML", color: "bg-purple-500/10 text-purple-400 border-purple-500/20", icon: "🤖" },
  agents: { label: "AI Agents", color: "bg-violet-500/10 text-violet-400 border-violet-500/20", icon: "🧠" },
  code: { label: "Code", color: "bg-green-500/10 text-green-400 border-green-500/20", icon: "💻" },
  devtools: { label: "Dev Tools", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: "🛠" },
  analytics: { label: "Analytics", color: "bg-teal-500/10 text-teal-400 border-teal-500/20", icon: "📊" },
  crypto: { label: "Crypto & Web3", color: "bg-orange-500/10 text-orange-400 border-orange-500/20", icon: "₿" },
  vc: { label: "VCs", color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: "🏦" },
  finance: { label: "Finance", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", icon: "💰" },
  compliance: { label: "Compliance", color: "bg-red-500/10 text-red-400 border-red-500/20", icon: "🛡️" },
  events: { label: "Events", color: "bg-pink-500/10 text-pink-400 border-pink-500/20", icon: "📅" },
  video: { label: "Video", color: "bg-red-500/10 text-red-400 border-red-500/20", icon: "▶️" },
  social: { label: "Social", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: "🐦" },
  community: { label: "Community", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", icon: "👥" },
  design: { label: "Design", color: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20", icon: "🎨" },
  lifestyle: { label: "Lifestyle", color: "bg-stone-500/10 text-stone-400 border-stone-500/20", icon: "🏠" },
  shopping: { label: "Shopping", color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: "🛒" },
  google: { label: "Google", color: "bg-sky-500/10 text-sky-400 border-sky-500/20", icon: "🔍" },
  reference: { label: "Reference", color: "bg-slate-500/10 text-slate-400 border-slate-500/20", icon: "📚" },
  coolstuff: { label: "Cool Stuff", color: "bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-400 border-pink-500/20", icon: "✨" },
  other: { label: "Other", color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20", icon: "📎" },
};

const FEEDS = [
  { name: "Simon Willison", url: "https://simonwillison.net/atom/everything/" },
  { name: "Hamel Husain", url: "https://hamel.dev/index.xml" },
  { name: "Eugene Yan", url: "https://eugeneyan.com/rss/" },
  { name: "Lilian Weng (Lil'Log)", url: "https://lilianweng.github.io/index.xml" },
  { name: "Anthropic Engineering", url: "https://www.anthropic.com/engineering/rss.xml" },
  { name: "Latent Space", url: "https://www.latent.space/feed" },
];

type BookmarkItem = { title: string; url: string };

export default function BookmarksPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [data] = useState<Record<string, BookmarkItem[]>>(initialBookmarksData as Record<string, BookmarkItem[]>);

  const totalCount = Object.values(data).reduce((acc, items) => acc + items.length, 0);

  const categories = Object.keys(data).sort((a, b) => {
    const order = ["automation", "docs", "ai", "agents", "analytics", "proyt", "crypto", "vc", "compliance", "finance", "code", "devtools", "events", "video", "social", "community", "design", "lifestyle", "shopping", "google", "reference", "coolstuff", "other"];
    return order.indexOf(a) - order.indexOf(b);
  });

  const filteredData = categories.reduce((acc, cat) => {
    const items = data[cat]?.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
    if (items.length > 0 && (activeCategory === null || activeCategory === cat)) {
      acc[cat] = items;
    }
    return acc;
  }, {} as Record<string, BookmarkItem[]>);

  const filteredCount = Object.values(filteredData).reduce((acc, items) => acc + items.length, 0);

  return (
    <div>
      <PageHeader
        index="03 — Bookmarks"
        title="My digital collection."
        description="Links, tools, and resources I've collected. Organized from browser chaos into something useful."
        count={`${totalCount} links · ${FEEDS.length} feeds`}
      />

      {/* Search & Filter */}
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeCategory === null
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-muted/50 text-muted-foreground border-border hover:border-accent/50"
            }`}
          >
            All ({totalCount})
          </button>
          {categories.map((cat) => {
            const config = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG.other;
            const count = data[cat]?.length || 0;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  activeCategory === cat
                    ? config.color + " border-current"
                    : "bg-muted/50 text-muted-foreground border-border hover:border-accent/50"
                }`}
              >
                {config.icon} {config.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookmarks Grid */}
      <section className="mb-16">
        {searchQuery && (
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredCount} result{filteredCount !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
          </p>
        )}
        
        {Object.keys(filteredData).length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No bookmarks found matching your search.
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(filteredData).map(([cat, items]) => {
              const config = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG.other;
              return (
                <div key={cat}>
                  <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
                    <span className={`px-2 py-0.5 rounded text-xs ${config.color}`}>
                      {config.icon} {config.label}
                    </span>
                    <span className="text-muted-foreground">({items.length})</span>
                  </h3>
                  <div className="grid gap-px bg-border border border-border rounded-lg overflow-hidden">
                    {items.map((item, i) => (
                      <div
                        key={i}
                        className="bg-background px-4 py-3 hover:bg-muted/50 transition-colors group grid grid-cols-[1fr_auto] items-center gap-4"
                      >
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="min-w-0 overflow-hidden"
                        >
                          <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                            {item.title}
                          </p>
                          <p className="mono text-xs text-muted-foreground truncate mt-0.5">
                            {new URL(item.url).hostname.replace('www.', '')}
                          </p>
                        </a>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground group-hover:text-accent transition-colors"
                          >
                            ↗
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* RSS Feeds */}
      <section>
        <h2 className="label mb-4">RSS feeds I subscribe to</h2>
        <div className="grid sm:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {FEEDS.map((f, i) => (
            <a
              key={i}
              href={f.url}
              target="_blank"
              rel="noreferrer"
              className="bg-background p-4 hover:bg-muted/50 transition-colors group flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium">{f.name}</p>
                <p className="mono text-xs text-muted-foreground mt-0.5 truncate">{f.url}</p>
              </div>
              <span className="mono text-xs text-muted-foreground group-hover:text-accent transition-colors">RSS</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

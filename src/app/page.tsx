import Link from "next/link";
import Image from "next/image";
import { getVideos } from "@/lib/brain/videos";
import { TranscriptBadge } from "@/components/TranscriptBadge";
import { getBooks } from "@/lib/books";
import bookmarksData from "@/data/bookmarks.json";

type BookmarkItem = { title: string; url: string };
const allBookmarks = bookmarksData as Record<string, BookmarkItem[]>;
const coolStuff = allBookmarks.coolstuff || [];
const featuredBookmarks = coolStuff.length > 0 
  ? coolStuff 
  : [
      ...(allBookmarks.automation || []).slice(0, 2),
      ...(allBookmarks.ai || []).slice(0, 2),
      ...(allBookmarks.agents || []).slice(0, 2),
    ];

const TEAMS = [
  { name: "Deutsche Bank", logo: "/logos/deutsche-bank.jpeg" },
  { name: "Arabesque", logo: "/logos/arabesque.jpeg" },
  { name: "Virgin Media", logo: "/logos/virgin-media.jpeg" },
  { name: "Ten Lifestyle Group", logo: "/logos/ten.jpeg" },
  { name: "HMCTS — gov.uk", logo: "/logos/hmcts.jpeg" },
  { name: "Black Swan Data", logo: "/logos/black-swan-data.jpeg" },
] as const;

const RECENT = [
  { date: "2024", kind: "ship", text: "Frontr — AI-powered automation workflows & agentic systems for fintech", to: "/work" },
  { date: "2021", kind: "ship", text: "SingularityDAO — DeFi hub for the SingularityNET ecosystem, powering a decentralised AI network with AI services, governance, and token staking", to: "/work" },
  { date: "2020", kind: "ship", text: "Deutsche Bank — regulatory, compliance & anti-fraud platform", to: "/work" },
  { date: "2019", kind: "ship", text: "DXC Technology — AI-powered insurance broker management platform detecting policy risk across 15 years", to: "/work" },
  { date: "2018", kind: "ship", text: "Black Swan Data — in-flight MVP payments platform for airline passengers", to: "/work" },
  { date: "2018", kind: "ship", text: "GOV.UK Design System — core contributions across all gov.uk services", to: "/work" },
  { date: "2018", kind: "ship", text: "BlockEx — white-label exchange and bonds trading platform shipped from scratch", to: "/work" },
  { date: "2016", kind: "ship", text: "Edenred — Head of Frontend / Payments for a 60M-user global services platform", to: "/work" },
] as const;

const STRENGTHS = [
  { tag: "01", title: "Crypto trading", body: "USDT/USDC perpetuals and spot." },
  { tag: "02", title: "Options pricing & Greeks", body: "Delta, gamma, theta, vega. Black-Scholes, implied vol surfaces, put-call parity." },
  { tag: "03", title: "Risk management", body: "VaR, scenario & stress testing, position sizing, initial vs maintenance margin, liquidation mechanics." },
  { tag: "04", title: "Market microstructure", body: "CLOB, matching engines, mark vs index price, funding cycles, cross vs portfolio margin." },
  { tag: "05", title: "Quant tooling", body: "Python (pandas, numpy, SciPy), WebSocket/REST market-data pipelines, backtesting frameworks." },
  { tag: "06", title: "Dealing desk workflow", body: "RFQ / block trade mechanics, multi-leg execution, hedge rebalancing, P&L attribution." },
  { tag: "07", title: "Compliance & controls", body: "MAR, market-abuse surveillance, MiFID-adjacent, KYC/AML awareness from regulated-bank exposure." },
  { tag: "08", title: "Payments & banking rails", body: "Payment rail setup, cross-border flows, crypto-acceptance regulation, banking-rail compliance." },
  { tag: "09", title: "AI workflows & automation", body: "Automating ops with LLMs and agentic pipelines — orchestration, tool use, eval loops." },
] as const;

export default async function Home() {
  const books = await getBooks();
  const videos = getVideos();

  return (
    <div>
      {/* Hero */}
      <section className="mb-16">
        <p className="label mb-6">00 — Index</p>
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight leading-[1.02] max-w-3xl">
          Agentic systems execute.<br />
          <span className="text-muted-foreground">Humans decide what matters.</span>
        </h1>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 mono text-xs text-muted-foreground">
          <span>London, UK</span>
          <span className="signal-dot" />
          <span>available</span>
          <span className="signal-dot" />
          <a
            href="https://calendar.app.google/Fc7Kbm3jeQH2a9FR9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors"
          >
            Book a call →
          </a>
        </div>
      </section>

      {/* Core strengths */}
      <section className="mb-20">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="label">Core strengths</h2>
          <span className="label">{STRENGTHS.length} areas</span>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {STRENGTHS.map((s) => (
            <li
              key={s.tag}
              className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[2.5rem_14rem_1fr] items-baseline gap-x-6 gap-y-1 py-4 px-1"
            >
              <span className="mono text-xs text-muted-foreground tabular-nums">{s.tag}</span>
              <h3 className="text-sm font-medium tracking-tight">{s.title}</h3>
              <p className="col-start-2 sm:col-start-3 text-sm text-muted-foreground leading-relaxed">
                {s.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Streams */}
      <section className="mb-20">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="label">Streams</h2>
          <span className="label">{videos.length} videos · indexed in brain</span>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {videos.slice(0, 5).map((v) => (
            <li key={v.id}>
              <Link
                href={`/streams/${v.id}`}
                className="group flex items-baseline gap-4 py-3 hover:bg-muted/40 transition-colors px-1"
              >
                <span className="mono text-xs text-muted-foreground tabular-nums w-20 shrink-0">{v.date}</span>
                <span className="flex-1 truncate group-hover:text-accent transition-colors">{v.title}</span>
                <span className="mono text-xs text-muted-foreground hidden sm:inline">{v.duration}</span>
                <TranscriptBadge status={v.status} />
                <span className="row-arrow">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Reading */}
      <section className="mb-20">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="label">Books I suggest reading</h2>
          <a
            href="https://www.goodreads.com/user/show/200694449"
            target="_blank"
            rel="noreferrer"
            className="label hover:text-foreground transition-colors"
          >
            {books.length > 0 ? `Last ${books.length} on Goodreads ↗` : "Goodreads ↗"}
          </a>
        </div>
        {books.length > 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-border border border-border">
            {books.map((b) => (
              <li key={b.link} className="bg-background">
                <a
                  href={b.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col h-full p-3 hover:bg-muted/40 transition-colors"
                  title={`${b.title} — ${b.author}`}
                >
                  {b.cover ? (
                    <img
                      src={b.cover}
                      alt={b.title}
                      loading="lazy"
                      className="w-full aspect-[2/3] object-cover bg-muted mb-3"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] bg-muted mb-3" />
                  )}
                  <p className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-accent transition-colors">
                    {b.title}
                  </p>
                  <p className="mono text-xs text-muted-foreground mt-1 truncate">{b.author}</p>
                  <div className="mt-auto pt-2 flex items-center justify-between mono text-xs text-muted-foreground">
                    <span>{b.rating > 0 ? "★".repeat(b.rating) + "☆".repeat(5 - b.rating) : "—"}</span>
                    <span>{b.dateAdded}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Shelf is loading or empty — check back soon.</p>
        )}
      </section>

      {/* Featured Bookmarks */}
      {featuredBookmarks.length > 0 && (
        <section className="mb-20">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="label">{coolStuff.length > 0 ? "✨ Cool Stuff" : "My digital collection"}</h2>
            <Link href="/bookmarks" className="label hover:text-foreground transition-colors">
              See all bookmarks →
            </Link>
          </div>
          <div className="grid gap-px bg-border border border-border rounded-lg overflow-hidden">
            {featuredBookmarks.slice(0, 6).map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="bg-background px-4 py-3 hover:bg-muted/50 transition-colors group flex items-center justify-between gap-4"
              >
                <div className="min-w-0 overflow-hidden">
                  <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                    {item.title}
                  </p>
                  <p className="mono text-xs text-muted-foreground truncate mt-0.5">
                    {new URL(item.url).hostname.replace('www.', '')}
                  </p>
                </div>
                <span className="text-muted-foreground group-hover:text-accent transition-colors shrink-0">↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Recent */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="label">Recent</h2>
          <span className="label">{RECENT.length} entries</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-24">Date</th>
              <th className="w-24">Kind</th>
              <th>Entry</th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {RECENT.map((r, i) => (
              <tr key={i}>
                <td className="mono text-xs text-muted-foreground">{r.date}</td>
                <td className="mono text-xs"><span className="px-1.5 py-0.5 bg-muted rounded-sm">{r.kind}</span></td>
                <td>
                  <Link href={r.to} className="hover:text-accent transition-colors">{r.text}</Link>
                </td>
                <td><span className="row-arrow">→</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Teams */}
      <section className="mt-20">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="label">Teams I&apos;ve worked with</h2>
          <span className="label">{TEAMS.length} & counting</span>
        </div>
        <div className="relative overflow-hidden border border-border bg-background group">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[...TEAMS, ...TEAMS].map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="shrink-0 size-32 grid place-items-center p-5 border-r border-border"
                title={t.name}
              >
                <Image
                  src={t.logo}
                  alt={t.name}
                  width={88}
                  height={88}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
        </div>
      </section>
    </div>
  );
}

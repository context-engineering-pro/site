"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";

const TOOLS = [
  { name: "get_bio", desc: "Identity card — name, title, location, current focus." },
  { name: "search_brain", desc: "Free-text search across work, research, opinions, bookmarks." },
  { name: "get_opinions", desc: "Working opinions / takes. Filter by topic." },
  { name: "get_work", desc: "Projects shipped. Filter by status." },
  { name: "get_research_links", desc: "Annotated papers, repos, posts. Filter by type." },
  { name: "get_bookmarks", desc: "Curated reading list." },
];

function CopyBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="border border-border">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted">
        <span className="mono text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          className="mono text-xs text-muted-foreground hover:text-accent transition-colors"
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre className="p-4 mono text-xs overflow-x-auto leading-relaxed">{code}</pre>
    </div>
  );
}

export default function BrainPage() {
  const mcpUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/mcp`
      : "https://christarasovs.com/api/mcp";

  const claudeConfig = JSON.stringify(
    {
      mcpServers: {
        "chris-brain": {
          url: mcpUrl,
        },
      },
    },
    null,
    2,
  );

  const cursorConfig = JSON.stringify(
    {
      mcpServers: {
        "chris-brain": {
          url: mcpUrl,
        },
      },
    },
    null,
    2,
  );

  return (
    <div>
      <PageHeader
        index="07 — Brain"
        title="A clone of my brain, exposed as an MCP server."
        description="Connect this server to Claude, Cursor, or any MCP-aware client. Your assistant can then ask my work, opinions, research, and bookmarks directly — and quote me back to me."
        count={`${TOOLS.length} tools`}
      />

      <section className="mb-12">
        <h2 className="label mb-3">Endpoint</h2>
        <CopyBlock label="MCP URL" code={mcpUrl} />
      </section>

      <section className="mb-12">
        <h2 className="label mb-3">Tools exposed</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-56">Tool</th>
              <th>What it does</th>
            </tr>
          </thead>
          <tbody>
            {TOOLS.map((t) => (
              <tr key={t.name}>
                <td className="mono text-sm">{t.name}</td>
                <td className="text-sm text-muted-foreground">{t.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-12 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="label mb-3">Claude Desktop</h2>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Add to <span className="mono text-xs">~/Library/Application Support/Claude/claude_desktop_config.json</span> then restart.
          </p>
          <CopyBlock label="claude_desktop_config.json" code={claudeConfig} />
        </div>
        <div>
          <h2 className="label mb-3">Cursor</h2>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Settings → MCP → Add Server. Or paste into <span className="mono text-xs">~/.cursor/mcp.json</span>.
          </p>
          <CopyBlock label="mcp.json" code={cursorConfig} />
        </div>
      </section>

      <section>
        <h2 className="label mb-3">Try asking</h2>
        <ul className="divide-y divide-border border-y border-border">
          {[
            "What does Chris think about agent memory?",
            "Show me Chris's opinions on evals.",
            "What papers has Chris annotated about MCP?",
            "List Chris's live projects.",
            "Search Chris's brain for 'provenance'.",
          ].map((q, i) => (
            <li key={i} className="py-3 mono text-sm text-muted-foreground">
              <span className="text-accent mr-3">→</span>
              {q}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

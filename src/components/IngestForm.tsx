"use client";

import { useState } from "react";
import { ingestVideo } from "@/lib/brain/videos";

export function IngestForm() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await ingestVideo(url.trim());
      setMsg({ ok: res.ok, text: res.message });
      if (res.ok) setUrl("");
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Ingest failed." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-border">
      <div className="px-4 py-2 border-b border-border bg-muted flex items-center justify-between">
        <span className="mono text-xs uppercase tracking-wider text-muted-foreground">
          Ingest video → brain
        </span>
        <span className="mono text-xs text-muted-foreground">paste a YouTube URL</span>
      </div>
      <div className="flex items-stretch">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="flex-1 px-4 py-3 bg-transparent mono text-sm focus:outline-none placeholder:text-muted-foreground/60"
          disabled={busy}
        />
        <button
          type="submit"
          disabled={busy || !url.trim()}
          className="mono text-xs uppercase tracking-wider px-5 border-l border-border hover:bg-muted hover:text-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {busy ? "queuing…" : "ingest →"}
        </button>
      </div>
      {msg && (
        <div
          className={`px-4 py-2 border-t border-border mono text-xs ${
            msg.ok ? "text-accent" : "text-destructive"
          }`}
        >
          {msg.ok ? "✓ " : "✗ "}
          {msg.text}
        </div>
      )}
    </form>
  );
}

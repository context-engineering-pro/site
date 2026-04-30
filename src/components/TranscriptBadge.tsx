import type { TranscriptStatus } from "@/lib/brain/videos";

const LABEL: Record<TranscriptStatus, string> = {
  transcribed: "in brain",
  pending: "pending",
  failed: "failed",
  none: "not transcribed",
};

export function TranscriptBadge({ status }: { status: TranscriptStatus }) {
  const isLive = status === "transcribed";
  const isWarn = status === "failed";

  return (
    <span className="mono text-xs inline-flex items-center gap-1.5">
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full ${
          isLive
            ? "bg-signal"
            : isWarn
              ? "bg-destructive"
              : "bg-muted-foreground/40"
        } ${status === "pending" ? "animate-pulse" : ""}`}
      />
      <span className={isLive ? "" : "text-muted-foreground"}>{LABEL[status]}</span>
    </span>
  );
}

export type TranscriptStatus = "transcribed" | "pending" | "failed" | "none";

export type TranscriptSegment = {
  start: number;
  end: number;
  text: string;
};

export type Video = {
  id: string;
  title: string;
  date: string;
  duration: string;
  platform: "YouTube" | "Twitch";
  url: string;
  status: TranscriptStatus;
  summary?: string;
  segments?: TranscriptSegment[];
};

export const VIDEOS: Video[] = [
  {
    id: "vid_loop_mcp",
    title: "Building a multi-agent code reviewer with MCP",
    date: "2026.04.18",
    duration: "1h 42m",
    platform: "YouTube",
    url: "https://youtube.com/watch?v=vid_loop_mcp",
    status: "pending",
    summary:
      "Walks through wiring three specialized agents (linter, security, style) behind a single MCP server. Discusses fan-out, conflict resolution, and why most multi-agent setups should be sequential workflows.",
    segments: [
      { start: 0, end: 32, text: "Today we're going to build a code reviewer that's actually three agents pretending to be one. The trick is the MCP layer in front." },
      { start: 32, end: 78, text: "I want to be careful here — most things people call multi-agent should really be a workflow. Agents are for problems where you genuinely cannot enumerate the steps." },
      { start: 78, end: 134, text: "So we have the linter agent, the security agent, and the style agent. Each one gets a narrow tool surface. That's the whole bet." },
      { start: 134, end: 210, text: "When you give an agent fewer tools, it gets dramatically more reliable. People underweight this. A tool that returns 5kB of well-shaped JSON beats 50kB of HTML every time." },
      { start: 210, end: 280, text: "Now for memory — this reviewer needs to remember decisions across files in the same PR. We're using Anchor for that, with provenance tags so we know which agent said what." },
    ],
  },
  {
    id: "vid_evals_live",
    title: "Eval-driven development: 200 cases before every prompt change",
    date: "2026.04.04",
    duration: "2h 11m",
    platform: "YouTube",
    url: "https://youtube.com/watch?v=vid_evals_live",
    status: "pending",
    summary:
      "Live coding session showing how to set up a fast eval harness with Loop. Argues that if your eval suite takes longer than 10 minutes, you won't run it.",
    segments: [
      { start: 0, end: 45, text: "If you can't run your eval suite in under 10 minutes, you won't run it. Speed is a feature. That's the thesis for today." },
      { start: 45, end: 120, text: "We're going to build a 200-case regression suite for a prompt that summarizes meeting notes. Each case has an input, an expected behavior, and a grader." },
      { start: 120, end: 200, text: "The grader is itself an LLM call, which feels recursive but works. The trick is grading for behaviors, not exact strings." },
      { start: 200, end: 290, text: "I keep saying this but: treat prompts like code. Version them, diff them, regression-test them. Ad-hoc edits are how products regress quietly." },
    ],
  },
  {
    id: "vid_reflexion",
    title: "Reading the Reflexion paper aloud, with annotations",
    date: "2026.03.21",
    duration: "58m",
    platform: "Twitch",
    url: "https://twitch.tv/videos/vid_reflexion",
    status: "pending",
    summary: "Page-by-page reading of Shinn et al. 2023, with running commentary on what holds up and what doesn't in 2026.",
  },
  {
    id: "vid_office_hours_14",
    title: "Office hours #14 — agent memory architectures",
    date: "2026.03.07",
    duration: "1h 30m",
    platform: "YouTube",
    url: "https://youtube.com/watch?v=vid_office_hours_14",
    status: "pending",
  },
  {
    id: "vid_sketch_build",
    title: "Building Sketch in one sitting (terminal → agent)",
    date: "2026.02.22",
    duration: "3h 04m",
    platform: "YouTube",
    url: "https://youtube.com/watch?v=vid_sketch_build",
    status: "pending",
    summary: "Single-session build of Sketch, a tool that watches your shell history and proposes agents to automate repeated patterns.",
  },
  {
    id: "vid_failure_modes",
    title: "Talk: failure modes in long-running agent loops",
    date: "2026.02.08",
    duration: "47m",
    platform: "YouTube",
    url: "https://youtube.com/watch?v=vid_failure_modes",
    status: "pending",
  },
];

export function getVideos(): Video[] {
  return VIDEOS;
}

export function getVideoById(id: string): Video | undefined {
  return VIDEOS.find((v) => v.id === id);
}

export async function ingestVideo(_url: string): Promise<{ ok: boolean; message: string }> {
  await new Promise((r) => setTimeout(r, 800));
  return {
    ok: true,
    message: "Queued for transcription. (UI stub — wire to backend.)",
  };
}

export function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

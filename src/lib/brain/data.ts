export const BIO = {
  name: "Chris",
  title: "Builder of agentic systems & quiet AI infrastructure",
  location: "London, UK",
  email: "me@christarasovs.com",
  status: "Open to research collabs & advisory",
  oneLiner:
    "I build agents that actually work in production, and the eval / memory / tooling infrastructure that keeps them honest.",
};

export type WorkItem = {
  year: string;
  name: string;
  role: string;
  status: "live" | "ongoing" | "complete" | "archived";
  link: string | null;
  summary?: string;
};

export const WORK: WorkItem[] = [
  { year: "2026", name: "Loop — agent eval harness", role: "Solo, OSS", status: "live", link: "https://example.com", summary: "Deterministic eval harness for tool-using agents. Replays runs byte-for-byte." },
  { year: "2026", name: "MCP Inspector for VS Code", role: "Maintainer", status: "live", link: "https://example.com", summary: "Inspect, debug, and replay MCP tool calls from inside the editor." },
  { year: "2025", name: "Anchor — long-term memory for agents", role: "Co-founder", status: "live", link: "https://example.com", summary: "Memory store with provenance baked in. Every fact knows where it came from." },
  { year: "2025", name: "Reasoning trace visualizer", role: "Solo", status: "ongoing", link: "https://example.com", summary: "Render agent reasoning as a navigable graph." },
  { year: "2024", name: "Synth Labs — RAG eval consultancy", role: "Founding engineer", status: "live", link: "https://example.com" },
  { year: "2024", name: "Tool-calling benchmarks (open dataset)", role: "Author", status: "complete", link: "https://example.com" },
  { year: "2023", name: "PromptKit", role: "Engineer", status: "archived", link: null },
  { year: "2023", name: "AI safety reading group — DeepMind", role: "Co-organizer", status: "complete", link: null },
  { year: "2022", name: "Vector DB latency study", role: "Researcher", status: "complete", link: "https://example.com" },
];

export type ResearchLink = {
  date: string;
  type: "paper" | "repo" | "post" | "talk" | "thread" | "doc";
  source: string;
  title: string;
  url: string;
  take: string;
};

export const RESEARCH_LINKS: ResearchLink[] = [
  { date: "2026.04.22", type: "repo", source: "modelcontextprotocol/servers", title: "Reference MCP servers — fs, git, postgres, slack", url: "https://github.com/modelcontextprotocol/servers", take: "The fs + git servers are the cleanest examples to crib from when writing your own." },
  { date: "2026.04.18", type: "paper", source: "arXiv 2310.06770", title: "SWE-bench: Can language models resolve real-world GitHub issues?", url: "https://arxiv.org/abs/2310.06770", take: "Still the most honest benchmark for coding agents. Numbers are humbling on purpose." },
  { date: "2026.04.10", type: "post", source: "anthropic.com/engineering", title: "Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", take: "The 'workflows vs agents' framing is the one thing I wish every PM read before scoping." },
  { date: "2026.03.28", type: "repo", source: "stanfordnlp/dspy", title: "DSPy — programming, not prompting", url: "https://github.com/stanfordnlp/dspy", take: "The right level of abstraction for prompt-as-code. Eval loop is the killer feature." },
  { date: "2026.03.14", type: "paper", source: "arXiv 2303.11366", title: "Reflexion: language agents with verbal reinforcement learning", url: "https://arxiv.org/abs/2303.11366", take: "Self-critique transcripts beat fine-tuning for short loops. Useful in narrow domains." },
  { date: "2026.03.02", type: "thread", source: "Simon Willison", title: "The lethal trifecta for AI agents", url: "https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/", take: "Untrusted input + private data + external comms = leak. I quote this in every threat model." },
  { date: "2026.02.20", type: "doc", source: "modelcontextprotocol.io", title: "MCP specification", url: "https://modelcontextprotocol.io", take: "Read it twice. The transport layer matters more than people think." },
];

export type Opinion = { topic: string; statement: string };

export const OPINIONS: Opinion[] = [
  { topic: "On agents", statement: "Most 'agents' should be workflows. Agents are for problems where you genuinely cannot enumerate the steps." },
  { topic: "On evals", statement: "If you can't run your eval suite in under 10 minutes, you won't run it. Speed is a feature." },
  { topic: "On memory", statement: "Long-term agent memory without provenance is a liability. Every fact should know where it came from." },
  { topic: "On prompts", statement: "Treat prompts like code: version them, diff them, regression-test them. Ad-hoc edits are how products regress quietly." },
  { topic: "On tools", statement: "A tool that returns 5kB of well-shaped JSON beats a tool that returns 50kB of HTML every time. Curate the surface." },
  { topic: "On safety", statement: "Capability and trust should be separate axes. A powerful model with a small toolset is usually the right answer." },
  { topic: "On taste", statement: "Good agent UX feels like the model is reading your intent, not your text. The trick is mostly in the silences." },
  { topic: "On career", statement: "I'd rather work on a small system used carefully than a large one used widely. So far this has been a luxury." },
  { topic: "On stack", statement: "TypeScript for product surfaces, Python for evals and notebooks, Rust when latency actually matters. No religion beyond that." },
  { topic: "On reading", statement: "Two papers a week, both annotated by hand. Anything I can't summarize in three sentences I haven't really read." },
];

export const BOOKMARKS = [
  { cat: "essay", source: "Anthropic", title: "Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents" },
  { cat: "essay", source: "Simon Willison", title: "The lethal trifecta for AI agents", url: "https://simonwillison.net" },
  { cat: "paper", source: "Shinn et al.", title: "Reflexion: language agents with verbal reinforcement learning", url: "https://arxiv.org/abs/2303.11366" },
  { cat: "paper", source: "Wang et al.", title: "Voyager: an open-ended embodied agent with LLMs", url: "https://arxiv.org/abs/2305.16291" },
  { cat: "essay", source: "Hamel Husain", title: "Your AI product needs evals", url: "https://hamel.dev/blog/posts/evals/" },
  { cat: "spec", source: "Anthropic", title: "Model Context Protocol", url: "https://modelcontextprotocol.io" },
  { cat: "essay", source: "Eugene Yan", title: "Patterns for building LLM systems & products", url: "https://eugeneyan.com" },
];

export type SearchHit = {
  source: "work" | "research" | "opinion" | "bookmark";
  text: string;
  url?: string;
  meta?: Record<string, string>;
};

export function searchBrain(query: string, limit = 10): SearchHit[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const hits: SearchHit[] = [];

  for (const w of WORK) {
    const blob = `${w.name} ${w.role} ${w.summary ?? ""}`.toLowerCase();
    if (blob.includes(q)) {
      hits.push({
        source: "work",
        text: `${w.name} (${w.year}, ${w.role}) — ${w.summary ?? w.status}`,
        url: w.link ?? undefined,
        meta: { year: w.year, status: w.status },
      });
    }
  }
  for (const r of RESEARCH_LINKS) {
    const blob = `${r.title} ${r.source} ${r.take}`.toLowerCase();
    if (blob.includes(q)) {
      hits.push({
        source: "research",
        text: `[${r.type}] ${r.title} — ${r.take}`,
        url: r.url,
        meta: { date: r.date, type: r.type },
      });
    }
  }
  for (const o of OPINIONS) {
    const blob = `${o.topic} ${o.statement}`.toLowerCase();
    if (blob.includes(q)) {
      hits.push({
        source: "opinion",
        text: `${o.topic}: ${o.statement}`,
      });
    }
  }
  for (const b of BOOKMARKS) {
    const blob = `${b.title} ${b.source} ${b.cat}`.toLowerCase();
    if (blob.includes(q)) {
      hits.push({
        source: "bookmark",
        text: `[${b.cat}] ${b.title} — ${b.source}`,
        url: b.url,
      });
    }
  }
  return hits.slice(0, limit);
}

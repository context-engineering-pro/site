import { PageHeader } from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Chris Tarasovs",
  description: "Products, projects, and collaborations across fintech, AI, and government.",
};

const WORK = [
  { year: "2024", name: "Frontr", role: "AI-powered automation workflows, agentic systems, and engineering leadership for fintech clients.", status: "live", link: null },
  { year: "2021", name: "SingularityDAO", role: "DeFi hub for the SingularityNET ecosystem — powers a decentralised AI network where users access AI services, vote on governance, and stake tokens to secure the network.", status: "live", link: null },
  { year: "2020", name: "Deutsche Bank", role: "Regulatory, compliance & anti-fraud platform — internal component library and microservices.", status: "complete", link: null },
  { year: "2019", name: "DXC Technology", role: "Built one of the largest AI-powered insurance broker management platforms, capable of detecting whether any insurance policies written within the last 15 years pose potential risk to the business.", status: "complete", link: null },
  { year: "2018", name: "Black Swan Data", role: "Built an in-flight MVP payments platform for airlines, enabling passengers to make retail purchases during flight. MVP product to showcase how we can take payments during flight — on completion handed over to internal teams.", status: "complete", link: null },
  { year: "2018", name: "GOV.UK Design System", role: "Core contributions to the UK Government's design system, integrated across all gov.uk services.", status: "live", link: null },
  { year: "2018", name: "BlockEx", role: "Built and shipped a white-label exchange platform and a bonds trading platform from the ground up.", status: "complete", link: null },
  { year: "2016", name: "Edenred", role: "Head of Frontend / Payments. Leading global digital platform for services and payments, acting as an everyday companion for people at work by connecting over 60 million users.", status: "complete", link: null },
] as const;

function StatusPill({ status }: { status: string }) {
  const isLive = status === "live" || status === "ongoing";
  return (
    <span className="mono text-xs inline-flex items-center gap-1.5">
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full ${
          isLive ? "bg-signal" : "bg-muted-foreground/40"
        }`}
      />
      {status}
    </span>
  );
}

export default function WorkPage() {
  return (
    <div>
      <PageHeader
        index="01 — Work"
        title="Tools, libraries, and research on agents that actually work in production."
        description="A mix of OSS, consulting engagements, and applied research. Most things here touch evals, memory, or tool use."
        count={`${WORK.length} entries`}
      />

      <table className="data-table">
        <thead>
          <tr>
            <th className="w-20">Year</th>
            <th>Project</th>
            <th className="w-40">Role</th>
            <th className="w-32">Status</th>
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          {WORK.map((w, i) => (
            <tr key={i}>
              <td className="mono text-xs text-muted-foreground">{w.year}</td>
              <td>
                {w.link ? (
                  <a href={w.link} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                    {w.name}
                  </a>
                ) : (
                  <span>{w.name}</span>
                )}
              </td>
              <td className="text-muted-foreground text-sm">{w.role}</td>
              <td><StatusPill status={w.status} /></td>
              <td>{w.link && <span className="row-arrow">↗</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

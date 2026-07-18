export type Project = {
  slug: string;
  file: string;
  title: string;
  meta: string;
  summary: string;
  detail?: string;
  href?: string;
  featured: boolean;
  locked?: boolean;
  status?: string;
};

export const projects: Project[] = [
  {
    slug: "executive-agent",
    file: "FILE 01",
    title: "Executive Agent",
    meta: "Python - LLM - Agentic workflow - 2026",
    summary:
      "A personal AI chief-of-staff that turns a day's worth of scattered inputs into a prioritized plan.",
    detail:
      "An agentic assistant that reads across the messy inputs of a working day - email, calendar, notes, documents - and produces a single prioritized brief: what needs a decision, what can wait, and what to say. Built around a plan-and-review loop so the agent proposes, and a human approves, before anything leaves the room.",
    href: "https://github.com/cmd-siri-bot",
    featured: true,
  },
  {
    slug: "downloads-butler",
    file: "FILE 02",
    title: "Downloads Butler",
    meta: "PowerShell - Ollama - Open source - 2026",
    summary:
      "A human-in-the-loop AI agent that keeps a Downloads folder clean - nothing moves without sign-off.",
    detail:
      "A five-stage pipeline - scan, analyze, report, approve, execute - that inventories files with SHA-256 hashing, flags duplicates and stale installers with a deterministic rules engine plus an optional local-LLM pass, then presents an HTML approval page. Approved actions run through a quarantine system with a full restore path, so no file is ever destructively deleted. Built and adversarially tested against path-traversal and protected-file edge cases.",
    href: "https://github.com/cmd-siri-bot",
    featured: true,
  },
  {
    slug: "atip-automation",
    file: "FILE 03",
    title: "ATIP Automation",
    meta: "Python - Automation - 2026",
    summary:
      "Tooling that takes the grind out of Access to Information requests - drafting, filing, and tracking.",
    featured: true,
    locked: true,
    status: "Work in progress",
  },
  {
    slug: "toronto-open-data",
    file: "FILE 04",
    title: "City of Toronto Open Data",
    meta: "Python - Data viz - Civic tech - 2026",
    summary:
      "Pulling Toronto's open data into analyses and visuals that make a point instead of just a chart.",
    detail:
      "The City of Toronto publishes hundreds of open datasets; most sit unread. This project pulls from that portal and turns raw civic data into narratives with a thesis - mapping, comparing, and contextualizing the numbers to answer questions residents and decision-makers actually ask. The data-storytelling half of the resume, applied to the city I live in.",
    href: "https://github.com/cmd-siri-bot",
    featured: true,
  },
];

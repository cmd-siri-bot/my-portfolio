"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function HomeClient() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll(".reveal");

    if (reduced || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <nav className="site-nav">
        <div className="nav-inner">
          <a className="nav-name" href="#top">Siri Rama</a>
          <div className="nav-links">
            <a href="#projects">Projects</a>
            <a href="#resume">Resume</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="kicker eyebrow">Toronto, Canada</span>
              <h1>An economist by training, a <em>storyteller</em> by nature.</h1>
              <p className="lede">
                I&apos;m Siri Rama. I create compelling narratives backed by data — the kind that have won over voters and buying committees alike. The projects below are the other half of that craft: the automation and analysis tools I build to get from raw data to a story worth telling.
              </p>
              <div className="hero-actions">
                <a className="btn" href="mailto:iamsirir@gmail.com">Email</a>
                <a className="quiet" href="#projects">All projects ↓</a>
              </div>
            </div>
            <div className="hero-photo">
              <span className="eyebrow hero-photo-label">File 00 · Subject</span>
              <Image
                src="/profile.jpg"
                alt="Siri Rama"
                width={220}
                height={220}
                priority
                className="hero-photo-img"
              />
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="section-head reveal">
            <span className="eyebrow">File 01</span>
            <h2>The case files.</h2>
          </div>
          <p className="section-intro reveal">
            Tools I built to get from raw data to a story worth telling — agents, automation, and analysis. Each one shipped; each one taught me something the docs didn&apos;t. Live demos hang off subdomains of this site as they go up.
          </p>

          <div className="file reveal">
            <div className="file-meta">
              <span className="eyebrow">File 01</span>
              <span className="meta">Python · LLM · Agentic workflow · 2026</span>
            </div>
            <h3><a href="https://github.com/cmd-siri-bot">Executive Agent</a></h3>
            <p>
              An agentic assistant that reads across the messy inputs of a working day — email, calendar, notes, slack messages, salesforce updates, documents — and produces a single prioritized brief: what needs a decision, what can wait, and what to say. Built around a plan-and-review loop so the agent proposes, and a human approves, before anything leaves the room.
            </p>
            <a className="src" href="https://github.com/cmd-siri-bot">View source →</a>
          </div>

          <div className="file reveal">
            <div className="file-meta">
              <span className="eyebrow">File 02</span>
              <span className="meta">PowerShell · Ollama · Open source · 2026</span>
            </div>
            <h3><a href="https://github.com/cmd-siri-bot">Downloads Butler</a></h3>
            <p>
              A five-stage pipeline — scan, analyze, report, approve, execute — that inventories files with SHA-256 hashing, flags duplicates and stale installers with a deterministic rules engine plus an optional local-LLM pass, then presents an HTML approval page. Approved actions run through a quarantine system with a full restore path, so no file is ever destructively deleted. Built and adversarially tested against path-traversal and protected-file edge cases.
            </p>
            <a className="src" href="https://github.com/cmd-siri-bot">View source →</a>
          </div>

          <div className="file reveal">
            <div className="file-meta">
              <span className="eyebrow">File 03</span>
              <span className="meta">Work in progress</span>
            </div>
            <h3>ATIP Automation <span className="wip">In progress</span></h3>
            <p>Tooling that takes the grind out of Access to Information requests — drafting, filing, and tracking.</p>
            <p>This one&apos;s still under construction. <a href="mailto:iamsirir@gmail.com?subject=ATIP%20Automation">Contact me</a> for more info.</p>
          </div>

          <div className="file reveal">
            <div className="file-meta">
              <span className="eyebrow">File 04</span>
              <span className="meta">Python · Data viz · Civic tech · 2026</span>
            </div>
            <h3><a href="https://github.com/cmd-siri-bot">City of Toronto Open Data</a></h3>
            <p>
              The City of Toronto publishes hundreds of open datasets; most sit unread. This project pulls from that portal and turns raw civic data into narratives with a thesis — mapping, comparing, and contextualizing the numbers to answer questions residents and decision-makers actually ask. The data-storytelling half of the resume, applied to the city I live in.
            </p>
            <a className="src" href="https://github.com/cmd-siri-bot">View source →</a>
          </div>

          <p className="file-outro reveal">
            More experiments live on <a href="https://github.com/cmd-siri-bot">GitHub</a>, including the ones that didn&apos;t make the cut.
          </p>
        </section>

        {/* RESUME */}
        <section id="resume">
          <div className="section-head reveal">
            <span className="eyebrow">File 02</span>
            <h2>Resume</h2>
          </div>
          <p className="resume-lede reveal">
            An economist by training and a storyteller by nature. I create compelling narratives backed by data that have won over voters in Canada and buying committees in regulated industries.
          </p>
          <div className="resume-contact reveal">
            <a href="mailto:iamsirir@gmail.com">iamsirir@gmail.com</a>
            <a href="https://linkedin.com/in/sirirama">linkedin.com/in/sirirama</a>
            <span>Toronto, Canada</span>
          </div>

          <h3 className="subhead reveal">Experience</h3>

          <div className="role reveal">
            <div className="when meta">Nov 2025 — Present</div>
            <div>
              <div className="role-head">
                <Image src="/logos/tipalti.png" alt="Tipalti logo" width={40} height={40} className="role-logo" />
                <div>
                  <h4>Tipalti</h4>
                  <div className="title">Go-To-Market · Toronto, Canada</div>
                </div>
              </div>
              <p className="blurb">Tipalti is a global fintech platform automating accounts payable, payments, and compliance workflows.</p>
              <ul>
                <li>I work in sales at a hyper-growth fintech company headquartered in the Bay Area, CA.</li>
                <li>Helped build, test, and iterate AI agents for Tipalti&apos;s GTM workflow to scale prospecting and qualification.</li>
                <li>#1 rep in qualified opportunities — exceeded quota every month while maintaining an excellent prospect experience. Q2&apos;26 Rep of the Quarter.</li>
              </ul>
            </div>
          </div>

          <div className="role reveal">
            <div className="when meta">Jan 2025 — Nov 2025</div>
            <div>
              <div className="role-head">
                <Image src="/logos/delphic.png" alt="Delphic Research Group logo" width={40} height={40} className="role-logo" />
                <div>
                  <h4>Delphic Research Group</h4>
                  <div className="title">Growth and Operations · Toronto, Canada</div>
                </div>
              </div>
              <p className="blurb">Delphic is a gov-tech start-up focused on competitive intelligence and decision-support for regulated industries.</p>
              <ul>
                <li>Went from zero to one in a bootstrapped, fast-paced environment — it was my tech/start-up bootcamp.</li>
                <li>Drove early revenue growth, helping scale from $500K to $1M ARR by expanding into new, heavily regulated verticals: health and life sciences, energy and critical minerals, and defence and aerospace.</li>
                <li>Operated cross-functionally across sales, operations, and product delivery in a fast-moving environment with a small team of 5.</li>
              </ul>
            </div>
          </div>

          <div className="role reveal">
            <div className="when meta">Jan 2024 — Dec 2025</div>
            <div>
              <div className="role-head">
                <Image src="/logos/sussex.png" alt="Sussex Strategy Group logo" width={40} height={40} className="role-logo" />
                <div>
                  <h4>Sussex Strategy Group</h4>
                  <div className="title">Public Affairs Analyst · Toronto, Canada</div>
                </div>
              </div>
              <p className="blurb">Sussex is a premier public affairs firm, helping organizations navigate bureaucracy and influence public opinion.</p>
              <ul>
                <li>Lobbyist for some of the biggest, most influential organizations in Canada — the classic exit opportunity for most people leaving government.</li>
                <li>Supported engagement strategies for clients across the public, private, and non-profit sectors by mapping stakeholders, tracking legislation, and positioning clients for growth in Canada&apos;s key industries.</li>
              </ul>
            </div>
          </div>

          <div className="role reveal">
            <div className="when meta">Jun 2022 — Dec 2024</div>
            <div>
              <div className="role-head">
                <Image src="/logos/government-of-canada.png" alt="Government of Canada logo" width={40} height={40} className="role-logo" />
                <div>
                  <h4>Government of Canada</h4>
                  <div className="title">Economist and Advisor · Ottawa, Canada</div>
                </div>
              </div>
              <ul>
                <li>Campaigned in and won three back-to-back federal elections.</li>
                <li>Advised on Federal Budget and Economic Statement planning cycles — developing first-hand insight into how public-sector and regulated buyers evaluate cost, risk, and outcomes.</li>
                <li>Built and maintained quantitative models to estimate the budgetary and economic impacts of federal policy proposals, applying regression analysis, scenario modeling, and sensitivity analysis.</li>
              </ul>
            </div>
          </div>

          <h3 className="subhead reveal">Education</h3>

          <div className="edu reveal">
            <div className="when meta">MA</div>
            <div>
              <div className="edu-head">
                <Image src="/logos/queens.png" alt="Queen&apos;s University logo" width={40} height={40} className="edu-logo" />
                <h4>Queen&apos;s University</h4>
              </div>
              <p>Master of Arts (MA), Public Affairs</p>
              <p>Specialization in Public Finance</p>
            </div>
          </div>

          <div className="edu reveal">
            <div className="when meta">BA</div>
            <div>
              <div className="edu-head">
                <Image src="/logos/uoft.png" alt="University of Toronto logo" width={40} height={40} className="edu-logo" />
                <h4>University of Toronto</h4>
              </div>
              <p>Honours Bachelor of Arts (BA)</p>
              <p>Economics and Politics (International Relations)</p>
            </div>
          </div>

          <p className="resume-note reveal">
            Prefer a PDF? <a href="mailto:iamsirir@gmail.com?subject=Resume%20request"> Email me</a> and I&apos;ll send the latest version.
          </p>
        </section>

        {/* ABOUT */}
        <section id="about" className="about">
          <div className="section-head reveal">
            <span className="eyebrow">File 03</span>
            <h2>The numbers make the case. The story wins the room.</h2>
          </div>
          <p className="reveal">
            I&apos;m an economist by training and a storyteller by nature. Those usually pull in opposite directions — rigor versus persuasion — and most of my work is spent proving they don&apos;t have to.
          </p>
          <p className="reveal">
            I&apos;ve used that combination on two very different audiences: voters, where data becomes canvass strategy and a message that moves turnout; and buying committees, where the same discipline becomes a business case a room of skeptics will sign off on. Different stakes, identical method — find what the data actually says, then make people feel why it matters.
          </p>
          <p className="reveal">
            The projects on this site are the engine room behind that. When the analysis got repetitive, I automated it; when the data was locked in a portal, I wrote something to free it. Everything on the technical side is self-taught — mostly by breaking things and reading the error messages carefully.
          </p>

          <div className="toolkit reveal">
            <div>
              <h4>The storyteller</h4>
              <ul>
                <li>GTM Strategy</li>
                <li>Data storytelling</li>
                <li>Sales narratives</li>
                <li>Campaign strategy and execution</li>
                <li>Stakeholder communication</li>
              </ul>
            </div>
            <div>
              <h4>The economist</h4>
              <ul>
                <li>Economic &amp; statistical analysis</li>
                <li>Python</li>
                <li>SQL and business intelligence analysis</li>
                <li>LLM &amp; agentic workflows (Ollama)</li>
                <li>Open-data pipelines</li>
              </ul>
            </div>
          </div>

          <p className="offclock reveal">
            Off the clock: history and politics rabbit holes, strategy games, and the occasional side project that starts as a one-off script and refuses to stay small.
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="contact-card reveal">
            <span className="eyebrow" style={{ display: "block", marginBottom: "0.8rem" }}>File 04 · Contact</span>
            <h2>Working on something at the intersection of data and narrative?</h2>
            <p>I&apos;m always interested in anything tech, automation, or politics. The fastest way to reach me:</p>
            <div className="contact-links">
              <a className="btn" href="mailto:iamsirir@gmail.com">Email</a>
              <a href="https://linkedin.com/in/sirirama">LinkedIn</a>
              <a href="https://github.com/cmd-siri-bot">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="foot-inner">
          <span>© 2026 Siri Rama · Toronto</span>
          <span>
            <a href="https://github.com/cmd-siri-bot">GitHub</a>
            {" · "}
            <a href="https://linkedin.com/in/sirirama">LinkedIn</a>
          </span>
        </div>
      </footer>
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function ResumeClient() {
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
          <a className="nav-name" href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <Image
              src="/logo.png"
              alt="Siri Rama logo"
              width={28}
              height={28}
              style={{ borderRadius: "4px" }}
            />
            Siri Rama
          </a>
          <div className="nav-links">
            <a href="/#projects">Projects</a>
            <a href="/resume">Resume</a>
            <a href="/#about">About</a>
            <a href="/#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main id="top">
        <section id="resume">
          <div className="section-head reveal">
            <span className="eyebrow">File 01 · Resume</span>
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
            Prefer a PDF? <a href="mailto:iamsirir@gmail.com?subject=Resume%20request">Email me</a> and I&apos;ll send the latest version.
          </p>
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

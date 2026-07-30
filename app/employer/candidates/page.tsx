"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import EmployerShell from "@/components/employer/EmployerShell";
import { EmployerHero, ProgressBar, StatusPill, employerStyles } from "@/components/employer/Shared";
import { employerCandidates } from "@/content/employer-portal";

export default function CandidatesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [minimumScore, setMinimumScore] = useState("0");

  const candidates = useMemo(() => {
    return employerCandidates.filter((candidate) => {
      const text = `${candidate.name} ${candidate.school} ${candidate.topSkills.join(" ")} ${candidate.careerInterests.join(" ")}`.toLowerCase();
      return (
        text.includes(query.toLowerCase()) &&
        (status === "All" || candidate.status === status) &&
        candidate.readinessScore >= Number(minimumScore)
      );
    });
  }, [query, status, minimumScore]);

  return (
    <EmployerShell activePath="/employer/candidates">
      <EmployerHero
        eyebrow="CANDIDATE SEARCH"
        title="Find talent by readiness, not just résumé keywords."
        description="Search students by skills, interests, evidence, school, availability, and Future Ready™ readiness."
        meta={`${candidates.length} candidates shown`}
        symbol="⌕"
      />

      <section style={{ ...employerStyles.card, marginTop: "22px" }}>
        <div style={employerStyles.padding}>
          <div style={employerStyles.eyebrow}>TALENT DIRECTORY</div>
          <h2 style={employerStyles.title}>Search Emerging Talent</h2>
        </div>

        <div style={employerStyles.toolbar}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, skill, school, or interest" style={{ ...employerStyles.input, flex: "1 1 320px" }} />
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={employerStyles.input}>
            <option>All</option><option>Recommended</option><option>Reviewing</option><option>Interview</option><option>Offer</option><option>Placed</option>
          </select>
          <select value={minimumScore} onChange={(e) => setMinimumScore(e.target.value)} style={employerStyles.input}>
            <option value="0">Any readiness score</option>
            <option value="70">70%+</option>
            <option value="75">75%+</option>
            <option value="80">80%+</option>
          </select>
        </div>

        <div style={styles.grid}>
          {candidates.map((candidate) => (
            <article key={candidate.id} style={styles.card}>
              <div style={styles.top}>
                <div style={styles.avatar}>{candidate.name.split(" ").map((part) => part[0]).join("").slice(0,2)}</div>
                <StatusPill value={candidate.status} />
              </div>
              <h3 style={styles.name}>{candidate.name}</h3>
              <div style={styles.small}>{candidate.school} • Class of {candidate.graduationYear}</div>
              <p style={styles.summary}>{candidate.summary}</p>

              <div style={styles.scoreTop}><span>Readiness Score</span><strong>{candidate.readinessScore}%</strong></div>
              <ProgressBar value={candidate.readinessScore} />

              <div style={styles.tags}>{candidate.topSkills.map((skill) => <span key={skill} style={styles.tag}>{skill}</span>)}</div>
              <div style={styles.details}>
                <div><span>Availability</span><strong>{candidate.availability}</strong></div>
                <div><span>Portfolio</span><strong>{candidate.portfolioProgress}%</strong></div>
              </div>
              <Link href={`/employer/candidates/${candidate.id}`} style={styles.link}>Open Candidate Profile →</Link>
            </article>
          ))}
        </div>
      </section>
    </EmployerShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px", padding: "22px" },
  card: { padding: "20px", border: "1px solid #E3E8F0", borderRadius: "18px" },
  top: { display: "flex", justifyContent: "space-between", gap: "10px" },
  avatar: { width: "48px", height: "48px", display: "grid", placeItems: "center", borderRadius: "999px", background: "#EAF2FF", color: "#24569B", fontWeight: 900 },
  name: { margin: "14px 0 0", fontSize: "17px" },
  small: { marginTop: "4px", color: "#7A8494", fontSize: "9px" },
  summary: { minHeight: "58px", color: "#596273", fontSize: "11px", lineHeight: 1.6 },
  scoreTop: { display: "flex", justifyContent: "space-between", margin: "16px 0 7px", color: "#596273", fontSize: "10px" },
  tags: { display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "14px" },
  tag: { padding: "5px 8px", background: "#FFF7D6", color: "#725500", borderRadius: "999px", fontSize: "9px", fontWeight: 800 },
  details: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "15px", padding: "12px", background: "#F8FAFC", borderRadius: "12px", fontSize: "10px" },
  link: { display: "inline-block", marginTop: "17px", color: "#0D1B3D", textDecoration: "none", fontSize: "11px", fontWeight: 850 },
};

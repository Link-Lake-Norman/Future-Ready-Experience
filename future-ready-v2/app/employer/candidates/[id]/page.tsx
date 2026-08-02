import { notFound } from "next/navigation";
import EmployerShell from "@/components/employer/EmployerShell";
import { EmployerHero, StatCard, ProgressBar, StatusPill, employerStyles } from "@/components/employer/Shared";
import { employerCandidates } from "@/content/employer-portal";

export default async function CandidateProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const candidate = employerCandidates.find((item) => item.id === id);
  if (!candidate) notFound();

  return (
    <EmployerShell activePath="/employer/candidates">
      <EmployerHero
        eyebrow="CANDIDATE PROFILE"
        title={candidate.name}
        description={candidate.summary}
        meta={`${candidate.school} • Class of ${candidate.graduationYear} • ${candidate.location}`}
        symbol="◎"
      />

      <section style={employerStyles.statGrid}>
        <StatCard label="Readiness Score" value={`${candidate.readinessScore}%`} description="Future Ready™ indicator" />
        <StatCard label="Portfolio" value={`${candidate.portfolioProgress}%`} description="Evidence completion" />
        <StatCard label="Availability" value={candidate.availability} description="Current internship window" />
        <StatCard label="Pipeline Status" value={candidate.status} description="Employer review stage" />
      </section>

      <section style={employerStyles.gridTwo}>
        <div style={{ ...employerStyles.card, ...employerStyles.padding }}>
          <div style={styles.identity}>
            <div style={styles.avatar}>{candidate.name.split(" ").map((part) => part[0]).join("").slice(0,2)}</div>
            <div>
              <div style={employerStyles.eyebrow}>PROFESSIONAL PROFILE</div>
              <h2 style={styles.name}>{candidate.name}</h2>
              <div style={styles.small}>{candidate.school} • {candidate.location}</div>
            </div>
          </div>

          <div style={styles.section}>
            <div style={employerStyles.eyebrow}>READINESS</div>
            <div style={styles.scoreTop}><span>Overall readiness</span><strong>{candidate.readinessScore}%</strong></div>
            <ProgressBar value={candidate.readinessScore} />
          </div>

          <div style={styles.threeColumns}>
            <Info label="Top Skills" values={candidate.topSkills} />
            <Info label="Career Interests" values={candidate.careerInterests} />
            <Info label="Verified Badges" values={candidate.badges} />
          </div>
        </div>

        <aside style={{ ...employerStyles.card, ...employerStyles.padding }}>
          <div style={employerStyles.eyebrow}>EMPLOYER ACTIONS</div>
          <h2 style={employerStyles.title}>Move This Candidate Forward</h2>
          <div style={styles.status}><StatusPill value={candidate.status} /></div>
          <div style={styles.actions}>
            <button style={employerStyles.button}>Request Introduction</button>
            <button style={employerStyles.secondaryButton}>Schedule Interview</button>
            <button style={employerStyles.secondaryButton}>Save Candidate</button>
          </div>
          <p style={employerStyles.description}>These controls are currently front-end workflows and will connect to messaging and calendar tools in the production phase.</p>
        </aside>
      </section>

      <section style={{ ...employerStyles.card, ...employerStyles.padding, marginTop: "22px" }}>
        <div style={employerStyles.eyebrow}>PORTFOLIO HIGHLIGHTS</div>
        <h2 style={employerStyles.title}>Evidence of Readiness</h2>
        <div style={styles.portfolioGrid}>
          <Evidence title="Professional Introduction" type="Video" description="Two-minute professional introduction demonstrating communication and confidence." />
          <Evidence title="Personal Vision Map" type="PDF" description="Clear connection between strengths, values, interests, and future goals." />
          <Evidence title="Team Project Reflection" type="Written Evidence" description="Reflection on teamwork, leadership, and role ownership." />
        </div>
      </section>
    </EmployerShell>
  );
}

function Info({ label, values }: { label: string; values: string[] }) {
  return <div><div style={styles.label}>{label}</div><div style={styles.tags}>{values.map((value) => <span key={value} style={styles.tag}>{value}</span>)}</div></div>;
}

function Evidence({ title, type, description }: { title: string; type: string; description: string }) {
  return <article style={styles.evidence}><div style={styles.evidenceType}>{type}</div><strong>{title}</strong><p>{description}</p></article>;
}

const styles: Record<string, React.CSSProperties> = {
  identity: { display: "flex", gap: "16px", alignItems: "center" },
  avatar: { width: "72px", height: "72px", display: "grid", placeItems: "center", borderRadius: "999px", background: "#EAF2FF", color: "#24569B", fontSize: "20px", fontWeight: 950 },
  name: { margin: "7px 0 0", fontSize: "28px" },
  small: { marginTop: "5px", color: "#7A8494", fontSize: "10px" },
  section: { marginTop: "28px" },
  scoreTop: { display: "flex", justifyContent: "space-between", margin: "11px 0 8px", color: "#596273", fontSize: "11px" },
  threeColumns: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "18px", marginTop: "26px" },
  label: { color: "#6B7280", fontSize: "9px", fontWeight: 900, letterSpacing: ".1em", textTransform: "uppercase" },
  tags: { display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "9px" },
  tag: { padding: "6px 9px", background: "#FFF7D6", color: "#725500", borderRadius: "999px", fontSize: "9px", fontWeight: 800 },
  status: { marginTop: "18px" },
  actions: { display: "grid", gap: "10px", marginTop: "18px" },
  portfolioGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "14px", marginTop: "20px" },
  evidence: { padding: "18px", border: "1px solid #E3E8F0", borderRadius: "16px", fontSize: "12px" },
  evidenceType: { marginBottom: "8px", color: "#A47700", fontSize: "9px", fontWeight: 900, letterSpacing: ".08em" },
};

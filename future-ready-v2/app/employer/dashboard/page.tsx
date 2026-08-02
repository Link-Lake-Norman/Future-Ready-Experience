import Link from "next/link";
import EmployerShell from "@/components/employer/EmployerShell";
import { EmployerHero, StatCard, ProgressBar, StatusPill, employerStyles } from "@/components/employer/Shared";
import { employerActivity, employerCandidates, employerProfile, internships, upcomingInterviews } from "@/content/employer-portal";

export default function EmployerDashboardPage() {
  const recommended = employerCandidates.filter((candidate) => candidate.status === "Recommended").slice(0, 4);

  return (
    <EmployerShell activePath="/employer/dashboard">
      <EmployerHero
        eyebrow="EMPLOYER TALENT DASHBOARD"
        title="Build your future workforce before the hiring gap appears."
        description="Discover emerging talent, manage internship pathways, and build meaningful relationships with students before they enter the workforce."
        meta={`${employerProfile.companyName} • ${employerProfile.industry} • ${employerProfile.location}`}
        symbol="↗"
      />

      <section style={employerStyles.statGrid}>
        <StatCard label="Students in Pipeline" value={employerProfile.studentsInPipeline} description="Active candidate relationships" />
        <StatCard label="Active Internships" value={employerProfile.activeInternships} description="Current opportunities" />
        <StatCard label="Interviews" value={employerProfile.interviewsScheduled} description="Scheduled conversations" />
        <StatCard label="Placements" value={employerProfile.placements} description="Students placed" />
      </section>

      <section style={employerStyles.gridTwo}>
        <div style={employerStyles.card}>
          <div style={employerStyles.padding}>
            <div style={employerStyles.eyebrow}>RECOMMENDED TALENT</div>
            <h2 style={employerStyles.title}>Students Matching Your Workforce Needs</h2>
            <p style={employerStyles.description}>Recommendations based on readiness, skills, interests, and evidence.</p>
          </div>
          <div>
            {recommended.map((candidate) => (
              <div key={candidate.id} style={styles.candidateRow}>
                <div style={styles.avatar}>{candidate.name.split(" ").map((part) => part[0]).join("").slice(0,2)}</div>
                <div style={styles.candidateMain}>
                  <div style={styles.rowTop}>
                    <Link href={`/employer/candidates/${candidate.id}`} style={styles.name}>{candidate.name}</Link>
                    <StatusPill value={candidate.status} />
                  </div>
                  <div style={styles.small}>{candidate.school} • {candidate.careerInterests.join(" • ")}</div>
                  <div style={styles.scoreLine}><span>Readiness</span><strong>{candidate.readinessScore}%</strong></div>
                  <ProgressBar value={candidate.readinessScore} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside style={styles.stack}>
          <div style={{ ...employerStyles.card, ...employerStyles.padding }}>
            <div style={employerStyles.eyebrow}>UPCOMING INTERVIEWS</div>
            <h2 style={employerStyles.title}>Scheduled Conversations</h2>
            <div style={styles.list}>
              {upcomingInterviews.map((item) => (
                <div key={item.id} style={styles.listItem}>
                  <strong>{item.candidate}</strong>
                  <div style={styles.small}>{item.role}</div>
                  <div style={styles.date}>{item.date} • {item.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...employerStyles.card, ...employerStyles.padding }}>
            <div style={employerStyles.eyebrow}>RECENT ACTIVITY</div>
            <h2 style={employerStyles.title}>Pipeline Updates</h2>
            <div style={styles.list}>
              {employerActivity.map((item) => (
                <div key={item.id} style={styles.listItem}>
                  <strong>{item.title}</strong>
                  <div style={styles.small}>{item.detail}</div>
                  <div style={styles.date}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section style={{ ...employerStyles.card, ...employerStyles.padding, marginTop: "22px" }}>
        <div style={employerStyles.eyebrow}>INTERNSHIP PIPELINE</div>
        <h2 style={employerStyles.title}>Current Opportunities</h2>
        <div style={styles.internshipGrid}>
          {internships.map((internship) => (
            <article key={internship.id} style={styles.internshipCard}>
              <div style={styles.rowTop}><strong>{internship.title}</strong><StatusPill value={internship.status} /></div>
              <div style={styles.small}>{internship.department} • {internship.term}</div>
              <div style={styles.metrics}>
                <Metric label="Applicants" value={internship.applicants} />
                <Metric label="Interviews" value={internship.interviews} />
                <Metric label="Openings" value={internship.openings} />
              </div>
              <Link href={`/employer/internships/${internship.id}`} style={styles.link}>Manage Internship →</Link>
            </article>
          ))}
        </div>
      </section>
    </EmployerShell>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div><div style={styles.metricValue}>{value}</div><div style={styles.metricLabel}>{label}</div></div>;
}

const styles: Record<string, React.CSSProperties> = {
  candidateRow: { display: "flex", gap: "13px", padding: "18px 24px", borderTop: "1px solid #EDF0F5" },
  avatar: { width: "42px", height: "42px", display: "grid", placeItems: "center", borderRadius: "999px", background: "#EAF2FF", color: "#24569B", fontSize: "11px", fontWeight: 900, flexShrink: 0 },
  candidateMain: { flex: 1 },
  rowTop: { display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center" },
  name: { color: "#0D1B3D", textDecoration: "none", fontSize: "13px", fontWeight: 850 },
  small: { marginTop: "5px", color: "#7A8494", fontSize: "9px", lineHeight: 1.5 },
  scoreLine: { display: "flex", justifyContent: "space-between", margin: "11px 0 7px", color: "#596273", fontSize: "10px" },
  stack: { display: "grid", gap: "18px" },
  list: { display: "grid", gap: "12px", marginTop: "18px" },
  listItem: { paddingBottom: "12px", borderBottom: "1px solid #EDF0F5", fontSize: "12px" },
  date: { marginTop: "5px", color: "#A47700", fontSize: "9px", fontWeight: 800 },
  internshipGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "16px", marginTop: "20px" },
  internshipCard: { padding: "20px", border: "1px solid #E3E8F0", borderRadius: "18px" },
  metrics: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginTop: "17px", padding: "12px", background: "#F8FAFC", borderRadius: "12px", textAlign: "center" },
  metricValue: { color: "#0D1B3D", fontSize: "15px", fontWeight: 900 },
  metricLabel: { marginTop: "3px", color: "#7A8494", fontSize: "9px" },
  link: { display: "inline-block", marginTop: "17px", color: "#0D1B3D", textDecoration: "none", fontSize: "11px", fontWeight: 850 },
};

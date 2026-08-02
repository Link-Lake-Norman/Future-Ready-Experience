import EmployerShell from "@/components/employer/EmployerShell";
import { EmployerHero, StatCard, ProgressBar, employerStyles } from "@/components/employer/Shared";
import { employerCandidates, internships, pipelineStages, skillsDemand } from "@/content/employer-portal";

export default function EmployerAnalyticsPage() {
  const avgReadiness = Math.round(employerCandidates.reduce((sum, item) => sum + item.readinessScore, 0) / employerCandidates.length);
  const avgPortfolio = Math.round(employerCandidates.reduce((sum, item) => sum + item.portfolioProgress, 0) / employerCandidates.length);

  return (
    <EmployerShell activePath="/employer/analytics">
      <EmployerHero
        eyebrow="WORKFORCE ANALYTICS"
        title="See the strength of your emerging talent pipeline."
        description="Measure candidate readiness, internship activity, skill alignment, and movement through the employer pipeline."
        meta="Future Ready™ workforce pipeline analytics"
        symbol="↗"
      />

      <section style={employerStyles.statGrid}>
        <StatCard label="Average Readiness" value={`${avgReadiness}%`} description="Across visible candidates" />
        <StatCard label="Portfolio Completion" value={`${avgPortfolio}%`} description="Average candidate evidence" />
        <StatCard label="Active Candidates" value={employerCandidates.length} description="Current talent pool" />
        <StatCard label="Internship Openings" value={internships.reduce((sum, item) => sum + item.openings, 0)} description="Available placements" />
      </section>

      <section style={employerStyles.gridTwo}>
        <div style={{ ...employerStyles.card, ...employerStyles.padding }}>
          <div style={employerStyles.eyebrow}>HIRING FUNNEL</div>
          <h2 style={employerStyles.title}>Candidate Pipeline</h2>
          <div style={styles.funnel}>
            {pipelineStages.map((stage, index) => (
              <div key={stage.label} style={{ ...styles.funnelRow, width: `${100 - index * 9}%` }}>
                <span>{stage.label}</span><strong>{stage.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...employerStyles.card, ...employerStyles.padding }}>
          <div style={employerStyles.eyebrow}>SKILL DEMAND</div>
          <h2 style={employerStyles.title}>Priority Workforce Skills</h2>
          <div style={styles.skillList}>
            {skillsDemand.map((item) => (
              <div key={item.skill}>
                <div style={styles.skillTop}><span>{item.skill}</span><strong>{item.score}%</strong></div>
                <ProgressBar value={item.score} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...employerStyles.card, ...employerStyles.padding, marginTop: "22px" }}>
        <div style={employerStyles.eyebrow}>SCHOOL PARTICIPATION</div>
        <h2 style={employerStyles.title}>Talent Source Overview</h2>
        <div style={styles.schoolCard}>
          <div><strong>Ambassador Christian School</strong><div style={styles.small}>2026 Student Athlete Cohort</div></div>
          <div style={styles.schoolMetrics}>
            <Metric label="Candidates" value={employerCandidates.length} />
            <Metric label="Avg. Readiness" value={`${avgReadiness}%`} />
            <Metric label="Interviews" value={5} />
          </div>
        </div>
      </section>
    </EmployerShell>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div><div style={styles.metricValue}>{value}</div><div style={styles.metricLabel}>{label}</div></div>;
}

const styles: Record<string, React.CSSProperties> = {
  funnel: { display: "grid", justifyItems: "center", gap: "9px", marginTop: "24px" },
  funnelRow: { display: "flex", justifyContent: "space-between", padding: "14px 18px", background: "#0D1B3D", color: "#FFFFFF", borderRadius: "10px", fontSize: "11px" },
  skillList: { display: "grid", gap: "18px", marginTop: "24px" },
  skillTop: { display: "flex", justifyContent: "space-between", marginBottom: "7px", color: "#596273", fontSize: "11px" },
  schoolCard: { display: "flex", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", marginTop: "20px", padding: "20px", border: "1px solid #E3E8F0", borderRadius: "16px", fontSize: "13px" },
  small: { marginTop: "5px", color: "#7A8494", fontSize: "9px" },
  schoolMetrics: { display: "grid", gridTemplateColumns: "repeat(3,minmax(90px,1fr))", gap: "12px", textAlign: "center" },
  metricValue: { fontSize: "18px", fontWeight: 900 },
  metricLabel: { marginTop: "4px", color: "#7A8494", fontSize: "9px" },
};

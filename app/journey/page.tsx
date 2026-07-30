import StudentShell from "@/components/student/StudentShell";
import { StudentHero, MetricCard, ProgressBar, Pill, studentStyles } from "@/components/student/Shared";
import { journeyPhases, studentProfile } from "@/content/student-portal";

export default function JourneyPage() {
  return (
    <StudentShell activePath="/journey">
      <StudentHero
        eyebrow="FUTURE READY™ JOURNEY"
        title="Discover purpose. Build skills. Launch your future."
        description="Your 36-week journey moves from self-awareness to professional confidence, real-world experience, and a clear next step."
        meta={`Current position: Week ${studentProfile.currentWeek} • ${studentProfile.currentPhase}`}
        symbol="⌁"
      />

      <section style={studentStyles.metricGrid}>
        <MetricCard label="Current Week" value={studentProfile.currentWeek} description="Out of 36 weeks" />
        <MetricCard label="Current Phase" value={studentProfile.currentPhase} description="Active learning stage" />
        <MetricCard label="Completed Phases" value={journeyPhases.filter((item) => item.status === "Complete").length} description="Journey milestones" />
        <MetricCard label="Readiness Score" value={`${studentProfile.readinessScore}%`} description="Current launch indicator" />
      </section>

      <section style={{ ...studentStyles.card, ...studentStyles.padding, marginTop: "22px" }}>
        <div style={studentStyles.eyebrow}>SIX-PHASE PATHWAY</div>
        <h2 style={studentStyles.sectionTitle}>Your Roadmap to Launch</h2>
        <div style={styles.timeline}>
          {journeyPhases.map((phase, index) => (
            <article key={phase.id} style={styles.phase}>
              <div style={styles.number}>{index + 1}</div>
              <div style={styles.content}>
                <div style={styles.top}><div><strong>{phase.name}</strong><div style={styles.weeks}>{phase.weeks}</div></div><Pill value={phase.status} /></div>
                <p style={styles.description}>{phase.description}</p>
                <ProgressBar value={phase.progress} />
                <div style={styles.progress}>{phase.progress}% complete</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </StudentShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  timeline: { display: "grid", gap: "0", marginTop: "24px" },
  phase: { display: "grid", gridTemplateColumns: "48px 1fr", gap: "16px", padding: "0 0 24px" },
  number: { width: "40px", height: "40px", display: "grid", placeItems: "center", borderRadius: "999px", background: "#0D1B3D", color: "#F2B705", fontWeight: 950 },
  content: { padding: "18px", border: "1px solid #E3E8F0", borderRadius: "16px" },
  top: { display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "13px" },
  weeks: { marginTop: "4px", color: "#A47700", fontSize: "9px", fontWeight: 850 },
  description: { color: "#596273", fontSize: "11px", lineHeight: 1.65 },
  progress: { marginTop: "8px", color: "#7A8494", fontSize: "9px" },
};

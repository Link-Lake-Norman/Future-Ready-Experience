import Link from "next/link";
import StudentShell from "@/components/student/StudentShell";
import { StudentHero, MetricCard, ProgressBar, Pill, studentStyles } from "@/components/student/Shared";
import { journeyPhases, studentBadges, studentProfile, studentSkills } from "@/content/student-portal";

export default function PassportPage() {
  return (
    <StudentShell activePath="/ambassador/student-passport/ambassador-student-001">
      <StudentHero
        eyebrow="DIGITAL FUTURE READY™ PASSPORT"
        title="Your skills. Your story. Your proof."
        description="This passport brings together your strengths, skill evidence, badges, reflections, and portfolio so others can understand what you are ready to contribute."
        meta={`${studentProfile.name} • ${studentProfile.cohort}`}
        symbol="◎"
      />

      <section style={studentStyles.metricGrid}>
        <MetricCard label="Readiness Score" value={`${studentProfile.readinessScore}%`} description="Overall launch readiness" />
        <MetricCard label="Skills Tracked" value={studentSkills.length} description="Transferable competencies" />
        <MetricCard label="Badges Earned" value={studentProfile.badgesEarned} description="Validated achievements" />
        <MetricCard label="Current Phase" value={studentProfile.currentPhase} description={`Week ${studentProfile.currentWeek}`} />
      </section>

      <section style={studentStyles.gridTwo}>
        <div style={{ ...studentStyles.card, ...studentStyles.padding }}>
          <div style={styles.identity}>
            <div style={styles.avatar}>{studentProfile.initials}</div>
            <div>
              <div style={studentStyles.eyebrow}>STUDENT PROFILE</div>
              <h2 style={styles.name}>{studentProfile.name}</h2>
              <p style={studentStyles.sectionDescription}>{studentProfile.headline}</p>
            </div>
          </div>

          <div style={styles.threeColumns}>
            <Info label="Strengths" values={studentProfile.strengths} />
            <Info label="Values" values={studentProfile.values} />
            <Info label="Career Interests" values={studentProfile.careerInterests} />
          </div>

          <Link href="/ambassador/student-passport/ambassador-student-001/profile" style={styles.link}>Open Full Profile →</Link>
        </div>

        <div style={{ ...studentStyles.card, ...studentStyles.padding }}>
          <div style={studentStyles.eyebrow}>READINESS PROGRESS</div>
          <h2 style={studentStyles.sectionTitle}>Your Launch Indicator</h2>
          <div style={styles.score}>{studentProfile.readinessScore}%</div>
          <ProgressBar value={studentProfile.readinessScore} />
          <p style={studentStyles.sectionDescription}>Your score reflects participation, skill evidence, portfolio progress, and completion.</p>
        </div>
      </section>

      <section style={{ ...studentStyles.card, ...studentStyles.padding, marginTop: "22px" }}>
        <div style={studentStyles.eyebrow}>JOURNEY STATUS</div>
        <h2 style={studentStyles.sectionTitle}>Six Phases to Launch</h2>
        <div style={styles.phaseGrid}>
          {journeyPhases.map((phase) => (
            <article key={phase.id} style={styles.phaseCard}>
              <div style={styles.phaseTop}><strong>{phase.name}</strong><Pill value={phase.status} /></div>
              <div style={styles.small}>{phase.weeks}</div>
              <p style={styles.phaseDescription}>{phase.description}</p>
              <ProgressBar value={phase.progress} />
            </article>
          ))}
        </div>
      </section>

      <section style={{ ...studentStyles.card, ...studentStyles.padding, marginTop: "22px" }}>
        <div style={studentStyles.eyebrow}>RECENT BADGES</div>
        <h2 style={studentStyles.sectionTitle}>Validated Growth</h2>
        <div style={styles.badgeGrid}>
          {studentBadges.slice(0, 4).map((badge) => (
            <article key={badge.id} style={styles.badgeCard}>
              <div style={styles.badgeIcon}>★</div>
              <strong>{badge.name}</strong>
              <div style={styles.small}>{badge.date}</div>
              <Pill value={badge.status} />
            </article>
          ))}
        </div>
      </section>
    </StudentShell>
  );
}

function Info({ label, values }: { label: string; values: string[] }) {
  return (
    <div>
      <div style={styles.infoLabel}>{label}</div>
      <div style={styles.tags}>{values.map((value) => <span key={value} style={styles.tag}>{value}</span>)}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  identity: { display: "flex", gap: "18px", alignItems: "center" },
  avatar: { width: "72px", height: "72px", display: "grid", placeItems: "center", borderRadius: "999px", background: "#EAF2FF", color: "#24569B", fontWeight: 950, fontSize: "20px" },
  name: { margin: "6px 0 0", fontSize: "28px" },
  threeColumns: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "18px", marginTop: "24px" },
  infoLabel: { color: "#6B7280", fontSize: "9px", fontWeight: 900, letterSpacing: ".1em", textTransform: "uppercase" },
  tags: { display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "9px" },
  tag: { padding: "6px 9px", borderRadius: "999px", background: "#FFF7D6", color: "#725500", fontSize: "9px", fontWeight: 800 },
  link: { display: "inline-block", marginTop: "22px", color: "#0D1B3D", textDecoration: "none", fontSize: "11px", fontWeight: 850 },
  score: { margin: "24px 0 12px", color: "#0D1B3D", fontSize: "54px", fontWeight: 950 },
  phaseGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "14px", marginTop: "20px" },
  phaseCard: { padding: "18px", border: "1px solid #E3E8F0", borderRadius: "16px" },
  phaseTop: { display: "flex", justifyContent: "space-between", gap: "9px", alignItems: "center", fontSize: "12px" },
  small: { marginTop: "5px", color: "#7A8494", fontSize: "9px" },
  phaseDescription: { minHeight: "58px", color: "#596273", fontSize: "10px", lineHeight: 1.55 },
  badgeGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "14px", marginTop: "20px" },
  badgeCard: { padding: "18px", border: "1px solid #E3E8F0", borderRadius: "16px", display: "grid", gap: "8px" },
  badgeIcon: { color: "#F2B705", fontSize: "26px" },
};

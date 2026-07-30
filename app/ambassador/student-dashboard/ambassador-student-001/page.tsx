import Link from "next/link";
import StudentShell from "@/components/student/StudentShell";
import { StudentHero, MetricCard, ProgressBar, Pill, studentStyles } from "@/components/student/Shared";
import { careerMatches, journeyPhases, opportunities, studentBadges, studentProfile, studentSkills } from "@/content/student-portal";

export default function StudentDashboardPage() {
  const current = journeyPhases.find((phase) => phase.status === "Current");

  return (
    <StudentShell activePath="/ambassador/student-dashboard/ambassador-student-001">
      <StudentHero
        eyebrow="YOUR FUTURE READY™ DASHBOARD"
        title={`Welcome back, ${studentProfile.name.split(" ")[0]}.`}
        description="Your journey is building the confidence, skills, evidence, and relationships you need to launch your future."
        meta={`Week ${studentProfile.currentWeek} • ${studentProfile.currentPhase} • ${studentProfile.school}`}
        symbol="✦"
      />

      <section style={studentStyles.metricGrid}>
        <MetricCard label="Readiness Score" value={`${studentProfile.readinessScore}%`} description="Your current launch readiness" />
        <MetricCard label="Attendance" value={`${studentProfile.attendanceRate}%`} description="Participation and engagement" />
        <MetricCard label="Portfolio" value={`${studentProfile.portfolioProgress}%`} description="Evidence collection progress" />
        <MetricCard label="Badges Earned" value={studentProfile.badgesEarned} description="Validated Future Ready™ skills" />
      </section>

      <section style={studentStyles.gridTwo}>
        <div style={studentStyles.card}>
          <div style={studentStyles.padding}>
            <div style={studentStyles.eyebrow}>CURRENT PHASE</div>
            <h2 style={studentStyles.sectionTitle}>{current?.name}: Build Skills That Transfer</h2>
            <p style={studentStyles.sectionDescription}>{current?.description}</p>
          </div>
          <div style={styles.phaseBody}>
            <div style={styles.phaseTop}><strong>{current?.weeks}</strong><Pill value={current?.status || "Current"} /></div>
            <ProgressBar value={current?.progress || 0} />
            <div style={styles.meta}>{current?.progress}% phase progress</div>
            <Link href="/journey" style={styles.primaryLink}>Open Journey Map →</Link>
          </div>
        </div>

        <aside style={styles.stack}>
          <div style={{ ...studentStyles.card, ...studentStyles.padding }}>
            <div style={studentStyles.eyebrow}>TOP SKILLS</div>
            <h2 style={studentStyles.sectionTitle}>Your Strength Profile</h2>
            <div style={styles.skillList}>
              {studentSkills.slice(0, 4).map((skill) => (
                <div key={skill.id}>
                  <div style={styles.skillTop}><span>{skill.name}</span><strong>{skill.score}%</strong></div>
                  <ProgressBar value={skill.score} />
                </div>
              ))}
            </div>
            <Link href="/skills" style={styles.primaryLink}>View All Skills →</Link>
          </div>

          <div style={{ ...studentStyles.card, ...studentStyles.padding }}>
            <div style={studentStyles.eyebrow}>NEXT BADGE</div>
            <h2 style={studentStyles.sectionTitle}>{studentBadges.find((badge) => badge.status === "Pending")?.name}</h2>
            <p style={studentStyles.sectionDescription}>Your evidence has been submitted and is awaiting facilitator review.</p>
            <Link href="/badges" style={styles.primaryLink}>Open Badge Center →</Link>
          </div>
        </aside>
      </section>

      <section style={studentStyles.gridTwo}>
        <div style={{ ...studentStyles.card, ...studentStyles.padding }}>
          <div style={studentStyles.eyebrow}>CAREER MATCHES</div>
          <h2 style={studentStyles.sectionTitle}>Roles That Fit Your Emerging Profile</h2>
          <div style={styles.list}>
            {careerMatches.map((match) => (
              <div key={match.title} style={styles.listItem}>
                <div>
                  <strong>{match.title}</strong>
                  <div style={styles.small}>{match.field} • {match.reason}</div>
                </div>
                <div style={styles.fit}>{match.fit}% fit</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...studentStyles.card, ...studentStyles.padding }}>
          <div style={studentStyles.eyebrow}>UPCOMING OPPORTUNITIES</div>
          <h2 style={studentStyles.sectionTitle}>Build Real-World Exposure</h2>
          <div style={styles.list}>
            {opportunities.map((item) => (
              <div key={item.title} style={styles.opportunity}>
                <strong>{item.title}</strong>
                <div style={styles.small}>{item.organization}</div>
                <div style={styles.date}>{item.date} • {item.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </StudentShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  phaseBody: { padding: "0 24px 24px" },
  phaseTop: { display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "10px", fontSize: "12px" },
  meta: { marginTop: "8px", color: "#7A8494", fontSize: "10px" },
  primaryLink: { display: "inline-block", marginTop: "18px", color: "#0D1B3D", textDecoration: "none", fontSize: "11px", fontWeight: 850 },
  stack: { display: "grid", gap: "18px" },
  skillList: { display: "grid", gap: "15px", marginTop: "20px" },
  skillTop: { display: "flex", justifyContent: "space-between", marginBottom: "7px", color: "#596273", fontSize: "11px" },
  list: { display: "grid", gap: "12px", marginTop: "18px" },
  listItem: { display: "flex", justifyContent: "space-between", gap: "14px", paddingBottom: "13px", borderBottom: "1px solid #EDF0F5", fontSize: "12px" },
  small: { marginTop: "5px", color: "#7A8494", fontSize: "10px", lineHeight: 1.5 },
  fit: { flexShrink: 0, color: "#A47700", fontSize: "11px", fontWeight: 900 },
  opportunity: { paddingBottom: "13px", borderBottom: "1px solid #EDF0F5", fontSize: "12px" },
  date: { marginTop: "6px", color: "#A47700", fontSize: "9px", fontWeight: 800 },
};

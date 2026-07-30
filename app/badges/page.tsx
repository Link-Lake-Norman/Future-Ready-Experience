import Link from "next/link";
import StudentShell from "@/components/student/StudentShell";
import { StudentHero, MetricCard, Pill, studentStyles } from "@/components/student/Shared";
import { studentBadges, studentProfile } from "@/content/student-portal";

export default function BadgesPage() {
  return (
    <StudentShell activePath="/badges">
      <StudentHero
        eyebrow="BADGE CENTER"
        title="Make your growth visible."
        description="Future Ready™ badges validate the skills, behaviors, and evidence you can carry into interviews, portfolios, and opportunities."
        meta={`${studentProfile.badgesEarned} badges earned`}
        symbol="★"
      />

      <section style={studentStyles.metricGrid}>
        <MetricCard label="Earned" value={studentBadges.filter((item) => item.status === "Earned").length} description="Validated achievements" />
        <MetricCard label="Pending" value={studentBadges.filter((item) => item.status === "Pending").length} description="Awaiting facilitator review" />
        <MetricCard label="Locked" value={studentBadges.filter((item) => item.status === "Locked").length} description="Future milestones" />
      </section>

      <section style={{ ...studentStyles.card, ...studentStyles.padding, marginTop: "22px" }}>
        <div style={studentStyles.eyebrow}>MY BADGES</div>
        <h2 style={studentStyles.sectionTitle}>Achievement Collection</h2>
        <div style={styles.grid}>
          {studentBadges.map((badge) => (
            <Link href={`/badges/${badge.id}`} key={badge.id} style={styles.card}>
              <div style={styles.top}><div style={styles.icon}>★</div><Pill value={badge.status} /></div>
              <h3 style={styles.title}>{badge.name}</h3>
              <p style={styles.description}>{badge.description}</p>
              <div style={styles.date}>{badge.date}</div>
            </Link>
          ))}
        </div>
      </section>
    </StudentShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "16px", marginTop: "20px" },
  card: { padding: "20px", border: "1px solid #E3E8F0", borderRadius: "18px", textDecoration: "none", color: "#0D1B3D" },
  top: { display: "flex", justifyContent: "space-between", gap: "10px" },
  icon: { color: "#F2B705", fontSize: "29px" },
  title: { margin: "16px 0 0", fontSize: "16px" },
  description: { minHeight: "58px", color: "#596273", fontSize: "11px", lineHeight: 1.6 },
  date: { marginTop: "12px", color: "#A47700", fontSize: "9px", fontWeight: 850 },
};

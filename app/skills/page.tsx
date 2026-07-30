import Link from "next/link";
import StudentShell from "@/components/student/StudentShell";
import { StudentHero, MetricCard, ProgressBar, Pill, studentStyles } from "@/components/student/Shared";
import { studentProfile, studentSkills } from "@/content/student-portal";

export default function SkillsPage() {
  const average = Math.round(studentSkills.reduce((sum, item) => sum + item.score, 0) / studentSkills.length);

  return (
    <StudentShell activePath="/skills">
      <StudentHero
        eyebrow="SKILLS CENTER"
        title="Build skills that travel with you."
        description="Track the transferable skills employers value across industries, roles, and career pathways."
        meta={`${studentProfile.name} • ${studentSkills.length} skills tracked`}
        symbol="↗"
      />

      <section style={studentStyles.metricGrid}>
        <MetricCard label="Average Skill Score" value={`${average}%`} description="Across all tracked competencies" />
        <MetricCard label="Strong Skills" value={studentSkills.filter((item) => item.level === "Strong").length} description="Current strengths" />
        <MetricCard label="Developing Skills" value={studentSkills.filter((item) => item.level === "Developing").length} description="Active growth areas" />
        <MetricCard label="Evidence Items" value={studentSkills.reduce((sum, item) => sum + item.evidence, 0)} description="Connected proof points" />
      </section>

      <section style={{ ...studentStyles.card, ...studentStyles.padding, marginTop: "22px" }}>
        <div style={studentStyles.eyebrow}>MY SKILL PROFILE</div>
        <h2 style={studentStyles.sectionTitle}>Transferable Competencies</h2>
        <div style={styles.grid}>
          {studentSkills.map((skill) => (
            <Link key={skill.id} href={`/skills/${skill.id}`} style={styles.card}>
              <div style={styles.top}><strong>{skill.name}</strong><Pill value={skill.level} /></div>
              <div style={styles.score}>{skill.score}%</div>
              <ProgressBar value={skill.score} />
              <div style={styles.meta}>{skill.evidence} evidence items connected</div>
            </Link>
          ))}
        </div>
      </section>
    </StudentShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "16px", marginTop: "20px" },
  card: { padding: "20px", border: "1px solid #E3E8F0", borderRadius: "18px", textDecoration: "none", color: "#0D1B3D" },
  top: { display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center", fontSize: "13px" },
  score: { margin: "22px 0 9px", fontSize: "34px", fontWeight: 950 },
  meta: { marginTop: "9px", color: "#7A8494", fontSize: "9px" },
};

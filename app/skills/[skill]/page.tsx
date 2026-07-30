import { notFound } from "next/navigation";
import StudentShell from "@/components/student/StudentShell";
import { StudentHero, MetricCard, ProgressBar, Pill, studentStyles } from "@/components/student/Shared";
import { studentSkills } from "@/content/student-portal";

export default async function SkillDetailPage({ params }: { params: Promise<{ skill: string }> }) {
  const { skill: skillId } = await params;
  const skill = studentSkills.find((item) => item.id === skillId);
  if (!skill) notFound();

  return (
    <StudentShell activePath="/skills">
      <StudentHero
        eyebrow="SKILL DETAIL"
        title={skill.name}
        description={`See your current ${skill.name.toLowerCase()} strength, connected evidence, and next steps for growth.`}
        meta={`Current level: ${skill.level}`}
        symbol="↗"
      />

      <section style={studentStyles.metricGrid}>
        <MetricCard label="Current Score" value={`${skill.score}%`} description="Skill readiness indicator" />
        <MetricCard label="Level" value={skill.level} description="Current development stage" />
        <MetricCard label="Evidence" value={skill.evidence} description="Connected proof points" />
      </section>

      <section style={studentStyles.gridTwo}>
        <div style={{ ...studentStyles.card, ...studentStyles.padding }}>
          <div style={studentStyles.eyebrow}>SKILL PROGRESS</div>
          <h2 style={studentStyles.sectionTitle}>{skill.name} Readiness</h2>
          <div style={styles.score}>{skill.score}%</div>
          <ProgressBar value={skill.score} />
          <div style={styles.status}><Pill value={skill.level} /></div>
        </div>

        <div style={{ ...studentStyles.card, ...studentStyles.padding }}>
          <div style={studentStyles.eyebrow}>NEXT STEP</div>
          <h2 style={studentStyles.sectionTitle}>Strengthen This Skill</h2>
          <p style={studentStyles.sectionDescription}>
            Practice this skill in a real conversation, team project, service experience, or workplace activity. Add evidence and reflect on what changed.
          </p>
        </div>
      </section>
    </StudentShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  score: { margin: "24px 0 12px", fontSize: "56px", fontWeight: 950 },
  status: { marginTop: "16px" },
};

import { notFound } from "next/navigation";
import StudentShell from "@/components/student/StudentShell";
import { StudentHero, MetricCard, Pill, studentStyles } from "@/components/student/Shared";
import { studentBadges } from "@/content/student-portal";

export default async function BadgeDetailPage({ params }: { params: Promise<{ badge: string }> }) {
  const { badge: badgeId } = await params;
  const badge = studentBadges.find((item) => item.id === badgeId);
  if (!badge) notFound();

  return (
    <StudentShell activePath="/badges">
      <StudentHero
        eyebrow="BADGE DETAIL"
        title={badge.name}
        description={badge.description}
        meta={badge.date}
        symbol="★"
      />

      <section style={studentStyles.metricGrid}>
        <MetricCard label="Status" value={badge.status} description="Current badge state" />
        <MetricCard label="Category" value="Future Ready™" description="Transferable skill credential" />
      </section>

      <section style={studentStyles.gridTwo}>
        <div style={{ ...studentStyles.card, ...studentStyles.padding }}>
          <div style={styles.icon}>★</div>
          <div style={studentStyles.eyebrow}>BADGE STATUS</div>
          <h2 style={studentStyles.sectionTitle}>{badge.name}</h2>
          <div style={styles.status}><Pill value={badge.status} /></div>
          <p style={studentStyles.sectionDescription}>{badge.description}</p>
        </div>

        <div style={{ ...studentStyles.card, ...studentStyles.padding }}>
          <div style={studentStyles.eyebrow}>WHAT THIS SHOWS</div>
          <h2 style={studentStyles.sectionTitle}>Skill Evidence</h2>
          <p style={studentStyles.sectionDescription}>
            This badge communicates that you have completed the required learning, submitted evidence, and demonstrated the expected Future Ready™ behavior or competency.
          </p>
        </div>
      </section>
    </StudentShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  icon: { color: "#F2B705", fontSize: "56px", marginBottom: "18px" },
  status: { marginTop: "14px" },
};

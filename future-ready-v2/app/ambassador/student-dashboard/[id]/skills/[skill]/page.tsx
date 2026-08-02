import Link from "next/link";
import { notFound } from "next/navigation";
import {
  futureReadySkills,
  getSkillBySlug,
} from "@/content/skills";

type SkillDetailPageProps = {
  params: Promise<{
    id: string;
    skill: string;
  }>;
};

export function generateStaticParams() {
  return futureReadySkills.map((skill) => ({
    skill: skill.slug,
  }));
}

export default async function SkillDetailPage({
  params,
}: SkillDetailPageProps) {
  const { id, skill: skillSlug } = await params;
  const skill = getSkillBySlug(skillSlug);

  if (!skill) {
    notFound();
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <nav style={styles.breadcrumbs}>
          <Link
            href={`/ambassador/student-dashboard/${id}`}
            style={styles.breadcrumbLink}
          >
            Student Dashboard
          </Link>

          <span style={styles.breadcrumbDivider}>/</span>

          <Link
            href={`/ambassador/student-dashboard/${id}/skills`}
            style={styles.breadcrumbLink}
          >
            Skills Center
          </Link>

          <span style={styles.breadcrumbDivider}>/</span>

          <span>{skill.name}</span>
        </nav>

        <section style={styles.hero}>
          <div style={styles.heroMain}>
            <div style={styles.eyebrow}>{skill.category}</div>

            <h1 style={styles.heroTitle}>{skill.name}</h1>

            <p style={styles.heroDescription}>
              {skill.description}
            </p>

            <div style={styles.tagRow}>
              {skill.demonstratedBy.map((item) => (
                <span key={item} style={styles.tag}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div style={styles.scoreCard}>
            <div style={styles.scoreLabel}>Current Proficiency</div>

            <div style={styles.scoreValue}>{skill.score}%</div>

            <div style={styles.scoreTrack}>
              <div
                style={{
                  ...styles.scoreFill,
                  width: `${skill.score}%`,
                }}
              />
            </div>

            <div style={styles.levelRow}>
              <span style={styles.levelBadge}>{skill.level}</span>
              <span style={styles.updatedText}>Updated this week</span>
            </div>
          </div>
        </section>

        <section style={styles.contentGrid}>
          <div style={styles.mainColumn}>
            <article style={styles.panel}>
              <div style={styles.panelEyebrow}>
                VERIFIED DEVELOPMENT
              </div>

              <h2 style={styles.panelTitle}>
                Evidence connected to this skill
              </h2>

              <p style={styles.panelIntro}>
                These lessons, portfolio artifacts, reflections, and
                facilitator observations contribute to your current score.
              </p>

              <div style={styles.timeline}>
                {skill.evidence.map((item, index) => (
                  <div key={`${item.title}-${index}`} style={styles.timelineItem}>
                    <div style={styles.timelineMarker}>
                      {index + 1}
                    </div>

                    <div style={styles.evidenceCard}>
                      <div style={styles.evidenceTopRow}>
                        <span style={styles.evidenceType}>
                          {item.type}
                        </span>

                        <span style={styles.evidenceDate}>
                          {item.date}
                        </span>
                      </div>

                      <h3 style={styles.evidenceTitle}>
                        {item.title}
                      </h3>

                      <p style={styles.evidenceDescription}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article style={styles.panel}>
              <div style={styles.panelEyebrow}>YOUR NEXT STEPS</div>

              <h2 style={styles.panelTitle}>
                Recommended activities
              </h2>

              <div style={styles.activityGrid}>
                {skill.recommendedActivities.map((activity) => (
                  <div key={activity.title} style={styles.activityCard}>
                    <div style={styles.activityIcon}>→</div>

                    <h3 style={styles.activityTitle}>
                      {activity.title}
                    </h3>

                    <p style={styles.activityDescription}>
                      {activity.description}
                    </p>

                    <div style={styles.activityAction}>
                      {activity.action}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside style={styles.sidebar}>
            <article style={styles.employerCard}>
              <div style={styles.employerEyebrow}>
                EMPLOYER INSIGHT
              </div>

              <h2 style={styles.employerTitle}>
                Why employers value {skill.name.toLowerCase()}
              </h2>

              <p style={styles.employerText}>
                {skill.employerValue}
              </p>
            </article>

            <article style={styles.growthCard}>
              <div style={styles.panelEyebrow}>GROWTH OVER TIME</div>

              <h2 style={styles.growthTitle}>
                Your development
              </h2>

              <div style={styles.growthList}>
                {skill.growth.map((point) => (
                  <div key={point.label} style={styles.growthItem}>
                    <div style={styles.growthLabelRow}>
                      <span>{point.label}</span>
                      <strong>{point.score}%</strong>
                    </div>

                    <div style={styles.growthTrack}>
                      <div
                        style={{
                          ...styles.growthFill,
                          width: `${point.score}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article style={styles.quickCard}>
              <h2 style={styles.quickTitle}>Continue your journey</h2>

              <Link
                href={`/ambassador/student-passport/${id}/portfolio`}
                style={styles.quickLink}
              >
                Open portfolio
              </Link>

              <Link
                href={`/ambassador/student-passport/${id}/reflections`}
                style={styles.quickLink}
              >
                Review reflections
              </Link>

              <Link
                href={`/ambassador/student-dashboard/${id}/skills`}
                style={styles.quickLink}
              >
                View all skills
              </Link>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#F5F7FA",
    color: "#0D1B3D",
    padding: "32px 20px 72px",
  },
  container: {
    width: "100%",
    maxWidth: "1240px",
    margin: "0 auto",
  },
  breadcrumbs: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "22px",
    fontSize: "14px",
    color: "#6B7280",
  },
  breadcrumbLink: {
    color: "#0D1B3D",
    textDecoration: "none",
    fontWeight: 750,
  },
  breadcrumbDivider: {
    color: "#9CA3AF",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.55fr) minmax(280px, 0.65fr)",
    gap: "28px",
    padding: "42px",
    background:
      "linear-gradient(135deg, #0D1B3D 0%, #17356F 75%, #244C91 100%)",
    borderRadius: "28px",
    boxShadow: "0 20px 45px rgba(13, 27, 61, 0.18)",
  },
  heroMain: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  eyebrow: {
    color: "#F2B705",
    fontSize: "12px",
    fontWeight: 850,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: "clamp(40px, 6vw, 66px)",
    lineHeight: 1,
    letterSpacing: "-0.045em",
    margin: "0 0 18px",
  },
  heroDescription: {
    maxWidth: "760px",
    color: "#DDE6F5",
    fontSize: "17px",
    lineHeight: 1.7,
    margin: 0,
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "9px",
    marginTop: "24px",
  },
  tag: {
    display: "inline-flex",
    minHeight: "30px",
    alignItems: "center",
    padding: "0 11px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.11)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: 700,
  },
  scoreCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "30px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "22px",
  },
  scoreLabel: {
    color: "#DDE6F5",
    fontSize: "14px",
    fontWeight: 700,
  },
  scoreValue: {
    color: "#FFFFFF",
    fontSize: "64px",
    lineHeight: 1,
    fontWeight: 900,
    letterSpacing: "-0.05em",
    margin: "12px 0 18px",
  },
  scoreTrack: {
    width: "100%",
    height: "10px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.18)",
    borderRadius: "999px",
  },
  scoreFill: {
    height: "100%",
    background: "#F2B705",
    borderRadius: "999px",
  },
  levelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginTop: "18px",
  },
  levelBadge: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "28px",
    padding: "0 11px",
    borderRadius: "999px",
    background: "#F2B705",
    color: "#0D1B3D",
    fontSize: "12px",
    fontWeight: 850,
  },
  updatedText: {
    color: "#DDE6F5",
    fontSize: "12px",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.6fr) minmax(280px, 0.7fr)",
    gap: "24px",
    alignItems: "start",
    marginTop: "26px",
  },
  mainColumn: {
    display: "grid",
    gap: "24px",
  },
  panel: {
    padding: "30px",
    background: "#FFFFFF",
    border: "1px solid #E1E6EF",
    borderRadius: "22px",
    boxShadow: "0 8px 24px rgba(13, 27, 61, 0.05)",
  },
  panelEyebrow: {
    color: "#9A7600",
    fontSize: "11px",
    fontWeight: 850,
    letterSpacing: "0.12em",
    marginBottom: "8px",
  },
  panelTitle: {
    fontSize: "28px",
    letterSpacing: "-0.03em",
    margin: 0,
  },
  panelIntro: {
    color: "#667085",
    lineHeight: 1.65,
    margin: "12px 0 26px",
  },
  timeline: {
    display: "grid",
    gap: "18px",
  },
  timelineItem: {
    display: "grid",
    gridTemplateColumns: "38px minmax(0, 1fr)",
    gap: "14px",
    alignItems: "start",
  },
  timelineMarker: {
    width: "38px",
    height: "38px",
    display: "grid",
    placeItems: "center",
    borderRadius: "12px",
    background: "#0D1B3D",
    color: "#F2B705",
    fontWeight: 900,
  },
  evidenceCard: {
    padding: "20px",
    background: "#F8FAFC",
    border: "1px solid #E5EAF1",
    borderRadius: "16px",
  },
  evidenceTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  },
  evidenceType: {
    color: "#17356F",
    fontSize: "11px",
    fontWeight: 850,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  evidenceDate: {
    color: "#7A8494",
    fontSize: "12px",
  },
  evidenceTitle: {
    fontSize: "18px",
    margin: "9px 0 7px",
  },
  evidenceDescription: {
    color: "#606A79",
    fontSize: "14px",
    lineHeight: 1.6,
    margin: 0,
  },
  activityGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px",
    marginTop: "22px",
  },
  activityCard: {
    padding: "22px",
    background: "#FFF9E4",
    border: "1px solid #F0D66E",
    borderRadius: "18px",
  },
  activityIcon: {
    width: "36px",
    height: "36px",
    display: "grid",
    placeItems: "center",
    borderRadius: "11px",
    background: "#F2B705",
    color: "#0D1B3D",
    fontWeight: 900,
  },
  activityTitle: {
    fontSize: "18px",
    margin: "16px 0 8px",
  },
  activityDescription: {
    color: "#5C6471",
    fontSize: "14px",
    lineHeight: 1.6,
    margin: 0,
  },
  activityAction: {
    color: "#0D1B3D",
    fontSize: "12px",
    fontWeight: 850,
    marginTop: "16px",
  },
  sidebar: {
    display: "grid",
    gap: "20px",
  },
  employerCard: {
    padding: "28px",
    background: "#0D1B3D",
    borderRadius: "22px",
    boxShadow: "0 12px 28px rgba(13, 27, 61, 0.16)",
  },
  employerEyebrow: {
    color: "#F2B705",
    fontSize: "11px",
    fontWeight: 850,
    letterSpacing: "0.12em",
  },
  employerTitle: {
    color: "#FFFFFF",
    fontSize: "25px",
    lineHeight: 1.18,
    letterSpacing: "-0.025em",
    margin: "10px 0 14px",
  },
  employerText: {
    color: "#DDE6F5",
    fontSize: "14px",
    lineHeight: 1.7,
    margin: 0,
  },
  growthCard: {
    padding: "26px",
    background: "#FFFFFF",
    border: "1px solid #E1E6EF",
    borderRadius: "22px",
  },
  growthTitle: {
    fontSize: "24px",
    margin: 0,
  },
  growthList: {
    display: "grid",
    gap: "18px",
    marginTop: "22px",
  },
  growthItem: {
    display: "grid",
    gap: "8px",
  },
  growthLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    color: "#556070",
    fontSize: "13px",
  },
  growthTrack: {
    width: "100%",
    height: "8px",
    overflow: "hidden",
    background: "#E9EDF3",
    borderRadius: "999px",
  },
  growthFill: {
    height: "100%",
    background: "#F2B705",
    borderRadius: "999px",
  },
  quickCard: {
    display: "grid",
    gap: "10px",
    padding: "24px",
    background: "#FFFFFF",
    border: "1px solid #E1E6EF",
    borderRadius: "22px",
  },
  quickTitle: {
    fontSize: "20px",
    margin: "0 0 6px",
  },
  quickLink: {
    display: "flex",
    alignItems: "center",
    minHeight: "44px",
    padding: "0 14px",
    borderRadius: "11px",
    background: "#F4F6F9",
    color: "#0D1B3D",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 750,
  },
};

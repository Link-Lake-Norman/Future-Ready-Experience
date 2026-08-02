import Link from "next/link";
import {
  futureReadySkills,
  getOverallSkillScore,
} from "@/content/skills";

type SkillsCenterPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getScoreMessage(score: number) {
  if (score >= 85) return "You are demonstrating advanced workplace readiness.";
  if (score >= 75) return "You are building strong, employer-ready competencies.";
  if (score >= 65) return "You are making meaningful progress across your skills.";
  return "Every completed activity helps strengthen your readiness.";
}

export default async function SkillsCenterPage({
  params,
}: SkillsCenterPageProps) {
  const { id } = await params;
  const overallScore = getOverallSkillScore();

  const advancedSkills = futureReadySkills.filter(
    (skill) => skill.level === "Advanced"
  ).length;

  const proficientSkills = futureReadySkills.filter(
    (skill) => skill.level === "Proficient"
  ).length;

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

          <span>Skills Center</span>
        </nav>

        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.eyebrow}>FUTURE READY™ SKILLS CENTER</div>

            <h1 style={styles.heroTitle}>
              Build skills employers recognize.
            </h1>

            <p style={styles.heroText}>
              Your Skills Center connects completed lessons, portfolio work,
              reflections, and facilitator feedback to the competencies you
              are developing throughout your Future Ready™ journey.
            </p>

            <div style={styles.heroActions}>
              <Link
                href={`/ambassador/student-passport/${id}/portfolio`}
                style={styles.primaryButton}
              >
                View My Portfolio
              </Link>

              <Link
                href={`/ambassador/student-passport/${id}`}
                style={styles.secondaryButton}
              >
                Open My Passport
              </Link>
            </div>
          </div>

          <div style={styles.scorePanel}>
            <div style={styles.scoreLabel}>Overall Skill Readiness</div>

            <div style={styles.scoreValue}>{overallScore}%</div>

            <div style={styles.scoreTrack}>
              <div
                style={{
                  ...styles.scoreFill,
                  width: `${overallScore}%`,
                }}
              />
            </div>

            <p style={styles.scoreMessage}>
              {getScoreMessage(overallScore)}
            </p>
          </div>
        </section>

        <section style={styles.summaryGrid}>
          <article style={styles.summaryCard}>
            <div style={styles.summaryIcon}>9</div>
            <div>
              <div style={styles.summaryValue}>Core Skills</div>
              <div style={styles.summaryLabel}>
                Tracked throughout the program
              </div>
            </div>
          </article>

          <article style={styles.summaryCard}>
            <div style={styles.summaryIcon}>{advancedSkills}</div>
            <div>
              <div style={styles.summaryValue}>Advanced</div>
              <div style={styles.summaryLabel}>
                Skills currently above 85%
              </div>
            </div>
          </article>

          <article style={styles.summaryCard}>
            <div style={styles.summaryIcon}>{proficientSkills}</div>
            <div>
              <div style={styles.summaryValue}>Proficient</div>
              <div style={styles.summaryLabel}>
                Skills demonstrating readiness
              </div>
            </div>
          </article>

          <article style={styles.summaryCard}>
            <div style={styles.summaryIcon}>24</div>
            <div>
              <div style={styles.summaryValue}>Evidence Items</div>
              <div style={styles.summaryLabel}>
                Lessons, reflections, and projects
              </div>
            </div>
          </article>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <div style={styles.sectionEyebrow}>
                YOUR COMPETENCY PROFILE
              </div>

              <h2 style={styles.sectionTitle}>
                Explore your Future Ready™ skills
              </h2>
            </div>

            <p style={styles.sectionDescription}>
              Select a skill to review your evidence, growth, employer
              relevance, and recommended next activities.
            </p>
          </div>

          <div style={styles.skillGrid}>
            {futureReadySkills.map((skill) => (
              <Link
                key={skill.slug}
                href={`/ambassador/student-dashboard/${id}/skills/${skill.slug}`}
                style={styles.skillCard}
              >
                <div style={styles.skillTopRow}>
                  <div>
                    <div style={styles.category}>{skill.category}</div>
                    <h3 style={styles.skillName}>{skill.name}</h3>
                  </div>

                  <div style={styles.skillScore}>{skill.score}%</div>
                </div>

                <p style={styles.skillDescription}>
                  {skill.description}
                </p>

                <div style={styles.progressTrack}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${skill.score}%`,
                    }}
                  />
                </div>

                <div style={styles.skillFooter}>
                  <span style={styles.levelBadge}>{skill.level}</span>

                  <span style={styles.reviewLink}>
                    Review skill →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={styles.insightPanel}>
          <div>
            <div style={styles.sectionEyebrow}>WHY THIS MATTERS</div>

            <h2 style={styles.insightTitle}>
              Your skills tell a bigger story than a grade.
            </h2>
          </div>

          <p style={styles.insightText}>
            Future Ready™ tracks how you communicate, collaborate, solve
            problems, respond to feedback, use technology, and contribute to
            real work. This evidence helps schools, mentors, and employers
            understand how you are preparing for your next opportunity.
          </p>
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
    gap: "10px",
    marginBottom: "22px",
    fontSize: "14px",
    color: "#6B7280",
  },
  breadcrumbLink: {
    color: "#0D1B3D",
    textDecoration: "none",
    fontWeight: 700,
  },
  breadcrumbDivider: {
    color: "#9CA3AF",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.55fr) minmax(280px, 0.65fr)",
    gap: "28px",
    padding: "44px",
    background:
      "linear-gradient(135deg, #0D1B3D 0%, #17356F 72%, #244C91 100%)",
    borderRadius: "28px",
    boxShadow: "0 20px 45px rgba(13, 27, 61, 0.18)",
  },
  heroContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  eyebrow: {
    color: "#F2B705",
    fontSize: "13px",
    fontWeight: 800,
    letterSpacing: "0.14em",
    marginBottom: "14px",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: "clamp(34px, 5vw, 58px)",
    lineHeight: 1.02,
    letterSpacing: "-0.04em",
    maxWidth: "720px",
    margin: "0 0 18px",
  },
  heroText: {
    color: "#DDE6F5",
    fontSize: "17px",
    lineHeight: 1.7,
    maxWidth: "760px",
    margin: 0,
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "28px",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "48px",
    padding: "0 20px",
    borderRadius: "12px",
    background: "#F2B705",
    color: "#0D1B3D",
    textDecoration: "none",
    fontWeight: 800,
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "48px",
    padding: "0 20px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.35)",
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 700,
  },
  scorePanel: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "30px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "22px",
    backdropFilter: "blur(8px)",
  },
  scoreLabel: {
    color: "#DDE6F5",
    fontSize: "14px",
    fontWeight: 700,
  },
  scoreValue: {
    color: "#FFFFFF",
    fontSize: "62px",
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
  scoreMessage: {
    color: "#DDE6F5",
    fontSize: "14px",
    lineHeight: 1.55,
    margin: "16px 0 0",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginTop: "24px",
  },
  summaryCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "22px",
    background: "#FFFFFF",
    border: "1px solid #E3E8F0",
    borderRadius: "18px",
    boxShadow: "0 8px 20px rgba(13, 27, 61, 0.06)",
  },
  summaryIcon: {
    width: "48px",
    height: "48px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: "14px",
    background: "#FFF7D6",
    color: "#0D1B3D",
    fontWeight: 900,
    fontSize: "19px",
  },
  summaryValue: {
    color: "#0D1B3D",
    fontWeight: 850,
    fontSize: "17px",
  },
  summaryLabel: {
    color: "#6B7280",
    fontSize: "13px",
    lineHeight: 1.45,
    marginTop: "3px",
  },
  section: {
    marginTop: "52px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "28px",
    marginBottom: "24px",
  },
  sectionEyebrow: {
    color: "#B18400",
    fontSize: "12px",
    fontWeight: 850,
    letterSpacing: "0.13em",
    marginBottom: "8px",
  },
  sectionTitle: {
    fontSize: "clamp(28px, 4vw, 40px)",
    letterSpacing: "-0.035em",
    margin: 0,
  },
  sectionDescription: {
    maxWidth: "470px",
    color: "#6B7280",
    lineHeight: 1.65,
    margin: 0,
  },
  skillGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "18px",
  },
  skillCard: {
    display: "flex",
    flexDirection: "column",
    minHeight: "295px",
    padding: "24px",
    background: "#FFFFFF",
    border: "1px solid #E1E6EF",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(13, 27, 61, 0.06)",
    textDecoration: "none",
    color: "#0D1B3D",
  },
  skillTopRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px",
  },
  category: {
    color: "#8A6A00",
    fontSize: "11px",
    fontWeight: 850,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  skillName: {
    fontSize: "23px",
    letterSpacing: "-0.025em",
    margin: "7px 0 0",
  },
  skillScore: {
    minWidth: "58px",
    textAlign: "right",
    color: "#0D1B3D",
    fontSize: "22px",
    fontWeight: 900,
  },
  skillDescription: {
    flex: 1,
    color: "#5F6878",
    fontSize: "14px",
    lineHeight: 1.65,
    margin: "18px 0 22px",
  },
  progressTrack: {
    width: "100%",
    height: "8px",
    overflow: "hidden",
    background: "#E9EDF3",
    borderRadius: "999px",
  },
  progressFill: {
    height: "100%",
    background: "#F2B705",
    borderRadius: "999px",
  },
  skillFooter: {
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
    padding: "0 10px",
    borderRadius: "999px",
    background: "#EEF3FB",
    color: "#17356F",
    fontSize: "12px",
    fontWeight: 800,
  },
  reviewLink: {
    color: "#0D1B3D",
    fontSize: "13px",
    fontWeight: 850,
  },
  insightPanel: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
    gap: "36px",
    alignItems: "center",
    marginTop: "52px",
    padding: "38px",
    background: "#FFF8DC",
    border: "1px solid #F1D56A",
    borderRadius: "24px",
  },
  insightTitle: {
    fontSize: "30px",
    lineHeight: 1.15,
    letterSpacing: "-0.03em",
    margin: 0,
  },
  insightText: {
    color: "#4E5666",
    fontSize: "16px",
    lineHeight: 1.75,
    margin: 0,
  },
};

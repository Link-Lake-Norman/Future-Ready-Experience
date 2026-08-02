import Link from "next/link";
import {
  futureReadyBadges,
  getBadgeCounts,
} from "@/content/badges";

type BadgeCenterPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getStatusStyles(status: string): React.CSSProperties {
  if (status === "Earned") {
    return {
      background: "#E7F7ED",
      color: "#17683A",
      border: "1px solid #B8E5C8",
    };
  }

  if (status === "In Progress") {
    return {
      background: "#FFF7D6",
      color: "#7A5A00",
      border: "1px solid #F0D66E",
    };
  }

  return {
    background: "#EEF1F5",
    color: "#667085",
    border: "1px solid #D9DEE7",
  };
}

export default async function BadgeCenterPage({
  params,
}: BadgeCenterPageProps) {
  const { id } = await params;
  const counts = getBadgeCounts();

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

          <span style={styles.divider}>/</span>
          <span>Badge Center</span>
        </nav>

        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.eyebrow}>
              FUTURE READY™ BADGE CENTER
            </div>

            <h1 style={styles.heroTitle}>
              Turn progress into verified achievement.
            </h1>

            <p style={styles.heroText}>
              Every badge represents demonstrated growth through lessons,
              reflections, projects, portfolio evidence, and facilitator
              verification.
            </p>

            <div style={styles.heroActions}>
              <Link
                href={`/ambassador/student-dashboard/${id}/skills`}
                style={styles.primaryButton}
              >
                View Skills Center
              </Link>

              <Link
                href={`/ambassador/student-passport/${id}`}
                style={styles.secondaryButton}
              >
                Open My Passport
              </Link>
            </div>
          </div>

          <div style={styles.heroBadge}>
            <div style={styles.heroBadgeIcon}>🏅</div>
            <div style={styles.heroBadgeNumber}>
              {counts.earned}
            </div>
            <div style={styles.heroBadgeLabel}>
              Badges Earned
            </div>
            <div style={styles.heroBadgeSubtext}>
              {counts.inProgress} currently in progress
            </div>
          </div>
        </section>

        <section style={styles.statsGrid}>
          <article style={styles.statCard}>
            <div style={styles.statNumber}>{counts.total}</div>
            <div>
              <div style={styles.statTitle}>Total Badges</div>
              <div style={styles.statText}>
                Across all six phases
              </div>
            </div>
          </article>

          <article style={styles.statCard}>
            <div style={styles.statNumber}>{counts.earned}</div>
            <div>
              <div style={styles.statTitle}>Earned</div>
              <div style={styles.statText}>
                Verified achievements
              </div>
            </div>
          </article>

          <article style={styles.statCard}>
            <div style={styles.statNumber}>
              {counts.inProgress}
            </div>
            <div>
              <div style={styles.statTitle}>In Progress</div>
              <div style={styles.statText}>
                Close to completion
              </div>
            </div>
          </article>

          <article style={styles.statCard}>
            <div style={styles.statNumber}>{counts.locked}</div>
            <div>
              <div style={styles.statTitle}>Upcoming</div>
              <div style={styles.statText}>
                Unlocked later in the journey
              </div>
            </div>
          </article>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <div style={styles.sectionEyebrow}>
                ACHIEVEMENT PATHWAY
              </div>

              <h2 style={styles.sectionTitle}>
                Your Future Ready™ credentials
              </h2>
            </div>

            <p style={styles.sectionText}>
              Select a badge to review requirements, evidence,
              competencies, and next steps.
            </p>
          </div>

          <div style={styles.badgeGrid}>
            {futureReadyBadges.map((badge) => (
              <Link
                key={badge.slug}
                href={`/ambassador/student-dashboard/${id}/badges/${badge.slug}`}
                style={styles.badgeCard}
              >
                <div style={styles.badgeTop}>
                  <div
                    style={{
                      ...styles.iconCircle,
                      opacity: badge.status === "Locked" ? 0.55 : 1,
                    }}
                  >
                    {badge.icon}
                  </div>

                  <span
                    style={{
                      ...styles.statusBadge,
                      ...getStatusStyles(badge.status),
                    }}
                  >
                    {badge.status}
                  </span>
                </div>

                <div style={styles.phase}>
                  {badge.phase}
                </div>

                <h3 style={styles.badgeName}>
                  {badge.name}
                </h3>

                <p style={styles.badgeDescription}>
                  {badge.description}
                </p>

                <div style={styles.progressLabelRow}>
                  <span>Progress</span>
                  <strong>{badge.progress}%</strong>
                </div>

                <div style={styles.progressTrack}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${badge.progress}%`,
                    }}
                  />
                </div>

                <div style={styles.cardFooter}>
                  <span>
                    {badge.requirements.filter(
                      (item) => item.completed
                    ).length}
                    /{badge.requirements.length} requirements
                  </span>

                  <strong>View badge →</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={styles.insightPanel}>
          <div>
            <div style={styles.sectionEyebrow}>
              VERIFIED CREDENTIALS
            </div>

            <h2 style={styles.insightTitle}>
              Badges connect learning to real evidence.
            </h2>
          </div>

          <p style={styles.insightText}>
            Future Ready™ badges are earned through completed work,
            demonstrated behavior, reflection, and facilitator review.
            They help students show employers and educators what they
            can do—not only what courses they completed.
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
  divider: {
    color: "#9CA3AF",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.5fr) minmax(260px, 0.5fr)",
    gap: "28px",
    padding: "42px",
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
    fontSize: "12px",
    fontWeight: 850,
    letterSpacing: "0.13em",
    marginBottom: "12px",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: "clamp(36px, 5vw, 60px)",
    lineHeight: 1.03,
    letterSpacing: "-0.045em",
    margin: "0 0 18px",
    maxWidth: "760px",
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
    fontWeight: 850,
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
    fontWeight: 750,
  },
  heroBadge: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 0,
    padding: "28px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "22px",
    textAlign: "center",
  },
  heroBadgeIcon: {
    fontSize: "52px",
    lineHeight: 1,
  },
  heroBadgeNumber: {
    color: "#FFFFFF",
    fontSize: "58px",
    lineHeight: 1,
    fontWeight: 900,
    marginTop: "12px",
  },
  heroBadgeLabel: {
    color: "#FFFFFF",
    fontSize: "17px",
    fontWeight: 800,
    marginTop: "8px",
  },
  heroBadgeSubtext: {
    color: "#DDE6F5",
    fontSize: "13px",
    marginTop: "6px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginTop: "24px",
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    minWidth: 0,
    padding: "22px",
    background: "#FFFFFF",
    border: "1px solid #E3E8F0",
    borderRadius: "18px",
    boxShadow: "0 8px 20px rgba(13, 27, 61, 0.06)",
  },
  statNumber: {
    width: "48px",
    height: "48px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: "14px",
    background: "#FFF7D6",
    fontWeight: 900,
    fontSize: "19px",
  },
  statTitle: {
    fontWeight: 850,
    fontSize: "17px",
  },
  statText: {
    color: "#6B7280",
    fontSize: "13px",
    lineHeight: 1.4,
    marginTop: "3px",
  },
  section: {
    marginTop: "52px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "24px",
    marginBottom: "24px",
  },
  sectionEyebrow: {
    color: "#9A7600",
    fontSize: "11px",
    fontWeight: 850,
    letterSpacing: "0.12em",
    marginBottom: "8px",
  },
  sectionTitle: {
    fontSize: "clamp(28px, 4vw, 40px)",
    letterSpacing: "-0.035em",
    margin: 0,
  },
  sectionText: {
    maxWidth: "470px",
    color: "#6B7280",
    lineHeight: 1.65,
    margin: 0,
  },
  badgeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "18px",
  },
  badgeCard: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    minHeight: "365px",
    padding: "24px",
    background: "#FFFFFF",
    border: "1px solid #E1E6EF",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(13, 27, 61, 0.06)",
    color: "#0D1B3D",
    textDecoration: "none",
  },
  badgeTop: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "14px",
  },
  iconCircle: {
    width: "62px",
    height: "62px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: "18px",
    background: "#FFF7D6",
    fontSize: "31px",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "28px",
    padding: "0 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 850,
    whiteSpace: "nowrap",
  },
  phase: {
    color: "#9A7600",
    fontSize: "11px",
    fontWeight: 850,
    letterSpacing: "0.11em",
    marginTop: "20px",
  },
  badgeName: {
    fontSize: "22px",
    lineHeight: 1.2,
    letterSpacing: "-0.025em",
    margin: "7px 0 10px",
  },
  badgeDescription: {
    flex: 1,
    color: "#5F6878",
    fontSize: "14px",
    lineHeight: 1.62,
    margin: 0,
  },
  progressLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    color: "#596273",
    fontSize: "12px",
    marginTop: "22px",
  },
  progressTrack: {
    width: "100%",
    height: "8px",
    overflow: "hidden",
    background: "#E9EDF3",
    borderRadius: "999px",
    marginTop: "8px",
  },
  progressFill: {
    height: "100%",
    background: "#F2B705",
    borderRadius: "999px",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "8px 14px",
    color: "#667085",
    fontSize: "12px",
    marginTop: "16px",
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

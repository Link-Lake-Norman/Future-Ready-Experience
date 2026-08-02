import Link from "next/link";
import { notFound } from "next/navigation";
import {
  futureReadyBadges,
  getBadgeBySlug,
} from "@/content/badges";

type BadgeDetailPageProps = {
  params: Promise<{
    id: string;
    badge: string;
  }>;
};

export function generateStaticParams() {
  return futureReadyBadges.map((badge) => ({
    badge: badge.slug,
  }));
}

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

export default async function BadgeDetailPage({
  params,
}: BadgeDetailPageProps) {
  const { id, badge: badgeSlug } = await params;
  const badge = getBadgeBySlug(badgeSlug);

  if (!badge) {
    notFound();
  }

  const completedRequirements = badge.requirements.filter(
    (item) => item.completed
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

          <span style={styles.divider}>/</span>

          <Link
            href={`/ambassador/student-dashboard/${id}/badges`}
            style={styles.breadcrumbLink}
          >
            Badge Center
          </Link>

          <span style={styles.divider}>/</span>
          <span>{badge.name}</span>
        </nav>

        <section style={styles.hero}>
          <div style={styles.heroIconWrap}>
            <div style={styles.heroIcon}>{badge.icon}</div>
          </div>

          <div style={styles.heroContent}>
            <div style={styles.heroTopRow}>
              <span style={styles.phase}>{badge.phase}</span>

              <span
                style={{
                  ...styles.statusBadge,
                  ...getStatusStyles(badge.status),
                }}
              >
                {badge.status}
              </span>
            </div>

            <h1 style={styles.heroTitle}>
              {badge.name}
            </h1>

            <p style={styles.heroText}>
              {badge.description}
            </p>

            {badge.earnedDate ? (
              <div style={styles.earnedDate}>
                Earned {badge.earnedDate}
              </div>
            ) : null}
          </div>

          <div style={styles.progressPanel}>
            <div style={styles.progressLabel}>
              Badge Progress
            </div>

            <div style={styles.progressValue}>
              {badge.progress}%
            </div>

            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${badge.progress}%`,
                }}
              />
            </div>

            <div style={styles.progressNote}>
              {completedRequirements}/{badge.requirements.length} requirements completed
            </div>
          </div>
        </section>

        <section style={styles.contentGrid}>
          <div style={styles.mainColumn}>
            <article style={styles.panel}>
              <div style={styles.panelEyebrow}>
                BADGE REQUIREMENTS
              </div>

              <h2 style={styles.panelTitle}>
                What you need to demonstrate
              </h2>

              <div style={styles.requirementList}>
                {badge.requirements.map((requirement) => (
                  <div
                    key={requirement.label}
                    style={styles.requirementItem}
                  >
                    <div
                      style={{
                        ...styles.checkCircle,
                        ...(requirement.completed
                          ? styles.checkComplete
                          : styles.checkIncomplete),
                      }}
                    >
                      {requirement.completed ? "✓" : ""}
                    </div>

                    <span
                      style={{
                        ...styles.requirementText,
                        color: requirement.completed
                          ? "#263246"
                          : "#667085",
                      }}
                    >
                      {requirement.label}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article style={styles.panel}>
              <div style={styles.panelEyebrow}>
                VERIFIED EVIDENCE
              </div>

              <h2 style={styles.panelTitle}>
                Work connected to this badge
              </h2>

              {badge.evidence.length > 0 ? (
                <div style={styles.evidenceGrid}>
                  {badge.evidence.map((item) => (
                    <div
                      key={`${item.type}-${item.title}`}
                      style={styles.evidenceCard}
                    >
                      <div style={styles.evidenceType}>
                        {item.type}
                      </div>

                      <h3 style={styles.evidenceTitle}>
                        {item.title}
                      </h3>

                      <p style={styles.evidenceDescription}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.emptyState}>
                  Evidence will appear here as you complete the
                  required lessons, projects, and reflections.
                </div>
              )}
            </article>
          </div>

          <aside style={styles.sidebar}>
            <article style={styles.competencyCard}>
              <div style={styles.panelEyebrow}>
                RELATED COMPETENCIES
              </div>

              <h2 style={styles.sidebarTitle}>
                Skills represented
              </h2>

              <div style={styles.competencyList}>
                {badge.competencies.map((competency) => (
                  <span
                    key={competency}
                    style={styles.competencyTag}
                  >
                    {competency}
                  </span>
                ))}
              </div>
            </article>

            <article style={styles.nextStepCard}>
              <div style={styles.nextStepEyebrow}>
                NEXT ACTION
              </div>

              <h2 style={styles.nextStepTitle}>
                Keep moving forward
              </h2>

              <p style={styles.nextStepText}>
                {badge.nextStep}
              </p>
            </article>

            <article style={styles.quickCard}>
              <h2 style={styles.quickTitle}>
                Continue your journey
              </h2>

              <Link
                href={`/ambassador/student-dashboard/${id}/badges`}
                style={styles.quickLink}
              >
                View all badges
              </Link>

              <Link
                href={`/ambassador/student-dashboard/${id}/skills`}
                style={styles.quickLink}
              >
                Open Skills Center
              </Link>

              <Link
                href={`/ambassador/student-passport/${id}/portfolio`}
                style={styles.quickLink}
              >
                Open portfolio
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
  divider: {
    color: "#9CA3AF",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "120px minmax(0, 1fr) minmax(250px, 0.45fr)",
    alignItems: "center",
    gap: "28px",
    padding: "38px",
    background:
      "linear-gradient(135deg, #0D1B3D 0%, #17356F 72%, #244C91 100%)",
    borderRadius: "28px",
    boxShadow: "0 20px 45px rgba(13, 27, 61, 0.18)",
  },
  heroIconWrap: {
    display: "flex",
    justifyContent: "center",
  },
  heroIcon: {
    width: "104px",
    height: "104px",
    display: "grid",
    placeItems: "center",
    background: "#FFF7D6",
    border: "5px solid rgba(255,255,255,0.18)",
    borderRadius: "30px",
    fontSize: "52px",
  },
  heroContent: {
    minWidth: 0,
  },
  heroTopRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  phase: {
    color: "#F2B705",
    fontSize: "12px",
    fontWeight: 850,
    letterSpacing: "0.12em",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "28px",
    padding: "0 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 850,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: "clamp(38px, 5vw, 60px)",
    lineHeight: 1.02,
    letterSpacing: "-0.045em",
    margin: "12px 0 14px",
  },
  heroText: {
    color: "#DDE6F5",
    fontSize: "16px",
    lineHeight: 1.7,
    margin: 0,
  },
  earnedDate: {
    color: "#F2B705",
    fontSize: "13px",
    fontWeight: 800,
    marginTop: "16px",
  },
  progressPanel: {
    minWidth: 0,
    padding: "24px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "20px",
  },
  progressLabel: {
    color: "#DDE6F5",
    fontSize: "13px",
    fontWeight: 750,
  },
  progressValue: {
    color: "#FFFFFF",
    fontSize: "54px",
    lineHeight: 1,
    fontWeight: 900,
    margin: "10px 0 15px",
  },
  progressTrack: {
    width: "100%",
    height: "9px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.18)",
    borderRadius: "999px",
  },
  progressFill: {
    height: "100%",
    background: "#F2B705",
    borderRadius: "999px",
  },
  progressNote: {
    color: "#DDE6F5",
    fontSize: "12px",
    lineHeight: 1.45,
    marginTop: "12px",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.55fr) minmax(280px, 0.65fr)",
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
  requirementList: {
    display: "grid",
    gap: "14px",
    marginTop: "24px",
  },
  requirementItem: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "16px",
    background: "#F8FAFC",
    border: "1px solid #E5EAF1",
    borderRadius: "14px",
  },
  checkCircle: {
    width: "30px",
    height: "30px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: "999px",
    fontSize: "15px",
    fontWeight: 900,
  },
  checkComplete: {
    background: "#DDF4E6",
    color: "#17683A",
    border: "1px solid #A9DBBC",
  },
  checkIncomplete: {
    background: "#EEF1F5",
    color: "#667085",
    border: "1px solid #D7DDE6",
  },
  requirementText: {
    fontSize: "14px",
    lineHeight: 1.5,
  },
  evidenceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px",
    marginTop: "24px",
  },
  evidenceCard: {
    padding: "20px",
    background: "#F8FAFC",
    border: "1px solid #E5EAF1",
    borderRadius: "16px",
  },
  evidenceType: {
    color: "#17356F",
    fontSize: "11px",
    fontWeight: 850,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  evidenceTitle: {
    fontSize: "18px",
    margin: "9px 0 8px",
  },
  evidenceDescription: {
    color: "#606A79",
    fontSize: "14px",
    lineHeight: 1.62,
    margin: 0,
  },
  emptyState: {
    marginTop: "24px",
    padding: "26px",
    background: "#F8FAFC",
    border: "1px dashed #C9D0DB",
    borderRadius: "16px",
    color: "#667085",
    lineHeight: 1.65,
  },
  sidebar: {
    display: "grid",
    gap: "20px",
  },
  competencyCard: {
    padding: "26px",
    background: "#FFFFFF",
    border: "1px solid #E1E6EF",
    borderRadius: "22px",
  },
  sidebarTitle: {
    fontSize: "23px",
    margin: 0,
  },
  competencyList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "9px",
    marginTop: "18px",
  },
  competencyTag: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "31px",
    padding: "0 11px",
    background: "#EEF3FB",
    border: "1px solid #D7E1F0",
    borderRadius: "999px",
    color: "#17356F",
    fontSize: "12px",
    fontWeight: 750,
  },
  nextStepCard: {
    padding: "26px",
    background: "#FFF8DC",
    border: "1px solid #F0D66E",
    borderRadius: "22px",
  },
  nextStepEyebrow: {
    color: "#8B6A00",
    fontSize: "11px",
    fontWeight: 850,
    letterSpacing: "0.12em",
  },
  nextStepTitle: {
    fontSize: "23px",
    margin: "9px 0 12px",
  },
  nextStepText: {
    color: "#535C69",
    fontSize: "14px",
    lineHeight: 1.65,
    margin: 0,
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

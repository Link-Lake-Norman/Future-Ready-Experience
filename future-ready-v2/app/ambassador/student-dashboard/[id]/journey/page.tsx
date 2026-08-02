import Link from "next/link";
import {
  futurePathways,
  journeyPhases,
  journeyStats,
  type JourneyPhaseStatus,
} from "@/content/journey";

type JourneyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getStatusStyles(
  status: JourneyPhaseStatus
): React.CSSProperties {
  if (status === "Completed") {
    return {
      background: "#E7F7ED",
      color: "#17683A",
      border: "1px solid #B8E5C8",
    };
  }

  if (status === "Current") {
    return {
      background: "#FFF4BF",
      color: "#725500",
      border: "1px solid #F2CF4A",
    };
  }

  if (status === "Upcoming") {
    return {
      background: "#EEF3FB",
      color: "#21447B",
      border: "1px solid #CBD8EA",
    };
  }

  return {
    background: "#EEF1F5",
    color: "#667085",
    border: "1px solid #D9DEE7",
  };
}

function getPhaseCardStyles(
  status: JourneyPhaseStatus
): React.CSSProperties {
  if (status === "Current") {
    return {
      border: "2px solid #F2B705",
      boxShadow: "0 18px 40px rgba(242, 183, 5, 0.18)",
    };
  }

  if (status === "Completed") {
    return {
      border: "1px solid #B8E5C8",
      boxShadow: "0 10px 24px rgba(23, 104, 58, 0.08)",
    };
  }

  return {
    border: "1px solid #E1E6EF",
    boxShadow: "0 8px 24px rgba(13, 27, 61, 0.05)",
  };
}

export default async function JourneyPage({
  params,
}: JourneyPageProps) {
  const { id } = await params;

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
          <span>Journey Map</span>
        </nav>

        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.eyebrow}>
              FUTURE READY™ JOURNEY
            </div>

            <h1 style={styles.heroTitle}>
              See where you are. Know where you are going.
            </h1>

            <p style={styles.heroText}>
              Your Journey Map connects lessons, skills, badges,
              reflections, portfolio evidence, employer experiences,
              and your next steps into one clear pathway.
            </p>

            <div style={styles.heroActions}>
              <Link
                href={`/ambassador/student-dashboard/${id}/skills`}
                style={styles.primaryButton}
              >
                View Skills Center
              </Link>

              <Link
                href={`/ambassador/student-dashboard/${id}/badges`}
                style={styles.secondaryButton}
              >
                View Badge Center
              </Link>
            </div>
          </div>

          <div style={styles.heroProgressCard}>
            <div style={styles.heroProgressLabel}>
              Overall Journey Progress
            </div>

            <div style={styles.heroProgressNumber}>
              {journeyStats.overallProgress}%
            </div>

            <div style={styles.heroProgressTrack}>
              <div
                style={{
                  ...styles.heroProgressFill,
                  width: `${journeyStats.overallProgress}%`,
                }}
              />
            </div>

            <div style={styles.currentLocation}>
              <span style={styles.locationPin}>📍</span>

              <div>
                <div style={styles.locationLabel}>
                  YOU ARE HERE
                </div>

                <div style={styles.locationPhase}>
                  {journeyStats.currentPhase}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.statsGrid}>
          <article style={styles.statCard}>
            <div style={styles.statIcon}>📘</div>

            <div>
              <div style={styles.statNumber}>
                {journeyStats.lessonsCompleted}/
                {journeyStats.lessonsTotal}
              </div>

              <div style={styles.statLabel}>
                Lessons Completed
              </div>
            </div>
          </article>

          <article style={styles.statCard}>
            <div style={styles.statIcon}>⚡</div>

            <div>
              <div style={styles.statNumber}>
                {journeyStats.skillsEarned}/
                {journeyStats.skillsTotal}
              </div>

              <div style={styles.statLabel}>
                Skills Developed
              </div>
            </div>
          </article>

          <article style={styles.statCard}>
            <div style={styles.statIcon}>🏅</div>

            <div>
              <div style={styles.statNumber}>
                {journeyStats.badgesEarned}/
                {journeyStats.badgesTotal}
              </div>

              <div style={styles.statLabel}>
                Badges Earned
              </div>
            </div>
          </article>

          <article style={styles.statCard}>
            <div style={styles.statIcon}>📁</div>

            <div>
              <div style={styles.statNumber}>
                {journeyStats.portfolioPieces}
              </div>

              <div style={styles.statLabel}>
                Portfolio Pieces
              </div>
            </div>
          </article>

          <article style={styles.statCard}>
            <div style={styles.statIcon}>✍️</div>

            <div>
              <div style={styles.statNumber}>
                {journeyStats.reflectionEntries}
              </div>

              <div style={styles.statLabel}>
                Reflections
              </div>
            </div>
          </article>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <div style={styles.sectionEyebrow}>
                SIX-PHASE PATHWAY
              </div>

              <h2 style={styles.sectionTitle}>
                Your complete Future Ready™ journey
              </h2>
            </div>

            <p style={styles.sectionText}>
              Each phase builds on the one before it. Progress
              through discovery, skill development, career
              exploration, professional connection, experience,
              and launch.
            </p>
          </div>

          <div style={styles.timeline}>
            {journeyPhases.map((phase, index) => (
              <div
                key={phase.slug}
                style={styles.timelineItem}
              >
                <div style={styles.timelineRail}>
                  <div
                    style={{
                      ...styles.timelineMarker,
                      ...(phase.status === "Current"
                        ? styles.currentMarker
                        : phase.status === "Completed"
                          ? styles.completedMarker
                          : styles.upcomingMarker),
                    }}
                  >
                    {phase.status === "Completed"
                      ? "✓"
                      : phase.number}
                  </div>

                  {index < journeyPhases.length - 1 ? (
                    <div
                      style={{
                        ...styles.timelineLine,
                        background:
                          phase.status === "Completed"
                            ? "#88C79F"
                            : "#D8DEE8",
                      }}
                    />
                  ) : null}
                </div>

                <article
                  style={{
                    ...styles.phaseCard,
                    ...getPhaseCardStyles(phase.status),
                    opacity:
                      phase.status === "Locked" ? 0.75 : 1,
                  }}
                >
                  <div style={styles.phaseTopRow}>
                    <div style={styles.phaseIdentity}>
                      <div style={styles.phaseIcon}>
                        {phase.icon}
                      </div>

                      <div>
                        <div style={styles.phaseNumber}>
                          PHASE {phase.number}
                        </div>

                        <h3 style={styles.phaseName}>
                          {phase.name}
                        </h3>
                      </div>
                    </div>

                    <span
                      style={{
                        ...styles.statusPill,
                        ...getStatusStyles(phase.status),
                      }}
                    >
                      {phase.status}
                    </span>
                  </div>

                  {phase.status === "Current" ? (
                    <div style={styles.youAreHere}>
                      📍 YOU ARE HERE
                    </div>
                  ) : null}

                  <p style={styles.phaseTagline}>
                    {phase.tagline}
                  </p>

                  <p style={styles.phaseDescription}>
                    {phase.description}
                  </p>

                  <div style={styles.phaseProgressHeader}>
                    <span>Phase progress</span>
                    <strong>{phase.progress}%</strong>
                  </div>

                  <div style={styles.phaseProgressTrack}>
                    <div
                      style={{
                        ...styles.phaseProgressFill,
                        width: `${phase.progress}%`,
                      }}
                    />
                  </div>

                  <div style={styles.phaseStats}>
                    <div style={styles.phaseStat}>
                      <strong>
                        {phase.lessonsCompleted}/
                        {phase.lessonsTotal}
                      </strong>
                      <span>Lessons</span>
                    </div>

                    <div style={styles.phaseStat}>
                      <strong>{phase.skills.length}</strong>
                      <span>Skills</span>
                    </div>

                    <div style={styles.phaseStat}>
                      <strong>{phase.badges.length}</strong>
                      <span>Badges</span>
                    </div>

                    <div style={styles.phaseStat}>
                      <strong>
                        {phase.portfolioEvidence.length}
                      </strong>
                      <span>Portfolio</span>
                    </div>

                    <div style={styles.phaseStat}>
                      <strong>{phase.reflections}</strong>
                      <span>Reflections</span>
                    </div>
                  </div>

                  <div style={styles.phaseDetailsGrid}>
                    <div style={styles.detailBlock}>
                      <div style={styles.detailTitle}>
                        Milestones
                      </div>

                      <div style={styles.milestoneList}>
                        {phase.milestones.map((milestone) => (
                          <div
                            key={milestone.label}
                            style={styles.milestoneItem}
                          >
                            <div
                              style={{
                                ...styles.milestoneCheck,
                                background: milestone.completed
                                  ? "#DDF4E6"
                                  : "#EEF1F5",
                                color: milestone.completed
                                  ? "#17683A"
                                  : "#667085",
                                borderColor:
                                  milestone.completed
                                    ? "#A9DBBC"
                                    : "#D7DDE6",
                              }}
                            >
                              {milestone.completed ? "✓" : ""}
                            </div>

                            <span>
                              {milestone.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={styles.detailBlock}>
                      <div style={styles.detailTitle}>
                        Skills
                      </div>

                      <div style={styles.tagList}>
                        {phase.skills.map((skill) => (
                          <span
                            key={skill}
                            style={styles.skillTag}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div
                        style={{
                          ...styles.detailTitle,
                          marginTop: "22px",
                        }}
                      >
                        Badges
                      </div>

                      <div style={styles.badgeList}>
                        {phase.badges.map((badge) => (
                          <div
                            key={badge}
                            style={styles.badgeItem}
                          >
                            🏅 {badge}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={styles.nextStepPanel}>
                    <div style={styles.nextStepLabel}>
                      NEXT STEP
                    </div>

                    <div style={styles.nextStepText}>
                      {phase.nextStep}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.graduationSection}>
          <div style={styles.graduationContent}>
            <div style={styles.sectionEyebrow}>
              GRADUATION TRACKER
            </div>

            <h2 style={styles.graduationTitle}>
              Future Ready™ Graduate
            </h2>

            <p style={styles.graduationText}>
              Complete all six phases, build a verified
              portfolio, demonstrate workplace-ready skills,
              and present your Future Ready™ Showcase.
            </p>

            <div style={styles.graduationProgressHeader}>
              <span>Journey completion</span>
              <strong>
                {journeyStats.overallProgress}%
              </strong>
            </div>

            <div style={styles.graduationTrack}>
              <div
                style={{
                  ...styles.graduationFill,
                  width: `${journeyStats.overallProgress}%`,
                }}
              />
            </div>

            <div style={styles.graduationMetaGrid}>
              <div style={styles.graduationMetaCard}>
                <div style={styles.metaLabel}>
                  Next Milestone
                </div>

                <div style={styles.metaValue}>
                  {journeyStats.nextMilestone}
                </div>
              </div>

              <div style={styles.graduationMetaCard}>
                <div style={styles.metaLabel}>
                  Estimated Completion
                </div>

                <div style={styles.metaValue}>
                  {journeyStats.estimatedCompletion}
                </div>
              </div>
            </div>
          </div>

          <div style={styles.graduationBadge}>
            <div style={styles.graduationBadgeIcon}>
              🎓
            </div>

            <div style={styles.graduationBadgeTitle}>
              Graduate Credential
            </div>

            <div style={styles.graduationBadgeText}>
              Locked until all requirements are completed
            </div>
          </div>
        </section>

        <section style={styles.pathwaySection}>
          <div style={styles.sectionHeader}>
            <div>
              <div style={styles.sectionEyebrow}>
                YOUR FUTURE PATH
              </div>

              <h2 style={styles.sectionTitle}>
                Where could this journey take you?
              </h2>
            </div>

            <p style={styles.sectionText}>
              Future Ready™ prepares students to make informed
              decisions and move confidently into the pathway
              that fits their goals.
            </p>
          </div>

          <div style={styles.pathwayGrid}>
            {futurePathways.map((pathway) => (
              <article
                key={pathway.title}
                style={styles.pathwayCard}
              >
                <div style={styles.pathwayIcon}>
                  {pathway.icon}
                </div>

                <h3 style={styles.pathwayTitle}>
                  {pathway.title}
                </h3>

                <p style={styles.pathwayText}>
                  {pathway.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section style={styles.actionPanel}>
          <div>
            <div style={styles.sectionEyebrow}>
              KEEP MOVING
            </div>

            <h2 style={styles.actionTitle}>
              Your next milestone is waiting.
            </h2>

            <p style={styles.actionText}>
              Continue building your skills, completing
              evidence, earning badges, and documenting your
              progress.
            </p>
          </div>

          <div style={styles.actionButtons}>
            <Link
              href={`/ambassador/student-passport/${id}/portfolio`}
              style={styles.darkButton}
            >
              Open Portfolio
            </Link>

            <Link
              href={`/ambassador/student-passport/${id}/reflections`}
              style={styles.outlineButton}
            >
              Add Reflection
            </Link>
          </div>
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
    gridTemplateColumns:
      "minmax(0, 1.45fr) minmax(280px, 0.55fr)",
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
    minWidth: 0,
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
    maxWidth: "780px",
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
  heroProgressCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
    padding: "28px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "22px",
  },
  heroProgressLabel: {
    color: "#DDE6F5",
    fontSize: "13px",
    fontWeight: 750,
  },
  heroProgressNumber: {
    color: "#FFFFFF",
    fontSize: "clamp(44px, 6vw, 64px)",
    lineHeight: 1,
    fontWeight: 900,
    marginTop: "10px",
  },
  heroProgressTrack: {
    width: "100%",
    height: "10px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.18)",
    borderRadius: "999px",
    marginTop: "18px",
  },
  heroProgressFill: {
    height: "100%",
    background: "#F2B705",
    borderRadius: "999px",
  },
  currentLocation: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.16)",
  },
  locationPin: {
    flexShrink: 0,
    fontSize: "28px",
  },
  locationLabel: {
    color: "#F2B705",
    fontSize: "10px",
    fontWeight: 900,
    letterSpacing: "0.12em",
  },
  locationPhase: {
    color: "#FFFFFF",
    fontSize: "19px",
    fontWeight: 850,
    marginTop: "3px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: "15px",
    marginTop: "24px",
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    minWidth: 0,
    padding: "20px",
    background: "#FFFFFF",
    border: "1px solid #E3E8F0",
    borderRadius: "18px",
    boxShadow: "0 8px 20px rgba(13, 27, 61, 0.05)",
    overflow: "hidden",
  },
  statIcon: {
    width: "44px",
    height: "44px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    background: "#FFF7D6",
    borderRadius: "13px",
    fontSize: "21px",
  },
  statNumber: {
    fontSize: "19px",
    fontWeight: 900,
    lineHeight: 1.1,
  },
  statLabel: {
    color: "#6B7280",
    fontSize: "12px",
    lineHeight: 1.35,
    marginTop: "4px",
  },
  section: {
    marginTop: "58px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "24px",
    marginBottom: "26px",
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
    maxWidth: "500px",
    color: "#6B7280",
    lineHeight: 1.65,
    margin: 0,
  },
  timeline: {
    display: "grid",
    gap: "0",
  },
  timelineItem: {
    display: "grid",
    gridTemplateColumns: "64px minmax(0, 1fr)",
    gap: "20px",
    minWidth: 0,
  },
  timelineRail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  timelineMarker: {
    width: "48px",
    height: "48px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: "999px",
    fontSize: "16px",
    fontWeight: 900,
    zIndex: 1,
  },
  completedMarker: {
    background: "#DDF4E6",
    color: "#17683A",
    border: "2px solid #88C79F",
  },
  currentMarker: {
    background: "#F2B705",
    color: "#0D1B3D",
    border: "4px solid #FFF4BF",
    boxShadow: "0 0 0 5px rgba(242,183,5,0.18)",
  },
  upcomingMarker: {
    background: "#FFFFFF",
    color: "#667085",
    border: "2px solid #D4DAE4",
  },
  timelineLine: {
    width: "4px",
    flex: 1,
    minHeight: "42px",
    borderRadius: "999px",
  },
  phaseCard: {
    minWidth: 0,
    marginBottom: "24px",
    padding: "30px",
    background: "#FFFFFF",
    borderRadius: "22px",
    overflow: "hidden",
  },
  phaseTopRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
  },
  phaseIdentity: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    minWidth: 0,
  },
  phaseIcon: {
    width: "58px",
    height: "58px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    background: "#FFF7D6",
    borderRadius: "17px",
    fontSize: "29px",
  },
  phaseNumber: {
    color: "#9A7600",
    fontSize: "10px",
    fontWeight: 850,
    letterSpacing: "0.11em",
  },
  phaseName: {
    fontSize: "27px",
    lineHeight: 1.1,
    letterSpacing: "-0.025em",
    margin: "5px 0 0",
  },
  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "30px",
    padding: "0 11px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 850,
    whiteSpace: "normal",
    textAlign: "center",
  },
  youAreHere: {
    display: "inline-flex",
    alignItems: "center",
    marginTop: "18px",
    padding: "7px 11px",
    background: "#FFF7D6",
    border: "1px solid #F0D66E",
    borderRadius: "9px",
    color: "#725500",
    fontSize: "10px",
    fontWeight: 900,
    letterSpacing: "0.09em",
  },
  phaseTagline: {
    fontSize: "19px",
    fontWeight: 850,
    margin: "20px 0 7px",
  },
  phaseDescription: {
    maxWidth: "900px",
    color: "#5F6878",
    fontSize: "14px",
    lineHeight: 1.7,
    margin: 0,
  },
  phaseProgressHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    color: "#596273",
    fontSize: "12px",
    marginTop: "22px",
  },
  phaseProgressTrack: {
    width: "100%",
    height: "9px",
    overflow: "hidden",
    background: "#E9EDF3",
    borderRadius: "999px",
    marginTop: "8px",
  },
  phaseProgressFill: {
    height: "100%",
    background: "#F2B705",
    borderRadius: "999px",
  },
  phaseStats: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: "10px",
    marginTop: "22px",
  },
  phaseStat: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    padding: "13px",
    background: "#F8FAFC",
    border: "1px solid #E5EAF1",
    borderRadius: "12px",
    overflow: "hidden",
    fontSize: "14px",
  },
  phaseDetailsGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1.15fr) minmax(0, 0.85fr)",
    gap: "20px",
    marginTop: "22px",
  },
  detailBlock: {
    minWidth: 0,
    padding: "20px",
    background: "#F8FAFC",
    border: "1px solid #E5EAF1",
    borderRadius: "16px",
    overflow: "hidden",
  },
  detailTitle: {
    fontSize: "13px",
    fontWeight: 850,
    letterSpacing: "0.04em",
  },
  milestoneList: {
    display: "grid",
    gap: "11px",
    marginTop: "15px",
  },
  milestoneItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    minWidth: 0,
    color: "#4F5968",
    fontSize: "13px",
    lineHeight: 1.5,
  },
  milestoneCheck: {
    width: "24px",
    height: "24px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    border: "1px solid",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 900,
  },
  tagList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "13px",
  },
  skillTag: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "30px",
    maxWidth: "100%",
    padding: "0 10px",
    background: "#EEF3FB",
    border: "1px solid #D7E1F0",
    borderRadius: "999px",
    color: "#17356F",
    fontSize: "11px",
    fontWeight: 750,
    overflowWrap: "anywhere",
  },
  badgeList: {
    display: "grid",
    gap: "8px",
    marginTop: "12px",
  },
  badgeItem: {
    minWidth: 0,
    color: "#4F5968",
    fontSize: "13px",
    lineHeight: 1.45,
    overflowWrap: "anywhere",
  },
  nextStepPanel: {
    marginTop: "20px",
    padding: "17px",
    background: "#FFF8DC",
    border: "1px solid #F0D66E",
    borderRadius: "14px",
  },
  nextStepLabel: {
    color: "#8B6A00",
    fontSize: "10px",
    fontWeight: 900,
    letterSpacing: "0.11em",
  },
  nextStepText: {
    color: "#4F5968",
    fontSize: "14px",
    lineHeight: 1.55,
    marginTop: "6px",
  },
  graduationSection: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1.45fr) minmax(250px, 0.55fr)",
    gap: "28px",
    alignItems: "center",
    marginTop: "58px",
    padding: "38px",
    background: "#0D1B3D",
    borderRadius: "26px",
    overflow: "hidden",
  },
  graduationContent: {
    minWidth: 0,
  },
  graduationTitle: {
    color: "#FFFFFF",
    fontSize: "clamp(30px, 4vw, 42px)",
    letterSpacing: "-0.035em",
    margin: 0,
  },
  graduationText: {
    color: "#DDE6F5",
    lineHeight: 1.7,
    margin: "14px 0 0",
    maxWidth: "760px",
  },
  graduationProgressHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    color: "#FFFFFF",
    fontSize: "13px",
    marginTop: "26px",
  },
  graduationTrack: {
    width: "100%",
    height: "12px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "999px",
    marginTop: "9px",
  },
  graduationFill: {
    height: "100%",
    background: "#F2B705",
    borderRadius: "999px",
  },
  graduationMetaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
    marginTop: "22px",
  },
  graduationMetaCard: {
    minWidth: 0,
    padding: "17px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.13)",
    borderRadius: "14px",
    overflow: "hidden",
  },
  metaLabel: {
    color: "#AFC0DA",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "0.08em",
  },
  metaValue: {
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: 750,
    lineHeight: 1.45,
    marginTop: "6px",
    overflowWrap: "anywhere",
  },
  graduationBadge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 0,
    padding: "30px",
    background: "rgba(255,255,255,0.09)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "22px",
    textAlign: "center",
    overflow: "hidden",
  },
  graduationBadgeIcon: {
    fontSize: "60px",
    lineHeight: 1,
  },
  graduationBadgeTitle: {
    color: "#FFFFFF",
    fontSize: "19px",
    fontWeight: 850,
    marginTop: "15px",
  },
  graduationBadgeText: {
    color: "#AFC0DA",
    fontSize: "12px",
    lineHeight: 1.5,
    marginTop: "7px",
  },
  pathwaySection: {
    marginTop: "58px",
  },
  pathwayGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "17px",
  },
  pathwayCard: {
    minWidth: 0,
    padding: "24px",
    background: "#FFFFFF",
    border: "1px solid #E1E6EF",
    borderRadius: "19px",
    boxShadow: "0 8px 22px rgba(13, 27, 61, 0.05)",
    overflow: "hidden",
  },
  pathwayIcon: {
    width: "48px",
    height: "48px",
    display: "grid",
    placeItems: "center",
    background: "#FFF7D6",
    borderRadius: "14px",
    fontSize: "24px",
  },
  pathwayTitle: {
    fontSize: "19px",
    margin: "17px 0 8px",
  },
  pathwayText: {
    color: "#606A79",
    fontSize: "13px",
    lineHeight: 1.65,
    margin: 0,
  },
  actionPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "26px",
    marginTop: "58px",
    padding: "34px",
    background: "#FFF8DC",
    border: "1px solid #F0D66E",
    borderRadius: "23px",
    overflow: "hidden",
  },
  actionTitle: {
    fontSize: "30px",
    letterSpacing: "-0.03em",
    margin: 0,
  },
  actionText: {
    maxWidth: "670px",
    color: "#5B6472",
    lineHeight: 1.65,
    margin: "10px 0 0",
  },
  actionButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "11px",
  },
  darkButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "46px",
    padding: "0 18px",
    background: "#0D1B3D",
    borderRadius: "11px",
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 800,
  },
  outlineButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "46px",
    padding: "0 18px",
    background: "#FFFFFF",
    border: "1px solid #D8C15F",
    borderRadius: "11px",
    color: "#0D1B3D",
    textDecoration: "none",
    fontWeight: 800,
  },
};

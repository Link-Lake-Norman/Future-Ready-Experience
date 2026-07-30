import { auth } from "@/auth";
import LoginForm from "@/components/auth/LoginForm";
import { ROLE_HOME, type AppRole } from "@/lib/permissions";
import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const session = await auth();

  if (session?.user?.role) {
    redirect(
      ROLE_HOME[session.user.role as AppRole] ?? "/ambassador"
    );
  }

  const params = await searchParams;
  const callbackUrl =
    typeof params.callbackUrl === "string"
      ? params.callbackUrl
      : "";

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <div style={styles.brandPanel}>
          <div style={styles.mark}>FR</div>

          <div>
            <div style={styles.eyebrow}>
              FUTURE READY™
            </div>

            <h1 style={styles.brandTitle}>
              Discover Purpose.
              <br />
              Build Skills.
              <br />
              Launch Your Future.
            </h1>

            <p style={styles.brandText}>
              A connected workforce-readiness platform for
              students, schools, facilitators, employers, and
              community partners.
            </p>
          </div>

          <div style={styles.brandFooter}>
            Future Ready™ Operating System
          </div>
        </div>

        <div style={styles.formPanel}>
          <div style={styles.formContent}>
            <div style={styles.eyebrowDark}>
              SECURE PLATFORM ACCESS
            </div>

            <h2 style={styles.title}>Welcome back.</h2>

            <p style={styles.description}>
              Sign in to continue to your Future Ready™ portal.
            </p>

            <LoginForm callbackUrl={callbackUrl} />
          </div>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#EEF2F7",
    color: "#0D1B3D",
    padding: "24px",
  },
  shell: {
    width: "100%",
    maxWidth: "1040px",
    minHeight: "640px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    overflow: "hidden",
    borderRadius: "30px",
    background: "#FFFFFF",
    boxShadow: "0 28px 80px rgba(13, 27, 61, 0.16)",
  },
  brandPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "40px",
    background: "#0D1B3D",
    color: "#FFFFFF",
    padding: "54px",
  },
  mark: {
    width: "58px",
    height: "58px",
    display: "grid",
    placeItems: "center",
    borderRadius: "17px",
    background: "#F2B705",
    color: "#0D1B3D",
    fontSize: "17px",
    fontWeight: 950,
  },
  eyebrow: {
    marginBottom: "18px",
    color: "#F2B705",
    fontSize: "11px",
    fontWeight: 900,
    letterSpacing: "0.16em",
  },
  eyebrowDark: {
    marginBottom: "16px",
    color: "#A47700",
    fontSize: "10px",
    fontWeight: 900,
    letterSpacing: "0.16em",
  },
  brandTitle: {
    margin: 0,
    fontSize: "clamp(38px, 5vw, 58px)",
    lineHeight: 1.02,
    letterSpacing: "-0.045em",
  },
  brandText: {
    maxWidth: "430px",
    marginTop: "24px",
    color: "#CBD5E1",
    fontSize: "14px",
    lineHeight: 1.75,
  },
  brandFooter: {
    color: "#94A3B8",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "0.08em",
  },
  formPanel: {
    display: "grid",
    placeItems: "center",
    padding: "54px",
  },
  formContent: {
    width: "100%",
    maxWidth: "390px",
  },
  title: {
    margin: 0,
    fontSize: "38px",
    letterSpacing: "-0.035em",
  },
  description: {
    marginTop: "12px",
    color: "#64748B",
    fontSize: "14px",
    lineHeight: 1.65,
  },
};

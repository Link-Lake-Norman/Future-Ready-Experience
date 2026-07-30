import { auth } from "@/auth";
import { ROLE_HOME, type AppRole } from "@/lib/permissions";
import { redirect } from "next/navigation";

export default async function LoginRedirectPage() {
  const session = await auth();

  if (!session?.user?.role) {
    redirect("/login");
  }

  redirect(
    ROLE_HOME[session.user.role as AppRole] ?? "/ambassador"
  );
}

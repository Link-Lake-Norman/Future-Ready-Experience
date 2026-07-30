import type { DefaultSession } from "next-auth";
import type { AppRole } from "@/lib/permissions";

declare module "next-auth" {
  interface User {
    role: AppRole;
    status: string;
  }

  interface Session {
    user: {
      id: string;
      role: AppRole;
      status: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: AppRole;
    status?: string;
  }
}

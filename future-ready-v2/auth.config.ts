import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

import { ROLE_HOME, type AppRole } from "@/lib/permissions";

const protectedRoutes: Array<{
  prefix: string;
  roles: AppRole[];
}> = [
  {
    prefix: "/admin",
    roles: ["SUPER_ADMIN", "ORGANIZATION_ADMIN", "SCHOOL_ADMIN"],
  },
  {
    prefix: "/ambassador/facilitator",
    roles: [
      "SUPER_ADMIN",
      "ORGANIZATION_ADMIN",
      "SCHOOL_ADMIN",
      "FACILITATOR",
    ],
  },
  {
    prefix: "/facilitator",
    roles: [
      "SUPER_ADMIN",
      "ORGANIZATION_ADMIN",
      "SCHOOL_ADMIN",
      "FACILITATOR",
    ],
  },
  {
    prefix: "/employer",
    roles: ["SUPER_ADMIN", "ORGANIZATION_ADMIN", "EMPLOYER"],
  },
  {
    prefix: "/mentor",
    roles: ["SUPER_ADMIN", "ORGANIZATION_ADMIN", "MENTOR"],
  },
  {
    prefix: "/ambassador/student-dashboard",
    roles: [
      "SUPER_ADMIN",
      "ORGANIZATION_ADMIN",
      "SCHOOL_ADMIN",
      "FACILITATOR",
      "STUDENT",
    ],
  },
  {
    prefix: "/ambassador/student-portal",
    roles: [
      "SUPER_ADMIN",
      "ORGANIZATION_ADMIN",
      "SCHOOL_ADMIN",
      "FACILITATOR",
      "STUDENT",
    ],
  },
  {
    prefix: "/student-dashboard",
    roles: [
      "SUPER_ADMIN",
      "ORGANIZATION_ADMIN",
      "SCHOOL_ADMIN",
      "FACILITATOR",
      "STUDENT",
    ],
  },
  {
    prefix: "/journey",
    roles: [
      "SUPER_ADMIN",
      "ORGANIZATION_ADMIN",
      "SCHOOL_ADMIN",
      "FACILITATOR",
      "STUDENT",
    ],
  },
  {
    prefix: "/skills",
    roles: [
      "SUPER_ADMIN",
      "ORGANIZATION_ADMIN",
      "SCHOOL_ADMIN",
      "FACILITATOR",
      "STUDENT",
    ],
  },
  {
    prefix: "/badges",
    roles: [
      "SUPER_ADMIN",
      "ORGANIZATION_ADMIN",
      "SCHOOL_ADMIN",
      "FACILITATOR",
      "STUDENT",
    ],
  },
  {
    prefix: "/ai-coach",
    roles: [
      "SUPER_ADMIN",
      "ORGANIZATION_ADMIN",
      "SCHOOL_ADMIN",
      "FACILITATOR",
      "STUDENT",
    ],
  },
];

function getProtectedRoute(pathname: string) {
  return protectedRoutes.find(
    ({ prefix }) =>
      pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },

  providers: [],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? token.sub ?? "");
        session.user.role = token.role as AppRole;
        session.user.status = String(token.status ?? "");
      }

      return session;
    },

    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      const protectedRoute = getProtectedRoute(pathname);
      const user = auth?.user;

      /*
       * The login page remains public here.
       * app/login/page.tsx handles redirecting an authenticated user.
       */
      if (pathname === "/login") {
        return true;
      }

      if (!protectedRoute) {
        return true;
      }

      if (!user?.role) {
        const loginUrl = new URL("/login", request.nextUrl);

        loginUrl.searchParams.set(
          "callbackUrl",
          `${pathname}${request.nextUrl.search}`
        );

        return NextResponse.redirect(loginUrl);
      }

      const role = user.role as AppRole;

      if (!protectedRoute.roles.includes(role)) {
        const destination = ROLE_HOME[role] ?? "/ambassador";

        return NextResponse.redirect(
          new URL(destination, request.nextUrl)
        );
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

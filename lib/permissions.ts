export const APP_ROLES = [
  "SUPER_ADMIN",
  "ORGANIZATION_ADMIN",
  "SCHOOL_ADMIN",
  "FACILITATOR",
  "EMPLOYER",
  "MENTOR",
  "STUDENT",
] as const;

export type AppRole = (typeof APP_ROLES)[number];

export const ROLE_HOME: Record<AppRole, string> = {
  SUPER_ADMIN: "/admin/dashboard",
  ORGANIZATION_ADMIN: "/admin/dashboard",
  SCHOOL_ADMIN: "/admin/dashboard",
  FACILITATOR: "/facilitator/dashboard",
  EMPLOYER: "/employer/dashboard",
  MENTOR: "/mentor/dashboard",
  STUDENT: "/student-dashboard",
};

export const ROUTE_ACCESS: Record<string, readonly AppRole[]> = {
  "/admin": ["SUPER_ADMIN", "ORGANIZATION_ADMIN", "SCHOOL_ADMIN"],
  "/facilitator": [
    "SUPER_ADMIN",
    "ORGANIZATION_ADMIN",
    "SCHOOL_ADMIN",
    "FACILITATOR",
  ],
  "/employer": ["SUPER_ADMIN", "ORGANIZATION_ADMIN", "EMPLOYER"],
  "/student-dashboard": [
    "SUPER_ADMIN",
    "ORGANIZATION_ADMIN",
    "SCHOOL_ADMIN",
    "FACILITATOR",
    "STUDENT",
  ],
  "/student-portal": [
    "SUPER_ADMIN",
    "ORGANIZATION_ADMIN",
    "SCHOOL_ADMIN",
    "FACILITATOR",
    "STUDENT",
  ],
  "/ai-coach": [
    "SUPER_ADMIN",
    "ORGANIZATION_ADMIN",
    "SCHOOL_ADMIN",
    "FACILITATOR",
    "STUDENT",
  ],
};

export function canAccessRoute(role: AppRole, pathname: string): boolean {
  const prefix = Object.keys(ROUTE_ACCESS)
    .sort((a, b) => b.length - a.length)
    .find((candidate) =>
      pathname === candidate || pathname.startsWith(`${candidate}/`)
    );

  return prefix ? ROUTE_ACCESS[prefix].includes(role) : true;
}

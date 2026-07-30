# Future Ready™ Database Foundation

Version 0.1.0 adds the live data layer without recreating any existing portal.

Included domains:

- Organizations and schools
- Programs and cohorts
- Users and role memberships
- Students and facilitators
- Curriculum and lesson progress
- Reflections and feedback
- Skills, badges, and portfolio evidence
- Employers, internships, applications, and placements
- Attendance, goals, notifications, and audit records

Commands:

```bash
npm run db:validate
npm run db:generate
npm run db:migrate -- --name initial_foundation
npm run db:seed
npm run db:studio
```

The demonstration users do not have passwords yet. Secure authentication is the next package.

// Future Ready™
// facilitator-guides.ts
// Week 1 starter scaffold

export type FacilitatorGuide = {
  week: number;
  title: string;
  facilitator: string;
  objective: string;
  openingScript: string;
};

export const facilitatorGuides: FacilitatorGuide[] = [
  {
    week: 1,
    title: "This Is Where My Future Begins",
    facilitator: "Coach Jones",
    objective: "Launch the Future Ready™ experience.",
    openingScript: "Welcome to Future Ready™."
  }
];

export default facilitatorGuides;

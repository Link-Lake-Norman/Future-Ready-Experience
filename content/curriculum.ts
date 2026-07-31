import type { CurriculumWeek } from "./platform";
import { discover } from "./discover";
import { develop } from "./develop";
import { explore } from "./explore";
import { connect } from "./connect";
import { experience } from "./experience";
import { launch } from "./launch";

export const curriculum: CurriculumWeek[] = [
  ...discover,
  ...develop,
  ...explore,
  ...connect,
  ...experience,
  ...launch,
];

export default curriculum;

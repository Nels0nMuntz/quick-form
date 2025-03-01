import { FormResponseStats } from "./formResponse";

export interface GetStatsOutput {
  [formId: number]: FormResponseStats;
}

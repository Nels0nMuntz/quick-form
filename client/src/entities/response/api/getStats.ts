import { clientFetch } from "@/shared/api";
import { GetStatsOutput } from "../model/types/getStatsOutput";

export const getStats = (formIds: number[]) => {
  return clientFetch.get<GetStatsOutput>("responsesStats", {
    query: { ids: formIds.join(",") },
  });
};

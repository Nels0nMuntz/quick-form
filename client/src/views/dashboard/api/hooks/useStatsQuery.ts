import { useQuery } from "@tanstack/react-query";
import { getStats } from "@/entities/response";

export const useStatsQuery = (formIds: number[]) => {
  return useQuery({
    queryKey: ["responses-stats", formIds],
    queryFn: async () => {
      const { ok, data } = await getStats(formIds);

      if (ok && data.success) {
        return data.data;
      }

      return {};
    },
    enabled: Boolean(formIds.length),
  });
};

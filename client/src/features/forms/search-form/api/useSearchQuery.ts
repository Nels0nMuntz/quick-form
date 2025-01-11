import { useQuery } from "@tanstack/react-query";
import { FetchFormsRequest } from "@/entities/form";
import { fetchForms } from "@/entities/form/api/fetchForms";
import { sleep } from "@/shared/lib";

export const useSearchQuery = (options: FetchFormsRequest) => {
  return useQuery({
    queryKey: ["search-form", options.query],
    queryFn: async ({ signal }) => {
      await sleep(400);
      if (!signal.aborted) {
        return fetchForms(options, signal);
      }
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { fetchForms, Form } from "@/entities/form";

interface Options {
  take: number;
  skip: number;
  initialData?: Form[];
}

export const useTableDataQuery = ({ skip, take, initialData }: Options) => {
  return useQuery({
    initialData,
    queryKey: ["forms-data", skip, take],
    queryFn: async () => {
      const response = await fetchForms({ take, skip });
      if (!response.ok || !response.data.success)
        throw Error("Failed to fetch forms");
      return response.data.data.forms;
    },
  });
};

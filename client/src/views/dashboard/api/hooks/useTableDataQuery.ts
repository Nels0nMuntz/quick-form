"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchForms } from "@/entities/form";

interface Options {
  take?: number;
  skip?: number;
}

const defaultQuery = {
  take: 2,
  skip: 0,
};

export const useTableDataQuery = (optins?: Options) => {
  const query = optins || defaultQuery;
  return useQuery({
    queryKey: ["forms-data", query],
    queryFn: async () => {
      const respomse = await fetchForms(query);
      if (respomse.ok && respomse.data.success) {
        return respomse.data.data.forms;
      }
      return [];
    },
  });
};

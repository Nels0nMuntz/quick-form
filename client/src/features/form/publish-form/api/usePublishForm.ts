import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { clientFetch } from "@/shared/api";
import { FormConfig } from "@/shared/model";

export const usePublishForm = (
  data: FormConfig,
  options?: UseMutationOptions,
) => {
  return useMutation({
    mutationKey: ["post-form"],
    mutationFn: () => {
      return clientFetch.post("form", data);
    },
    ...options,
  });
};

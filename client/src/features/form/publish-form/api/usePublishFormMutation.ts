import { createForm, CreateFormRequest } from "@/entities/form";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const usePublishFormMutation = (
  data: CreateFormRequest,
  options?: UseMutationOptions,
) => {
  return useMutation({
    mutationFn: () => createForm(data),
    ...options,
  });
};

import { Form, updateForm, UpdateFormRequest } from "@/entities/form";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useUpdateFormMutation = (
  options?: UseMutationOptions<Form, Error, UpdateFormRequest>,
) => {
  return useMutation({
    mutationFn: (data: UpdateFormRequest) => updateForm(data),
    ...options,
  });
};

import { useMutation } from "@tanstack/react-query";
import { deleteForm } from "@/entities/form";

export const useDeleteFormMutation = () => {
  return useMutation({
    mutationFn: async (formId: number) => {
      const response = await deleteForm(formId);
      if (!response.ok || !response.data.success) {
        throw new Error("Failed to delete form");
      }
      return response.data.data;
    },
  });
};

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { clientFetch } from "@/shared/api";
import { PublishFormRequest } from "../model/publishFormRequest";

export const usePublishForm = (
  data: PublishFormRequest,
  options?: UseMutationOptions,
) => {
  return useMutation({
    mutationKey: ["post-form"],
    mutationFn: async () => {
      const response = await clientFetch.post("form", data);
      console.log({ response });
      if(!response.ok && !response.data.success) {
        throw new Error(response.data.error)
      }
      return response;
    },
    ...options,
  });
};

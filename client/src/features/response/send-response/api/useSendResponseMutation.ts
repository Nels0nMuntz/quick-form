import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { sendResponse, SendResponseData } from "@/entities/response";
import { toast } from "@/shared/lib";

export const useSendResponseMutation = () => {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  return useMutation({
    mutationFn: async (data: SendResponseData) => {
      const response = await sendResponse(data);
      if (response.ok && response.data.success) {
        return response.data.data;
      }
      throw new Error("Failed to send response");
    },
    onError: (error) => {
      console.log(error);
      toast({
        title:
          "Oops! Something went wrong, and we couldn't send your response. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.replace(`/thank-you/${slug}`);
    },
  });
};

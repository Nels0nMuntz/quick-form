import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpFormValues } from "../models";
import { clientFetch } from "@/shared/api";
import { toast } from "@/shared/hooks";

export const useSignup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const submit = async (values: SignUpFormValues) => {
    try {
      setIsLoading(true);
      const response = await clientFetch.post("signup", values);
      if (response.status === 201 && response.data.success) {
        router.push("/sign-in");
        return;
      }
      if (!response.data.success) {
        toast({
          title: "Signup error",
          description: response.data.details
            .map((item: any) => item.message)
            .join(". "),
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.log("Signup error", { error });
      toast({
        title: "There was a problem",
        description: "There was an error signing up",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, submit };
};

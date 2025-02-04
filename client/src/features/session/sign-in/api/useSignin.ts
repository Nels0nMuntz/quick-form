import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { clientFetch } from "@/shared/api";
import { toast } from "@/shared/lib";
import { SignInFormValues } from "../models/schemas/signin-form-schema";

export const useSignin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const redirectPath = searchParams?.get("from") || "/dashboard";

  const submit = async (values: SignInFormValues) => {
    try {
      setIsLoading(true);
      const response = await clientFetch.post("signin", values);
      if (response.status === 200 && response.data.success) {
        router.replace(redirectPath);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        return;
      }

      if (!response.data.success) {
        toast({
          title: "Signin error",
          description: response.data.error,
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "There was a problem",
        description: "There was an error logging in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, submit };
};

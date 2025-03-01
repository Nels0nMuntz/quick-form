import { useEffect, useState } from "react";

export const useLoadingState = (variables: boolean[]) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (variables.every((variable) => !variable)) {
      setIsLoading(false);
    }
  }, [...variables]);

  return isLoading;
};

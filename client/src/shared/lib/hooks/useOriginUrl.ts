"use client";
import { useEffect, useState } from "react";

export const useOriginUrl = () => {
  const [urlOrigin, setUrlOrigin] = useState("");
  useEffect(() => {
    setUrlOrigin(window.location.origin);
  }, []);

  return urlOrigin;
};

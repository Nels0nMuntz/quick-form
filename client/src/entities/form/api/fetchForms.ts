"use client";
import { clientFetch } from "@/shared/api";
import { FetchFormsRequest } from "../model/types/fetchFormsRequest";
import { FetchFormsResponse } from "../model/types/fetchFormsResponse";

export const fetchForms = (
  options: FetchFormsRequest,
  signal?: AbortSignal | null,
) => {
  return clientFetch.get<FetchFormsResponse>("forms", {
    query: options,
    signal,
  });
};

"use server";
import { cookies } from "next/headers";
import { appConfig } from "@/app-root/lib";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { FetchResponse } from "../types/fetchResponse";
import { ApiResponse } from "../types/apiResponse";
import { objectToQueryParams } from "./objectToQueryParams";

type RequestUrl = keyof typeof API_ENDPOINTS;
type RequestParams = Record<string, any>;
type RequestOptions = RequestInit & { slug?: string; query?: RequestParams };

type HTTPMethod = "GET" | "POST";
type HTTPClient = (
  method: HTTPMethod,
) => <ResponseData = any, ErrorDetails = any>(
  url: RequestUrl,
  options?: RequestOptions,
) => Promise<FetchResponse<ApiResponse<ResponseData, ErrorDetails>>>;

const httpClient: HTTPClient = (method) => {
  return async (url, options) => {
    try {
      const params = options?.slug ? `/${options?.slug}` : ""
      const query = options?.query
        ? `?${objectToQueryParams(options.query)}`
        : "";
      const requestCookies = await cookies();
      const response = await fetch(
        `${appConfig.apiUrl}${API_ENDPOINTS[url]}${params}${query}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Cookie: requestCookies.toString(),
            ...options?.headers,
          },
          ...options,
        },
      );

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return {
          ok: response.ok,
          status: response.status,
          data,
        };
      } else {
        return {
          ok: response.ok,
          status: response.status,
          data: null,
        };
      }
    } catch (error) {
      console.log({ serverFetchError: error });
      return {
        ok: false,
        status: 500,
        data: null,
      };
    }
  };
};

export const serverGet = async <ResponseData = any, ErrorDetails = any>(
  url: RequestUrl,
  options?: RequestOptions,
) => httpClient("GET")<ResponseData, ErrorDetails>(url, options);

export const serverPost = async <ResponseData = any, ErrorDetails = any>(
  url: RequestUrl,
  body: any,
  options?: RequestOptions,
) => {
  return httpClient("POST")<ResponseData, ErrorDetails>(url, {
    body: JSON.stringify(body),
    ...options,
  });
};

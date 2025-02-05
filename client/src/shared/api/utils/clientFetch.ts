import { appConfig } from "@/app-root/lib";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { ApiResponse } from "../types/apiResponse";
import { FetchResponse } from "../types/fetchResponse";
import { toast } from "@/shared/lib";

type RequestUrl = keyof typeof API_ENDPOINTS;
type RequestParams = Record<string, any>;
type RequestOptions = RequestInit & { params?: RequestParams };

type HTTPMethod = "GET" | "POST";
type HTTPClient = (
  method: HTTPMethod,
) => <ResponseData = any, ErrorDetails = any>(
  url: RequestUrl,
  options?: RequestOptions,
) => Promise<FetchResponse<ApiResponse<ResponseData, ErrorDetails>>>;

const objectToQueryParams = (obj: RequestParams) => {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (value === undefined || value === null) {
        return "";
      }

      if (Array.isArray(value)) {
        return value
          .map(
            (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`,
          )
          .join("&");
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join("&");
};

const httpClient: HTTPClient = (method) => {
  return async (url, options) => {
    const queryParams = options?.params
      ? `?${objectToQueryParams(options.params)}`
      : "";
    const originalRequest = new Request(
      `${appConfig.apiUrl}${API_ENDPOINTS[url]}${queryParams}`,
      {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      },
    );
    let response = await fetch(originalRequest);

    if (response.status === 401) {
      const refreshResponse = await fetch(
        `${appConfig.apiUrl}${API_ENDPOINTS.refresh}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...options?.headers,
          },
          ...options,
        },
      );

      if (!refreshResponse.ok) {
        // window.location.href = "/sign-in";
        return {
          ok: false,
          status: refreshResponse.status,
          data: {
            success: false,
            error: "User not found"
          },
        };
      }

      response = await fetch(originalRequest);
    }

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
  };
};

const get = httpClient("GET");

const post = (url: RequestUrl, body: any, options?: RequestOptions) => {
  return httpClient("POST")(url, {
    body: JSON.stringify(body),
    ...options,
  });
};

export const clientFetch = {
  get,
  post,
};

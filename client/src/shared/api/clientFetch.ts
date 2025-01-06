import { appConfig } from "@/app-root/configs";
import { API_ENDPOINTS } from "./urls";

type RequestUrl = keyof typeof API_ENDPOINTS;

interface ServerFetchResponse<Data> {
  ok: boolean;
  status: number;
  data: Data;
}

type HTTPMethod = "GET" | "POST";
type HTTPClient = (
  method: HTTPMethod,
) => <ResponseData = any>(
  url: RequestUrl,
  options?: RequestInit,
) => Promise<ServerFetchResponse<ResponseData>>;

const httpClient: HTTPClient = (method) => {
  return async (url, options) => {
    const originalRequest = new Request(
      `${appConfig.apiUrl}${API_ENDPOINTS[url]}`,
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
        window.location.href = "/sign-in";
        return {
          ok: false,
          status: 401,
          data: null,
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

const post = (url: RequestUrl, body: any, options?: RequestInit) => {
  return httpClient("POST")(url, {
    body: JSON.stringify(body),
    ...options,
  });
};

export const clientFetch = {
  get,
  post,
};

import { appConfig } from "@/app-root/configs";
import { API_URLS } from "./urls";

type RequestUrl = keyof typeof API_URLS;

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
    const response = await fetch(`${appConfig.apiUrl}${API_URLS[url]}`, {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });
    const data = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      data,
    };
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

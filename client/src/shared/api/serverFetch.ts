"use server"
import { cookies } from "next/headers";
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
    try {
      const requestCookies = await cookies();
      const response = await fetch(`${appConfig}${API_URLS[url]}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Cookie: requestCookies.toString(),
          ...options?.headers,
        },
        ...options,
      });

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

const get = httpClient("GET");

const post = (url: RequestUrl, body: any, options?: RequestInit) => {
  return httpClient("POST")(url, {
    body: JSON.stringify(body),
    ...options,
  });
};

export const serverFetch = {
  get,
  post,
};

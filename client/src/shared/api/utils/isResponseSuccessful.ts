import { ApiResponse } from "../types/apiResponse";
import { FetchResponse } from "../types/fetchResponse";

export const isResponseSuccessful = (response: FetchResponse<ApiResponse>) => {
  return response.ok && response.data.success;
};

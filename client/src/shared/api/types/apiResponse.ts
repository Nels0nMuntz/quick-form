export type ApiResponse<Data = any, ErrorDetails = any> =
  | { success: true; data: Data }
  | { success: false; error: string; details: ErrorDetails };

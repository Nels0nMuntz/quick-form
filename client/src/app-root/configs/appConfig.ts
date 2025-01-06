export const appConfig = {
  mode: process.env.NEXT_PUBLIC_NODE_ENV || "development",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
  localUrl: process.env.NEXT_PUBLIC_LOCAL_URL || "",
  accessTokenSecret: process.env.JWT_ACCESS_SECRET || "",
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET || "",
};

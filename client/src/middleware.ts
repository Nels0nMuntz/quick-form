import { NextRequest, NextResponse } from "next/server";
import {
  closeSession,
  validateAccessToken,
  validateRefreshToken,
} from "./shared/lib";
import { appConfig } from "./app-root/configs";

const publicRoutes = ["/sign-in", "/sign-up", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const accessToken = req.cookies.get("jwt_access")?.value;

  if (isPublicRoute) {
    if (!accessToken) {
      return NextResponse.next();
    }

    const isValidAccessToken = await validateAccessToken(accessToken);

    if (isValidAccessToken) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    } else {
      return NextResponse.next();
    }
  }

  if (!accessToken) {
    return closeSession(req);
  }

  const isValidAccessToken = await validateAccessToken(accessToken);

  if (isValidAccessToken) {
    return NextResponse.next();
  }

  const refreshToken = req.cookies.get("jwt_refresh")?.value;

  if (!refreshToken) {
    return closeSession(req);
  }

  const isValidRefreshToken = await validateRefreshToken(refreshToken);

  if (!isValidRefreshToken) {
    return closeSession(req);
  }

  const refreshResponse = await fetch(`${appConfig.apiUrl}/user/refresh`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `jwt_refresh=${refreshToken}`,
    },
  });

  if (!refreshResponse.ok) {
    return closeSession(req);
  }

  const setCookiesHeaders = refreshResponse.headers.getSetCookie();
  const response = NextResponse.next();
  setCookiesHeaders.forEach(cookie => response.headers.append("Set-Cookie", cookie))
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};

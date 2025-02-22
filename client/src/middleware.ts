import { NextRequest, NextResponse } from "next/server";
import {
  closeSession,
  validateAccessToken,
  validateRefreshToken,
} from "./shared/lib";
import { appConfig } from "./app-root/lib";

type PublicRoute = {
  route: string;
  exact: boolean;
};

const publicRoutes: PublicRoute[] = [
  { route: "/", exact: true },
  { route: "/sign-in", exact: true },
  { route: "/sign-up", exact: true },
  { route: "/public-form", exact: false },
  { route: "/thank-you", exact: false },
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some(({ route, exact }) => {
    return exact ? path === route : path.includes(route);
  });

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
  req.headers.set("Cookie", setCookiesHeaders.join("; "));
  const response = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });
  setCookiesHeaders.forEach((cookie) =>
    response.headers.append("Set-Cookie", cookie),
  );
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$|public-form$).*)"],
};

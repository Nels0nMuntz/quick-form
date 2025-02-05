"server-only";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { appConfig } from "@/app-root/lib";
import { TokenPayload } from "@/shared/api";

async function decrypt(token: string, secret: string, tokenType: string) {
  console.log({token, secret, tokenType});
  
  try {
    const encodedKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify<TokenPayload>(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(`Failed to verify ${tokenType} token: `);
  }
}

async function validateToken(token: string, secret: string, tokenType: string) {
  const payload = await decrypt(token, secret, tokenType);

  if (!payload) return false;

  const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
  const bufferTime = 60; // 1 minute

  if (
    payload.id &&
    payload.email &&
    payload.exp &&
    payload.exp > currentTime + bufferTime
  ) {
    return true;
  }
}

export function validateAccessToken(token: string) {
  return validateToken(token, appConfig.accessTokenSecret, "access");
}

export function validateRefreshToken(token: string) {
  return validateToken(token, appConfig.refreshTokenSecret, "refresh");
}

export function closeSession(req: NextRequest) {
  const fromPath = req.nextUrl.pathname;
  const url = new URL("/sign-in", req.nextUrl);
  url.searchParams.set("from", fromPath);
  const res = NextResponse.redirect(url);
  res.cookies.delete("jwt_access");
  res.cookies.delete("jwt_refresh");
  return res;
}

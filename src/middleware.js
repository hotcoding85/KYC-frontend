// File: middleware.js

import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log(`Middleware called for: ${req.nextUrl.pathname}`);
  const startTime = Date.now(); // Record start time

  const token = req.cookies.get("Authentication")?.value;
  const refreshToken = req.cookies.get("Refresh")?.value;

  const url = req.nextUrl.clone();
  const companyId = req?.cookies?.get("companyId")?.value || "";

  if (!refreshToken) {
    url.pathname = `/auth/login/${companyId}`;
    const duration = (Date.now() - startTime) / 1000; // Calculate duration in seconds
    console.log(`Middleware execution time: ${duration} seconds`);
    return NextResponse.redirect(url);
  }

  try {
    let cookieHeader = `Refresh=${refreshToken}`;
    if (token) {
      cookieHeader = `Authentication=${token}; ` + cookieHeader;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/validate-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Invalid token");
    }

    const res = NextResponse.next();
    const authToken = response.headers
      .get("set-cookie")
      ?.split(",")[0]
      .split(";")[0];
    const newRefreshToken = response.headers
      .get("set-cookie")
      ?.split(",")[1]
      .split(";")[0];
    const domain = process.env.NEXT_PUBLIC_DOMAIN || "";

    if (authToken) {
      const [authName, authValue] = authToken.split("=");
      res.cookies.set(authName, authValue, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: domain,
        maxAge: 60,
      });
    }

    if (newRefreshToken) {
      const [refreshName, refreshValue] = newRefreshToken.split("=");
      if (refreshValue != refreshToken) {
        res.cookies.set(refreshName, refreshValue, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          domain: domain,
          maxAge: 604800,
        });
      }
    }

    const duration = (Date.now() - startTime) / 1000; // Calculate duration in seconds
    console.log(`Middleware execution time: ${duration} seconds`);
    return res;
  } catch (error) {
    const companyId = req?.cookies?.get("companyId")?.value || "";
    url.pathname = `/auth/login/${companyId}`;

    const duration = (Date.now() - startTime) / 1000; // Calculate duration in seconds
    console.log(`Middleware execution time: ${duration} seconds`);
    return NextResponse.redirect(url);
  }
}


export const config = {
  matcher: [
    "/protected/:path*",
    "/api/protected/:path*",
    "/dashboard/:path*",
  ],
};

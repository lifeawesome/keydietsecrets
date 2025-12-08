// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/sanity/:path*",
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Skip authentication on localhost
  if (
    url.hostname === "localhost" ||
    url.hostname === "127.0.0.1" ||
    url.hostname === "0.0.0.0"
  ) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get("authorization");

  // Get credentials from environment variables
  const expectedUsername = process.env.SANITY_STUDIO_USERNAME || "admin";
  const expectedPassword = process.env.SANITY_STUDIO_PASSWORD;

  // If no password is set in production, block access
  if (!expectedPassword) {
    return new NextResponse(
      "Sanity Studio is not configured. Set SANITY_STUDIO_PASSWORD environment variable.",
      {
        status: 503,
      }
    );
  }

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === expectedUsername && pwd === expectedPassword) {
      return NextResponse.next();
    }
  }

  // Request authentication
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Sanity Studio"',
    },
  });
}

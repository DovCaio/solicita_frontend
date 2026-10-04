import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const publicRoutes = ["/signin"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.includes(pathname)) {
    return intlMiddleware(request);
  }

  const session = request.cookies.get("JSESSIONID");

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api/|_next|_vercel|.*\\..*).*)"],
};

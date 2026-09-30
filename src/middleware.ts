import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/session";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_session")?.value;
  const session = verifySessionToken(token);
  const { pathname } = request.nextUrl;

  const isAuth = Boolean(session && session.role === "ADMIN");

  if (pathname.startsWith("/admin")) {
    if (!isAuth) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/login") {
    if (isAuth) {
      const adminUrl = new URL("/admin/puntos", request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken, Role } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_session")?.value;
  const session = await verifySessionToken(token);
  const { pathname } = request.nextUrl;

  const isAuth = Boolean(session && session.role === Role.ADMIN);

  if (pathname.startsWith("/admin")) {
    if (!isAuth) {
      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      if (token) {
        response.cookies.delete("auth_session");
      }
      return response;
    }

    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    return response;
  }

  if (pathname === "/login") {
    if (isAuth) {
      const adminUrl = new URL("/admin", request.url);
      return NextResponse.redirect(adminUrl);
    }
    if (token) {
      const response = NextResponse.next();
      response.cookies.delete("auth_session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
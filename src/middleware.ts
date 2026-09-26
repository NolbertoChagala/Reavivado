import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionUser = request.cookies.get("session_user");
  const userRole = request.cookies.get("user_role");
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!sessionUser?.value || userRole?.value !== "ADMIN") {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/login") {
    if (sessionUser?.value && userRole?.value === "ADMIN") {
      const adminUrl = new URL("/admin/puntos", request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
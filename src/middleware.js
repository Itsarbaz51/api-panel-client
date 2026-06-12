import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
  const token = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/dashboard"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // No token
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const decoded = jwtDecode(token);

      // Token expired
      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        const response = NextResponse.redirect(new URL("/login", request.url));

        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");

        return response;
      }

      // SUPER_ADMIN only routes
      const superAdminRoutes = [
        "/dashboard/user-management",
        "/dashboard/commission-management",
        "/dashboard/settings",
      ];

      const isSuperAdminRoute = superAdminRoutes.some((route) =>
        pathname.startsWith(route),
      );

      if (isSuperAdminRoute && decoded?.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", request.url));

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }
  }

  // Login page block
  if (token && (pathname === "/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/"],
};

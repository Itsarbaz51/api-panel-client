import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
  const token = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;
  const protectedRoutes = ["/dashboard"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // NO TOKEN
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const decoded = jwtDecode(token);

      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        const response = NextResponse.redirect(new URL("/login", request.url));

        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");

        return response;
      }
    } catch (e) {
      const response = NextResponse.redirect(new URL("/login", request.url));

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }
  }

  // LOGIN BLOCK
  if (token && (pathname === "/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/"],
};

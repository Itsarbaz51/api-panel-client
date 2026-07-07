import { NextResponse } from "next/server";

// Lightweight JWT decode helper (no external dependency)
function decodeJWT(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function middleware(request) {
  const token = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/dashboard", "/kyc"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // No Token
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const decoded = decodeJWT(token);

      if (!decoded) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        return response;
      }

      // Token Expired
      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        const response = NextResponse.redirect(new URL('/login', request.url));

        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');

        return response;
      }

      const role = decoded?.role;
      const kycCompleted = decoded?.kycCompleted || decoded?.kyc_completed || false;

      // ==========================
      // ADMIN & SUPER_ADMIN
      // ==========================
      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        // Dashboard always allowed
        if (pathname.startsWith("/kyc")) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        return NextResponse.next();
      }

      // ==========================
      // USER KYC CHECK
      // ==========================
      if (role === "USER") {
        if (!kycCompleted && pathname.startsWith("/dashboard")) {
          return NextResponse.redirect(new URL("/kyc", request.url));
        }

        if (kycCompleted && pathname.startsWith("/kyc")) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }

      // ==========================
      // SUPER ADMIN ROUTES
      // ==========================
      const superAdminRoutes = [
        "/dashboard/user-management",
        "/dashboard/commission-management",
        "/dashboard/settings",
      ];

      const isSuperAdminRoute = superAdminRoutes.some((route) =>
        pathname.startsWith(route)
      );

      if (isSuperAdminRoute && role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", request.url));

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }
  }

  // ==========================
  // LOGIN PAGE REDIRECT
  // ==========================
  if (token && (pathname === '/' || pathname === '/login')) {
    try {
      const decoded = decodeJWT(token);

      if (!decoded) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        return response;
      }

      const role = decoded?.role;
      const kycCompleted = decoded?.kycCompleted || decoded?.kyc_completed || false;

      // ADMIN & SUPER_ADMIN
      if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // USER
      if (kycCompleted) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      return NextResponse.redirect(new URL('/kyc', request.url));
    } catch {
      const response = NextResponse.redirect(new URL('/login', request.url));

      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/", "/kyc"],
};
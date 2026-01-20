import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_ROUTES = ["/login", "/register"];
const AUTH_ROUTES = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  console.log("🔒 Middleware:", path, "| Token:", !!token);

  // If user is authenticated and tries to access auth pages, redirect to dashboard
  if (AUTH_ROUTES.includes(path) && token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch {
      // Invalid token, allow access to auth pages
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
  }

  // Allow public routes
  if (PUBLIC_ROUTES.includes(path)) {
    return NextResponse.next();
  }

  // Protect all other routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    // Add user info to request headers for server components
    const response = NextResponse.next();
    response.headers.set("x-user-id", decoded.id);
    response.headers.set("x-username", decoded.username);
    return response;
  } catch (error) {
    console.error("Token verification failed:", error);
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
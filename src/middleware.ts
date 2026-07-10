import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("mnb_admin_token")?.value;
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminPage && !isLoginPage && token !== "logged-in") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
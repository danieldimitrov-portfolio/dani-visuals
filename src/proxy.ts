import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = Boolean(req.auth);
  const isLoginPage = pathname === "/admin900/login";

  if (pathname.startsWith("/admin900") && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin900/login", req.nextUrl.origin));
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin900", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/admin900/:path*"],
};

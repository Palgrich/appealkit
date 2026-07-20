import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, verifyToken, makeToken } from "@/lib/auth";
import { baseUrl } from "@/lib/checkout";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const email = token ? verifyToken(token) : null;
  if (!email) {
    return NextResponse.redirect(`${baseUrl()}/login?error=expired`);
  }
  const res = NextResponse.redirect(`${baseUrl()}/account`);
  // Fresh long-lived session cookie
  res.cookies.set(AUTH_COOKIE, makeToken(email, 90), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 90 * 24 * 60 * 60,
    path: "/",
  });
  return res;
}

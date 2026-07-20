import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth";
import { baseUrl } from "@/lib/checkout";

export async function GET() {
  const res = NextResponse.redirect(`${baseUrl()}/`);
  res.cookies.set(AUTH_COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}

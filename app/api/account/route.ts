import { NextRequest, NextResponse } from "next/server";
import { getAuthedEmail } from "@/lib/auth";
import { getUser } from "@/lib/store";

export async function GET(req: NextRequest) {
  const email = getAuthedEmail(req);
  if (!email) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const user = await getUser(email);
  if (!user) return NextResponse.json({ error: "No account" }, { status: 404 });
  return NextResponse.json({
    email: user.email,
    credits: user.credits,
    letters: [...user.letters].sort((a, b) => b.createdAt - a.createdAt),
  });
}

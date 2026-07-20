import { NextRequest, NextResponse } from "next/server";
import { NICHES } from "@/lib/niches";
import { generateLetter, makePreview } from "@/lib/generate";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { nicheId, form } = await req.json();
    const niche = NICHES[nicheId];
    if (!niche || typeof form !== "object" || form === null) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    // Basic input size guard
    const totalLen = Object.values(form as Record<string, string>).join("").length;
    if (totalLen > 8000) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }
    const letter = await generateLetter(niche, form);
    return NextResponse.json({ preview: makePreview(letter) });
  } catch (e) {
    console.error("preview error", e);
    return NextResponse.json({ error: "Generation failed. Please try again." }, { status: 500 });
  }
}

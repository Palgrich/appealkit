import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { verifyPaidSession } from "@/lib/checkout";

export const maxDuration = 30;

function wrapText(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  for (const rawLine of text.split("\n")) {
    if (rawLine.length <= maxChars) {
      lines.push(rawLine);
      continue;
    }
    let current = "";
    for (const word of rawLine.split(" ")) {
      if ((current + " " + word).trim().length > maxChars) {
        lines.push(current.trim());
        current = word;
      } else {
        current = (current + " " + word).trim();
      }
    }
    if (current) lines.push(current.trim());
  }
  return lines;
}

async function toPdf(text: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.TimesRoman);
  const fontSize = 11;
  const lineHeight = 16;
  const margin = 72;
  const pageWidth = 612;
  const pageHeight = 792;
  const maxLinesPerPage = Math.floor((pageHeight - margin * 2) / lineHeight);
  const lines = wrapText(text, 88);

  for (let i = 0; i < lines.length; i += maxLinesPerPage) {
    const page = doc.addPage([pageWidth, pageHeight]);
    const chunk = lines.slice(i, i + maxLinesPerPage);
    chunk.forEach((line, idx) => {
      page.drawText(line, {
        x: margin,
        y: pageHeight - margin - idx * lineHeight,
        size: fontSize,
        font,
      });
    });
  }
  return doc.save();
}

async function toDocx(text: string): Promise<Buffer> {
  const paragraphs = text.split("\n").map(
    (line) =>
      new Paragraph({
        children: [new TextRun({ text: line, font: "Times New Roman", size: 24 })],
        spacing: { after: line.trim() === "" ? 0 : 120 },
      })
  );
  const doc = new Document({ sections: [{ children: paragraphs }] });
  return Packer.toBuffer(doc);
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, letter, format } = await req.json();
    if (!sessionId || typeof letter !== "string" || letter.length === 0 || letter.length > 50000) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const verdict = await verifyPaidSession(sessionId);
    if (!verdict.paid) {
      return NextResponse.json({ error: "Payment not verified" }, { status: 402 });
    }

    if (format === "pdf") {
      const bytes = await toPdf(letter);
      return new NextResponse(Buffer.from(bytes), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="letter.pdf"',
        },
      });
    }
    if (format === "docx") {
      const buf = await toDocx(letter);
      return new NextResponse(new Uint8Array(buf), {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": 'attachment; filename="letter.docx"',
        },
      });
    }
    return NextResponse.json({ error: "Unknown format" }, { status: 400 });
  } catch (e) {
    console.error("download error", e);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}

import { PDFDocument, StandardFonts } from "pdf-lib";
import { Document, Packer, Paragraph, TextRun } from "docx";

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

export async function letterToPdf(text: string): Promise<Uint8Array> {
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

export async function letterToDocx(text: string): Promise<Buffer> {
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

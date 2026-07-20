import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default: "AppealKit — Professional appeal & rebuttal letters in minutes",
    template: "%s | AppealKit",
  },
  description:
    "Generate professional appeal letters: unemployment denials, PIP rebuttals, academic dismissal appeals. Free preview, instant PDF & Word downloads.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
              Appeal<span className="text-indigo-600">Kit</span>
            </Link>
            <nav className="flex gap-5 text-sm text-slate-600">
              <Link href="/unemployment-appeal-letter-generator" className="hover:text-slate-900">
                Unemployment
              </Link>
              <Link href="/pip-rebuttal-letter-generator" className="hover:text-slate-900">
                PIP
              </Link>
              <Link
                href="/academic-dismissal-appeal-letter-generator"
                className="hover:text-slate-900"
              >
                Academic
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-8 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} AppealKit. Not a law firm. No legal advice. ·{" "}
              <Link href="/terms" className="underline hover:text-slate-700">
                Terms
              </Link>{" "}
              ·{" "}
              <Link href="/privacy" className="underline hover:text-slate-700">
                Privacy
              </Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

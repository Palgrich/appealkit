"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NICHES } from "@/lib/niches";

interface LetterItem {
  id: string;
  nicheId: string;
  nicheName: string;
  createdAt: number;
  text: string;
}

interface AccountData {
  email: string;
  credits: number;
  letters: LetterItem[];
}

export default function AccountPage() {
  const [data, setData] = useState<AccountData | null>(null);
  const [status, setStatus] = useState<"loading" | "unauthed" | "done">("loading");
  const [openId, setOpenId] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/account")
      .then(async (res) => {
        if (res.status === 401 || res.status === 404) {
          setStatus("unauthed");
          return;
        }
        setData(await res.json());
        setStatus("done");
      })
      .catch(() => setStatus("unauthed"));
  }, []);

  async function download(letter: LetterItem, format: "pdf" | "docx") {
    setDownloading(letter.id + format);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ letter: letter.text, format }),
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${letter.nicheId}-letter.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(null);
    }
  }

  if (status === "loading") {
    return <div className="py-24 text-center text-slate-500">Loading your account…</div>;
  }

  if (status === "unauthed" || !data) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">My letters</h1>
        <p className="mt-3 text-slate-600">
          You&apos;re not signed in. Use the sign-in link from your purchase email, or request
          a new one.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Get a sign-in link
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My letters</h1>
          <p className="mt-1 text-sm text-slate-500">{data.email}</p>
        </div>
        <a href="/api/auth/logout" className="text-xs text-slate-400 hover:text-slate-600">
          Sign out
        </a>
      </div>

      <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
        <p className="font-semibold text-indigo-900">
          {data.credits > 0
            ? `You have ${data.credits} free letter credit${data.credits === 1 ? "" : "s"}`
            : "No credits left"}
        </p>
        <p className="mt-1 text-sm text-indigo-800">
          {data.credits > 0
            ? "Generate any letter type below — no payment needed."
            : "You can purchase any letter below; each purchase adds 2 bonus credits."}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.values(NICHES).map((n) => (
            <Link
              key={n.id}
              href={`/${n.slug}${data.credits > 0 ? "?mode=credit" : ""}`}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-100"
            >
              + {n.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {data.letters.length === 0 && (
          <p className="text-sm text-slate-500">No letters yet.</p>
        )}
        {data.letters.map((l) => (
          <div key={l.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900">{l.nicheName}</p>
                <p className="text-xs text-slate-400">
                  {new Date(l.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setOpenId(openId === l.id ? null : l.id)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  {openId === l.id ? "Hide" : "View"}
                </button>
                <button
                  onClick={() => download(l, "pdf")}
                  disabled={downloading !== null}
                  className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
                >
                  {downloading === l.id + "pdf" ? "…" : "PDF"}
                </button>
                <button
                  onClick={() => download(l, "docx")}
                  disabled={downloading !== null}
                  className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
                >
                  {downloading === l.id + "docx" ? "…" : "Word"}
                </button>
              </div>
            </div>
            {openId === l.id && (
              <p className="mt-4 whitespace-pre-wrap border-t border-slate-100 pt-4 font-serif text-sm leading-relaxed text-slate-800">
                {l.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

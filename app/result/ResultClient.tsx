"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GenerationProgress from "@/components/GenerationProgress";

const STORAGE_KEY = "appealkit_form";

export default function ResultClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [letter, setLetter] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "done" | "error" | "noform">("loading");
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setStatus("noform");
      return;
    }
    const { nicheId, form } = JSON.parse(stored);
    fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, nicheId, form }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setLetter(data.letter);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  async function download(format: "pdf" | "docx") {
    if (!letter || !sessionId) return;
    setDownloading(format);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, letter, format }),
      });
      if (!res.ok) throw new Error("download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `appeal-letter.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(null);
    }
  }

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-md px-4 py-24">
        <p className="text-center text-lg font-medium text-slate-700">
          Payment confirmed — writing your full letter
        </p>
        <GenerationProgress label="Writing your full letter" />
      </div>
    );
  }

  if (status === "noform") {
    return (
      <div className="py-24 text-center">
        <p className="text-lg font-medium text-slate-700">
          We couldn&apos;t find your answers on this device.
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Your payment went through, but the letter is generated from the answers you entered,
          which are stored in your browser. Please open this link on the device where you
          filled the form — or contact support with your receipt and we&apos;ll make it right.
        </p>
      </div>
    );
  }

  if (status === "error" || !letter) {
    return (
      <div className="py-24 text-center">
        <p className="text-lg font-medium text-slate-700">Something went wrong.</p>
        <p className="mt-2 text-sm text-slate-500">
          If you completed payment, refresh this page. Still stuck? Contact support with your
          Stripe receipt — we&apos;ll fix it.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
        ✓ Payment confirmed — here&apos;s your full letter. Review the [bracketed] placeholders
        and fill in anything personal before sending.
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-slate-800">
          {letter}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => download("pdf")}
          disabled={downloading !== null}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
        >
          {downloading === "pdf" ? "Preparing…" : "Download PDF"}
        </button>
        <button
          onClick={() => download("docx")}
          disabled={downloading !== null}
          className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {downloading === "docx" ? "Preparing…" : "Download Word (.docx)"}
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(letter)}
          className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Copy text
        </button>
      </div>
      <p className="mt-6 text-xs leading-relaxed text-slate-500">
        Tip: read the letter out loud once. Anything you couldn&apos;t comfortably say in a
        hearing or meeting — rephrase in your own words. It&apos;s your letter.
      </p>
    </div>
  );
}

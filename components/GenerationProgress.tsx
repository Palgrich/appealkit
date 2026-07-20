"use client";

import { useEffect, useState } from "react";

const STAGES = [
  "Reading your answers…",
  "Identifying the strongest arguments…",
  "Structuring the letter…",
  "Drafting each paragraph…",
  "Polishing tone and formatting…",
];

export default function GenerationProgress({ label }: { label?: string }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const started = Date.now();
    const t = setInterval(() => setElapsed((Date.now() - started) / 1000), 200);
    return () => clearInterval(t);
  }, []);

  // Asymptotic fill: fast at first, slows down, never hits 100% until the response arrives.
  const pct = Math.min(95, Math.round(100 * (1 - Math.exp(-elapsed / 7))));
  const stage = STAGES[Math.min(STAGES.length - 1, Math.floor(elapsed / 4))];

  return (
    <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-indigo-900">{label || "Writing your letter"}</span>
        <span className="tabular-nums text-indigo-700">{pct}%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-indigo-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 flex items-center gap-2 text-xs text-indigo-800">
        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
        {stage}
        <span className="ml-auto tabular-nums text-indigo-500">{Math.floor(elapsed)}s</span>
      </p>
      <p className="mt-1.5 text-[11px] text-indigo-400">
        Usually takes 10–20 seconds. Don&apos;t close this page.
      </p>
    </div>
  );
}

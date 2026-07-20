"use client";

import { useState } from "react";
import type { Niche } from "@/lib/niches";

const STORAGE_KEY = "appealkit_form";

export default function Wizard({ niche }: { niche: Niche }) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<"preview" | "pay" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const missing = niche.fields.filter((f) => f.required && !(form[f.id] || "").trim());

  async function handlePreview() {
    setError(null);
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }
    setLoading("preview");
    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nicheId: niche.id, form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setPreview(data.preview);
      // Persist so the result page can regenerate after payment redirect.
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ nicheId: niche.id, form }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(null);
    }
  }

  async function handlePay() {
    setError(null);
    setLoading("pay");
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ nicheId: niche.id, form }));
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nicheId: niche.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(null);
    }
  }

  return (
    <div id="wizard" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-xl font-semibold text-slate-900">
        Build your letter — free preview
      </h2>

      <div className="space-y-5">
        {niche.fields.map((f) => (
          <div key={f.id}>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              {f.label}
              {f.required && <span className="text-rose-500"> *</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea
                rows={5}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder={f.placeholder}
                value={form[f.id] || ""}
                onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
              />
            ) : f.type === "select" ? (
              <select
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={form[f.id] || ""}
                onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
              >
                <option value="">Select…</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type === "date" ? "date" : "text"}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder={f.placeholder}
                value={form[f.id] || ""}
                onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
              />
            )}
            {f.help && <p className="mt-1 text-xs text-slate-500">{f.help}</p>}
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
      )}

      {!preview ? (
        <button
          onClick={handlePreview}
          disabled={loading !== null}
          className="mt-6 w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading === "preview" ? "Writing your letter…" : "Generate free preview →"}
        </button>
      ) : (
        <div className="mt-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-slate-800">
              {preview}
            </p>
            <div className="relative mt-1">
              <p className="select-none whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-slate-400 [mask-image:linear-gradient(to_bottom,black,transparent)]">
                {"The rest of your letter continues here — the full factual account, the point-by-point argument, and the closing…"}
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-900">
            <p className="font-semibold">Unlock the full letter — {niche.priceLabel}, one-time</p>
            <ul className="mt-2 space-y-1">
              {niche.deliverables.map((d) => (
                <li key={d}>✓ {d}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={handlePay}
            disabled={loading !== null}
            className="mt-4 w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading === "pay" ? "Redirecting to secure checkout…" : `Unlock full letter — ${niche.priceLabel}`}
          </button>
          <p className="mt-2 text-center text-xs text-slate-500">
            Secure payment via Stripe · No subscription · Instant delivery
          </p>
        </div>
      )}
    </div>
  );
}

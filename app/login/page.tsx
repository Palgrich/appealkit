"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-24">
      <h1 className="text-center text-2xl font-bold text-slate-900">Sign in</h1>
      <p className="mt-2 text-center text-sm text-slate-600">
        Enter the email you used at checkout — we&apos;ll send you a sign-in link. No password
        needed.
      </p>
      {sent ? (
        <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-center text-sm text-emerald-800">
          If an account exists for <b>{email}</b>, a sign-in link is on its way. Check your
          inbox (and spam).
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6">
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "Sending…" : "Email me a sign-in link"}
          </button>
        </form>
      )}
    </div>
  );
}

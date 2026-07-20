"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import GenerationProgress from "@/components/GenerationProgress";
import type { FollowUpQuestion } from "@/lib/generate";

const STORAGE_KEY = "appealkit_form";
const ANSWERS_KEY = "appealkit_answers";

type Phase = "verifying" | "interview" | "generating" | "done" | "error" | "noform";

export default function ResultClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const [phase, setPhase] = useState<Phase>("verifying");
  const [questions, setQuestions] = useState<FollowUpQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [letter, setLetter] = useState<string | null>(null);
  const [emailedTo, setEmailedTo] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const stored = useRef<{ nicheId: string; form: Record<string, string> } | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setPhase("error");
      return;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setPhase("noform");
      return;
    }
    stored.current = JSON.parse(raw);

    // Restore previous answers if the page was reloaded mid-interview.
    const savedAnswers = localStorage.getItem(ANSWERS_KEY);
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));

    fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, ...stored.current }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          setPhase("interview");
        } else {
          // No questions — go straight to generation.
          generate({});
        }
      })
      .catch(() => setPhase("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  function generate(finalAnswers: Record<string, string>) {
    if (!stored.current || !sessionId) return;
    setPhase("generating");
    fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, ...stored.current, answers: finalAnswers }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setLetter(data.letter);
        if (data.emailed && data.emailedTo) setEmailedTo(data.emailedTo);
        setPhase("done");
        localStorage.removeItem(ANSWERS_KEY);
      })
      .catch(() => setPhase("error"));
  }

  function saveAnswerAndAdvance(skip: boolean) {
    const q = questions[qIndex];
    const next = { ...answers };
    if (!skip && currentAnswer.trim()) {
      next[q.question] = currentAnswer.trim();
      setAnswers(next);
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(next));
    }
    setCurrentAnswer("");
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
    } else {
      generate(next);
    }
  }

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

  if (phase === "verifying") {
    return (
      <div className="mx-auto max-w-md px-4 py-24">
        <p className="text-center text-lg font-medium text-slate-700">
          Payment confirmed ✓
        </p>
        <GenerationProgress label="Reviewing your answers" />
      </div>
    );
  }

  if (phase === "interview") {
    const q = questions[qIndex];
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <span className="font-semibold">✓ Payment confirmed.</span> Before I write your
          letter — a few quick questions to fill the gaps in your story. The more specific
          you are, the fewer blanks you&apos;ll have to fill in yourself. Every question is
          optional.
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
            <span>
              Question {qIndex + 1} of {questions.length}
            </span>
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-6 rounded-full ${
                    i < qIndex ? "bg-indigo-600" : i === qIndex ? "bg-indigo-400" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <h2 className="text-lg font-semibold text-slate-900">{q.question}</h2>
          <p className="mt-2 text-sm text-slate-500">
            <span className="font-medium text-indigo-600">Why this matters:</span> {q.why}
          </p>

          <textarea
            rows={5}
            autoFocus
            className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder={q.hint}
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          />

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => saveAnswerAndAdvance(false)}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              {qIndex + 1 < questions.length ? "Save & next →" : "Write my letter →"}
            </button>
            <button
              onClick={() => saveAnswerAndAdvance(true)}
              className="text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              Skip this question
            </button>
            <button
              onClick={() => generate(answers)}
              className="ml-auto text-xs text-slate-400 hover:text-slate-600"
            >
              Skip all, write now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "generating") {
    return (
      <div className="mx-auto max-w-md px-4 py-24">
        <p className="text-center text-lg font-medium text-slate-700">
          Writing your full letter
        </p>
        <GenerationProgress label="Writing your full letter" />
      </div>
    );
  }

  if (phase === "noform") {
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

  if (phase === "error" || !letter) {
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
        ✓ Here&apos;s your full letter. Review the [bracketed] placeholders — those are
        administrative details only you know (claim ID, addresses). Everything else is ready.
        {emailedTo && (
          <span className="mt-1 block font-normal">
            📧 A copy with PDF and Word attachments was sent to <b>{emailedTo}</b> (check
            spam if you don&apos;t see it).
          </span>
        )}
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

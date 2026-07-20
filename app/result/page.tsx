import { Suspense } from "react";
import ResultClient from "./ResultClient";

export const metadata = {
  title: "Your letter — AppealKit",
  robots: { index: false },
};

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-slate-500">Loading…</div>}>
      <ResultClient />
    </Suspense>
  );
}

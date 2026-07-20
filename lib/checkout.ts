import Stripe from "stripe";

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export function baseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

/** Verify a checkout session is paid. In mock mode (no Stripe key), accept mock_ sessions. */
export async function verifyPaidSession(sessionId: string): Promise<{ paid: boolean; nicheId?: string }> {
  const stripe = getStripe();
  if (!stripe) {
    // Mock mode for local/dev testing without Stripe configured.
    if (sessionId.startsWith("mock_")) {
      return { paid: true, nicheId: sessionId.replace(/^mock_/, "").split("_")[0] };
    }
    return { paid: false };
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      paid: session.payment_status === "paid",
      nicheId: (session.metadata?.nicheId as string) || undefined,
    };
  } catch {
    return { paid: false };
  }
}

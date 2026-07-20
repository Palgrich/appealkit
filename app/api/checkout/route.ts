import { NextRequest, NextResponse } from "next/server";
import { NICHES } from "@/lib/niches";
import { getStripe, baseUrl } from "@/lib/checkout";

export async function POST(req: NextRequest) {
  try {
    const { nicheId } = await req.json();
    const niche = NICHES[nicheId];
    if (!niche) {
      return NextResponse.json({ error: "Invalid niche" }, { status: 400 });
    }

    const stripe = getStripe();
    if (!stripe) {
      // Mock mode: skip payment, go straight to result page with a mock session.
      const mockId = `mock_${niche.id}_${Math.random().toString(36).slice(2)}`;
      return NextResponse.json({
        url: `${baseUrl()}/result?session_id=${mockId}&niche=${niche.id}`,
        mock: true,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: niche.priceCents,
            product_data: {
              name: `${niche.name} — full letter + downloads`,
              description: niche.deliverables.join(" · "),
            },
          },
          quantity: 1,
        },
      ],
      metadata: { nicheId: niche.id },
      success_url: `${baseUrl()}/result?session_id={CHECKOUT_SESSION_ID}&niche=${niche.id}`,
      cancel_url: `${baseUrl()}/${niche.slug}?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("checkout error", e);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 500 });
  }
}

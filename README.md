# AppealKit

Professional appeal & rebuttal letters in minutes. Free preview → one-time payment ($7–9) → full letter + PDF/DOCX.

**Niches (one engine, many landings):**

- `/unemployment-appeal-letter-generator` — $7
- `/pip-rebuttal-letter-generator` — $9
- `/academic-dismissal-appeal-letter-generator` — $7

## Stack

Next.js (App Router) · Tailwind v4 · Anthropic API · Stripe Checkout · pdf-lib + docx for downloads. No database: form data lives in the visitor's localStorage; payment verification is done against Stripe on every unlock/download call.

## Deploy (Vercel, ~10 minutes)

1. Import this repo at vercel.com/new.
2. Add Environment Variables:

| Variable | Required | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | for real letters | без него работает mock-режим |
| `STRIPE_SECRET_KEY` | for real payments | `sk_live_...` (или `sk_test_...` для теста). Без него — mock-оплата |
| `NEXT_PUBLIC_BASE_URL` | yes | `https://yourdomain.com` (или временный `https://appealkit.vercel.app`) |
| `ANTHROPIC_MODEL` | no | default: `claude-sonnet-4-5` |

3. Deploy. Проверь флоу: лендинг → форма → превью → оплата (Stripe test card `4242 4242 4242 4242`) → полное письмо → PDF/DOCX.
4. Домен: купи, добавь в Vercel, обнови `NEXT_PUBLIC_BASE_URL`.
5. Google Search Console: добавь сайт, отправь `/sitemap.xml`.

## Dev

```bash
npm install
npm run dev
```

Без ключей всё работает в mock-режиме (мок-письмо, мок-оплата) — флоу тестируется целиком.

## Known MVP tradeoffs

- Оплаченная Stripe-сессия не помечается использованной — одну сессию теоретически можно переиспользовать для регенерации. Для $7-продукта приемлемо; фикс — Vercel KV со списком использованных session_id.
- Если покупатель откроет success-ссылку на другом устройстве, форма из localStorage недоступна — на странице есть объяснение и просьба открыть на исходном устройстве.
- Email-капчер не встроен (Stripe и так собирает email покупателя). Для рассылки добавить провайдера позже.

## Disclaimer

Not a law firm. No legal advice. Documents are drafts the user reviews and sends as their own.

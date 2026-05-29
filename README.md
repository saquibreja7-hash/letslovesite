This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Early Access Signup

The homepage signup CTA posts email requests to Google Forms through a server action. Add these values to `.env.local` or your deployment environment:

```bash
GOOGLE_FORM_ACTION_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
GOOGLE_FORM_EMAIL_ENTRY_ID=entry.1234567890
GOOGLE_FORM_FIRST_NAME_ENTRY_ID=entry.0987654321
GOOGLE_GROUP_JOIN_URL=https://groups.google.com/g/YOUR_TESTER_GROUP
GOOGLE_PLAY_TESTING_URL=https://play.google.com/apps/testing/YOUR_PACKAGE_NAME
EARLY_ACCESS_VOUCHER_FUNCTION_URL=https://asia-south1-YOUR_PROJECT.cloudfunctions.net/issueEarlyAccessVoucher
EARLY_ACCESS_ISSUER_SECRET=your_shared_backend_secret
EARLY_ACCESS_VOUCHER_DAYS=60
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL="Let's Love <testing@yourdomain.com>"
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

`GOOGLE_FORM_EMAIL_ENTRY_ID` is the Google Forms field name for the email input. `GOOGLE_FORM_FIRST_NAME_ENTRY_ID` is optional; add it if the Google Form also has a first-name question.
Resend is optional. When `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `EARLY_ACCESS_VOUCHER_FUNCTION_URL`, and `EARLY_ACCESS_ISSUER_SECRET` are set, the server action asks the app backend for a unique email-bound Premium voucher and includes it in the Early Access email after signup. The form also remembers submitted emails in the current browser and asks returning users to check their inbox instead of treating duplicates as an error.
`EARLY_ACCESS_VOUCHER_DAYS` controls how many Premium days the generated in-app voucher grants. The app backend is the source of truth for voucher creation and redemption.
`NEXT_PUBLIC_SITE_URL` should point to the production website so email clients can load the hosted logo image from `/logo.png`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

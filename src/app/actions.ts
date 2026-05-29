"use server";

type ClosedTestingSignupState = {
  status: "idle" | "success" | "error";
  message: string;
  emailSent?: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const voucherCodePattern = /^[A-Z0-9-]{4,32}$/;

type IssuedVoucher = {
  voucherCode: string;
  durationDays: number;
};

function getGoogleFormActionUrl(rawUrl: string) {
  const url = new URL(rawUrl);

  if (!url.hostname.endsWith("docs.google.com")) {
    throw new Error("Google Form URL must use docs.google.com.");
  }

  url.pathname = url.pathname.replace(/\/viewform$/, "/formResponse");
  url.search = "";

  return url.toString();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getConfiguredVoucherDurationDays() {
  const rawDays = process.env.EARLY_ACCESS_VOUCHER_DAYS;
  const days = rawDays ? Number(rawDays) : 90;
  return Number.isInteger(days) && days > 0 ? days : 90;
}

function formatVoucherDuration(days: number) {
  if (days === 30) return "1 month";
  if (days === 60) return "2 months";
  if (days === 90) return "3 months";
  if (days % 30 === 0) return `${days / 30} months`;
  return `${days} days`;
}

function getPublicAssetUrl(path: string) {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!rawBaseUrl) {
    return "";
  }

  const baseUrl = rawBaseUrl.startsWith("http") ? rawBaseUrl : `https://${rawBaseUrl}`;
  return new URL(path, baseUrl).toString();
}

async function issueEarlyAccessVoucher(email: string, firstName: string): Promise<IssuedVoucher | null> {
  const endpoint = process.env.EARLY_ACCESS_VOUCHER_FUNCTION_URL;
  const issuerSecret = process.env.EARLY_ACCESS_ISSUER_SECRET;

  if (!endpoint || !issuerSecret) {
    return null;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${issuerSecret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      firstName,
      durationDays: getConfiguredVoucherDurationDays(),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not issue voucher.");
  }

  const data: unknown = await response.json();
  const voucherCode = String((data as { voucherCode?: unknown }).voucherCode ?? "").trim().toUpperCase();
  const durationDays = Number((data as { durationDays?: unknown }).durationDays);

  if (!voucherCodePattern.test(voucherCode)) {
    throw new Error("Voucher service returned an invalid code.");
  }

  return {
    voucherCode,
    durationDays: Number.isInteger(durationDays) && durationDays > 0
      ? durationDays
      : getConfiguredVoucherDurationDays(),
  };
}

function buildClosedTestingEmailHtml(firstName: string, groupUrl: string, playTestingUrl: string, voucher: IssuedVoucher) {
  const instagramUrl = "https://www.instagram.com/letsloveapp/";
  const greetingName = firstName ? `, ${escapeHtml(firstName)}` : "";
  const safeGroupUrl = escapeHtml(groupUrl);
  const safePlayTestingUrl = escapeHtml(playTestingUrl);
  const safeInstagramUrl = escapeHtml(instagramUrl);
  const safeVoucherCode = escapeHtml(voucher.voucherCode);
  const durationLabel = escapeHtml(formatVoucherDuration(voucher.durationDays));
  const logoUrl = getPublicAssetUrl("/logo.png");
  const logoHtml = logoUrl
    ? `<img src="${escapeHtml(logoUrl)}" width="76" height="76" alt="Let's Love" style="display:block;margin:0 auto 14px;border:0;border-radius:18px;outline:none;text-decoration:none;">`
    : "";

  return `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml">
      <body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#000000;">
        <div style="max-width:600px;margin:0 auto;padding:0 40px;">
          <div style="padding:28px 0 26px;text-align:center;">
            ${logoHtml}
            <p style="margin:0;color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:700;line-height:1.2;">Let's Love</p>
            <p style="margin:4px 0 0;color:#64748b;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;">Closed Testing</p>
          </div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:normal;line-height:1.5;text-align:left;color:#000000;">
            <p style="margin:0;">Hi${greetingName},<br><br></p>
            <p style="margin:0;">Thank you for opting in to test Let's Love. We're really happy to have you with us in this early closed testing phase.<br><br></p>
            <p style="margin:0;">Please complete these two steps using the same Google account you use on your Android phone:<br><br></p>
            <p style="margin:0;">1. Join the tester Google Group: <a href="${safeGroupUrl}" style="color:#0068A5;text-decoration:underline;">Join group</a><br></p>
            <p style="margin:0;">2. Accept the Google Play test: <a href="${safePlayTestingUrl}" style="color:#0068A5;text-decoration:underline;">Open Play testing</a><br><br></p>
            <p style="margin:0;"><strong>As a small thank you, here is your ${durationLabel} Premium voucher code: ${safeVoucherCode}</strong><br><br></p>
            <p style="margin:0;">Redeem this code inside the app after you and your partner are paired. The code is tied to this email address and unlocks Premium for both partners in your couple space.<br><br></p>
            <p style="margin:0;">Since Let's Love is made for couples, please invite your partner to be part of closed testing too. Testing together will improve your app experience and give you a real opportunity to try the app the way it is meant to be used.<br><br></p>
            <p style="margin:0;">Your privacy matters deeply to us. Your data is stored securely on encrypted Google Cloud servers, and your couple space is designed so only you and your partner can access what you share together.<br><br></p>
            <p style="margin:0;">A small request from us: please keep the app active for 14 days. This helps us meet Google Play testing requirements and gives us enough real usage to improve the experience before publishing.<br><br></p>
            <p style="margin:0;">Please write back with any bugs, feedback, or feature requests. We'd love to accommodate helpful ideas wherever we can.<br><br></p>
            <p style="margin:0;">You can also follow us on Instagram: <a href="${safeInstagramUrl}" style="color:#0068A5;text-decoration:underline;">@letsloveapp</a></p>
            <p style="margin:0;"><br>With love,<br><br></p>
            <p style="margin:0;">JAMSAQ Studio</p>
            <p style="margin:0;">&nbsp;</p>
          </div>
          <div style="border-top:1px solid #ededed;padding:20px 0 30px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#64748b;text-align:center;">
            <p style="margin:0;">For any other enquiry, help, or support, write to us at <a href="mailto:support@jamsaq.in" style="color:#0068A5;text-decoration:underline;">support@jamsaq.in</a>.</p>
            <p style="margin:0;">Let's Love by JAMSAQ Studio</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

async function sendClosedTestingEmail(email: string, firstName: string, voucher: IssuedVoucher) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const groupUrl = process.env.GOOGLE_GROUP_JOIN_URL;
  const playTestingUrl = process.env.GOOGLE_PLAY_TESTING_URL;

  if (!resendApiKey || !fromEmail || !groupUrl || !playTestingUrl) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: email,
      subject: "Your Let's Love closed testing links",
      html: buildClosedTestingEmailHtml(firstName, groupUrl, playTestingUrl, voucher),
      text: [
        firstName ? `Thank you, ${firstName}, for opting in to test Let's Love.` : "Thank you for opting in to test Let's Love.",
        "",
        "We're grateful to have you in the closed test. Your usage and feedback will help us polish the app and move toward publishing on Google Play.",
        "",
        "Use the same Google account on your Android phone and complete these steps:",
        `1. Join the tester Google Group: ${groupUrl}`,
        `2. Accept the Google Play test: ${playTestingUrl}`,
        "",
        `Here is your ${formatVoucherDuration(voucher.durationDays)} Premium voucher code: ${voucher.voucherCode}`,
        "",
        "Redeem this code inside the app after you and your partner are paired. The code is tied to this email address and unlocks Premium for both partners in your couple space.",
        "",
        "Invite your partner too. Let's Love is made for couples, so testing together will improve your app experience and give you a real opportunity to try the app the way it is meant to be used.",
        "",
        "Your privacy matters deeply to us. Your data is stored securely on encrypted Google Cloud servers, and your couple space is designed so only you and your partner can access what you share together.",
        "",
        "Please keep the app active for 14 days. This helps us meet Google Play testing requirements and gives us enough real usage to improve the experience before publishing.",
        "",
        "Please write back with any bugs, feedback, or feature requests. We'd love to accommodate helpful ideas wherever we can.",
        "",
        "Follow Let's Love on Instagram: https://www.instagram.com/letsloveapp/",
        "",
        "For any other enquiry, help, or support, write to us at support@jamsaq.in.",
        "",
        "After accepting the test, Google Play will show the install option for Let's Love.",
        "",
        "With love,",
        "JAMSAQ Studio",
      ].join("\n"),
    }),
    cache: "no-store",
  });

  return response.ok;
}

export async function requestClosedTestingAccess(
  _previousState: ClosedTestingSignupState,
  formData: FormData,
): Promise<ClosedTestingSignupState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const firstName = String(formData.get("firstName") ?? "").trim();

  if (!emailPattern.test(email)) {
    return {
      status: "error",
      message: "Enter a valid email address.",
    };
  }

  const googleFormUrl = process.env.GOOGLE_FORM_ACTION_URL;
  const emailEntryId = process.env.GOOGLE_FORM_EMAIL_ENTRY_ID;
  const firstNameEntryId = process.env.GOOGLE_FORM_FIRST_NAME_ENTRY_ID;

  if (!googleFormUrl || !emailEntryId) {
    return {
      status: "error",
      message: "Early Access signup is not connected yet.",
    };
  }

  try {
    const body = new URLSearchParams();
    body.set(emailEntryId, email);
    if (firstNameEntryId && firstName) {
      body.set(firstNameEntryId, firstName);
    }

    const response = await fetch(getGoogleFormActionUrl(googleFormUrl), {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Could not submit right now. Please try again.",
      };
    }

    let emailSent = false;

    try {
      const voucher = await issueEarlyAccessVoucher(email, firstName);
      emailSent = voucher ? await sendClosedTestingEmail(email, firstName, voucher) : false;
    } catch {
      emailSent = false;
    }

    return {
      status: "success",
      message: emailSent
        ? "Thanks, your request is in. We emailed you the Early Access links too."
        : "Thanks, your Early Access request is in.",
      emailSent,
    };
  } catch {
    return {
      status: "error",
      message: "Could not submit right now. Please try again.",
    };
  }
}

"use server";

type ClosedTestingSignupState = {
  status: "idle" | "success" | "error";
  message: string;
  emailSent?: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getGoogleFormActionUrl(rawUrl: string) {
  const url = new URL(rawUrl);

  if (!url.hostname.endsWith("docs.google.com")) {
    throw new Error("Google Form URL must use docs.google.com.");
  }

  url.pathname = url.pathname.replace(/\/viewform$/, "/formResponse");
  url.search = "";

  return url.toString();
}

function buildClosedTestingEmailHtml(firstName: string, groupUrl: string, playTestingUrl: string) {
  const premiumCode = process.env.CLOSED_TESTING_PREMIUM_CODE ?? "TESTLOVE3M";
  const instagramUrl = "https://www.instagram.com/letsloveapp/";
  const greetingName = firstName ? `, ${firstName}` : "";

  return `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml">
      <body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#000000;">
        <div style="max-width:600px;margin:0 auto;padding:0 40px;">
          <div style="padding:28px 0 26px;text-align:center;">
            <p style="margin:0;color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:700;line-height:1.2;">Let's Love</p>
            <p style="margin:4px 0 0;color:#64748b;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;">Closed Testing</p>
          </div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:normal;line-height:1.5;text-align:left;color:#000000;">
            <p style="margin:0;">Hi${greetingName},<br><br></p>
            <p style="margin:0;">Thank you for opting in to test Let's Love. We're really happy to have you with us in this early closed testing phase.<br><br></p>
            <p style="margin:0;">Please complete these two steps using the same Google account you use on your Android phone:<br><br></p>
            <p style="margin:0;">1. Join the tester Google Group: <a href="${groupUrl}" style="color:#0068A5;text-decoration:underline;">Join group</a><br></p>
            <p style="margin:0;">2. Accept the Google Play test: <a href="${playTestingUrl}" style="color:#0068A5;text-decoration:underline;">Open Play testing</a><br><br></p>
            <p style="margin:0;"><strong>As a small thank you, here is your 3 months paid subscription activation code: ${premiumCode}</strong><br><br></p>
            <p style="margin:0;">Since Let's Love is made for couples, please invite your partner to be part of closed testing too. Testing together will improve your app experience and give you a real opportunity to try the app the way it is meant to be used.<br><br></p>
            <p style="margin:0;">Your privacy matters deeply to us. Your data is stored securely on encrypted Google Cloud servers, and your couple space is designed so only you and your partner can access what you share together.<br><br></p>
            <p style="margin:0;">A small request from us: please keep the app active for 14 days. This helps us meet Google Play testing requirements and gives us enough real usage to improve the experience before publishing.<br><br></p>
            <p style="margin:0;">Please write back with any bugs, feedback, or feature requests. We'd love to accommodate helpful ideas wherever we can.<br><br></p>
            <p style="margin:0;">You can also follow us on Instagram: <a href="${instagramUrl}" style="color:#0068A5;text-decoration:underline;">@letsloveapp</a></p>
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

async function sendClosedTestingEmail(email: string, firstName: string) {
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
      html: buildClosedTestingEmailHtml(firstName, groupUrl, playTestingUrl),
      text: [
        firstName ? `Thank you, ${firstName}, for opting in to test Let's Love.` : "Thank you for opting in to test Let's Love.",
        "",
        "We're grateful to have you in the closed test. Your usage and feedback will help us polish the app and move toward publishing on Google Play.",
        "",
        "Use the same Google account on your Android phone and complete these steps:",
        `1. Join the tester Google Group: ${groupUrl}`,
        `2. Accept the Google Play test: ${playTestingUrl}`,
        "",
        `Here is your 3 months paid subscription activation code: ${process.env.CLOSED_TESTING_PREMIUM_CODE ?? "TESTLOVE3M"}`,
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
      message: "Closed testing signup is not connected yet.",
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
      emailSent = await sendClosedTestingEmail(email, firstName);
    } catch {
      emailSent = false;
    }

    return {
      status: "success",
      message: emailSent
        ? "Thanks, your request is in. We emailed you the testing links too."
        : "Thanks, your closed testing request is in.",
      emailSent,
    };
  } catch {
    return {
      status: "error",
      message: "Could not submit right now. Please try again.",
    };
  }
}

import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * - Validates the payload.
 * - If process.env.RESEND_API_KEY is set AND a RESEND_TO / RESEND_FROM email
 *   pair is configured, also delivers the message via Resend's HTTP API.
 * - Otherwise it just returns a synthetic reference ID so the demo works
 *   out of the box on Vercel without any secrets.
 *
 * The route is server-rendered (Node), so it adds a tiny bit of runtime
 * cost . but it does NOT block the rest of the site from beingstatic /
 * client-side.
 */

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function genRef() {
  return (
    Math.random().toString(36).slice(2, 8).toUpperCase() +
    "-" +
    Date.now().toString(36).slice(-4).toUpperCase()
  );
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Malformed JSON payload." },
      { status: 400 }
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ error: "Name must be 2–120 chars." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please use a valid email." }, { status: 400 });
  }
  if (message.length < 5 || message.length > 4000) {
    return NextResponse.json({ error: "Message must be 5–4000 chars." }, { status: 400 });
  }

  const reference = genRef();

  // Optional email delivery . only fires if the user adds RESEND_API_KEY
  // and the associated TO/FROM env vars in their Vercel project.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO;
  const from = process.env.RESEND_FROM;

  if (apiKey && to && from) {
    try {
      const html = `
        <div style="font-family: ui-monospace, monospace; color: #111;">
          <p><strong>New portfolio contact</strong></p>
          <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
          <p><strong>Ref:</strong> ${reference}</p>
          <hr/>
          <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message)}</pre>
        </div>`;
      const text =
        `New portfolio contact\n\nFrom: ${name} <${email}>\nRef: ${reference}\n\n${message}`;
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, subject: `Portfolio contact · ${reference}`, html, text }),
      });
      if (!r.ok) {
        const errText = await r.text();
        // Don't fail the user . they got their message logged.
        console.error("Resend delivery failed:", r.status, errText);
      }
    } catch (e) {
      console.error("Resend error:", e);
    }
  } else {
    console.log(
      `[contact] ${reference} . ${name} <${email}> . ${message.slice(0, 80)}…`
    );
  }

  return NextResponse.json({ ok: true, reference });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET() {
  // GET is a no-op . the form uses POST.
  return NextResponse.json({ hint: "POST { name, email, message } to this endpoint." });
}

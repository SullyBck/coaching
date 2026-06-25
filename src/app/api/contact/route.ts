import { NextResponse } from "next/server";
import { getContactContent } from "@/content";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = body?.name;
  const email = body?.email;
  const message = body?.message;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const contact = await getContactContent("fr");
  if (!contact.email) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const { ok } = await sendEmail({
    to: contact.email,
    subject: `Nouveau message de ${name.trim()}`,
    html: `<p>${message.trim().replace(/\n/g, "<br>")}</p><p>— ${name.trim()} (${email.trim()})</p>`,
    replyTo: email.trim(),
  });

  if (!ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

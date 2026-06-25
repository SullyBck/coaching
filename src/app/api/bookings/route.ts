import { NextResponse } from "next/server";
import { getAvailableSlots, getContactContent } from "@/content";
import { getWriteClient } from "@/sanity/lib/writeClient";
import { sendEmail } from "@/lib/email";

// GET  -> { slots: { id, start, durationMinutes }[] }
// POST { slotId, name, email } ->
//   200 { ok: true }
//   400 { error: "invalid_request" }
//   404 { error: "not_found" }
//   409 { error: "slot_unavailable" }

export async function GET() {
  const slots = await getAvailableSlots();
  return NextResponse.json({ slots });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const slotId = body?.slotId;
  const name = body?.name;
  const email = body?.email;

  if (
    typeof slotId !== "string" ||
    typeof name !== "string" ||
    typeof email !== "string" ||
    !name.trim() ||
    !email.trim()
  ) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  let writeClient;
  try {
    writeClient = getWriteClient();
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const fresh = await writeClient.fetch(
    `*[_id == $slotId][0]{ "rev": _rev, start, "booked": defined(booking.email) }`,
    { slotId },
  );

  if (!fresh) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (fresh.booked || new Date(fresh.start) <= new Date()) {
    return NextResponse.json({ error: "slot_unavailable" }, { status: 409 });
  }

  try {
    await writeClient
      .patch(slotId)
      .ifRevisionId(fresh.rev)
      .set({
        booking: {
          name: name.trim(),
          email: email.trim(),
          bookedAt: new Date().toISOString(),
        },
      })
      .commit();
  } catch {
    return NextResponse.json({ error: "slot_unavailable" }, { status: 409 });
  }

  const contact = await getContactContent("fr");
  const when = new Date(fresh.start).toLocaleString("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  });

  await sendEmail({
    to: email.trim(),
    subject: "Confirmation de votre rendez-vous",
    html: `<p>Bonjour ${name.trim()},</p><p>Votre rendez-vous est confirmé pour le ${when}.</p>`,
  });

  if (contact.email) {
    await sendEmail({
      to: contact.email,
      subject: "Nouvelle réservation de créneau",
      html: `<p>${name.trim()} (${email.trim()}) a réservé le créneau du ${when}.</p>`,
      replyTo: email.trim(),
    });
  }

  return NextResponse.json({ ok: true });
}

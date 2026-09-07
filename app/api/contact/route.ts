import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type VendingPayload = {
  formType: "vending";
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  location?: string;
  message?: string;
};

type ApartmentPayload = {
  formType: "apartment";
  name?: string;
  email?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  message?: string;
};

type Payload = VendingPayload | ApartmentPayload;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: Payload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();

  if (!name || !email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Vul minimaal uw naam en een geldig e-mailadres in." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "info@marjanivending.nl";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Marjani Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.error(
      "RESEND_API_KEY ontbreekt. Voeg deze toe aan .env.local om e-mails te kunnen versturen."
    );
    return NextResponse.json(
      {
        error:
          "De mailservice is nog niet geconfigureerd. Neem telefonisch of via WhatsApp contact op.",
      },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  let subject: string;
  let html: string;

  if (body.formType === "apartment") {
    const b = body as ApartmentPayload;
    subject = `Boekingsaanvraag Marjani Apartments — ${name}`;
    html = `
      <h2>Nieuwe boekingsaanvraag — Marjani Apartments</h2>
      <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefoon:</strong> ${escapeHtml(String(b.phone || "-"))}</p>
      <p><strong>Inchecken:</strong> ${escapeHtml(String(b.checkIn || "-"))}</p>
      <p><strong>Uitchecken:</strong> ${escapeHtml(String(b.checkOut || "-"))}</p>
      <p><strong>Aantal personen:</strong> ${escapeHtml(String(b.guests || "-"))}</p>
      <p><strong>Opmerking:</strong><br/>${escapeHtml(
        String(b.message || "-")
      ).replace(/\n/g, "<br/>")}</p>
    `;
  } else {
    const b = body as VendingPayload;
    subject = `Offerte-aanvraag Marjani Vending — ${name}`;
    html = `
      <h2>Nieuwe offerte-aanvraag — Marjani Vending</h2>
      <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
      <p><strong>Bedrijf:</strong> ${escapeHtml(String(b.company || "-"))}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefoon:</strong> ${escapeHtml(String(b.phone || "-"))}</p>
      <p><strong>Locatie:</strong> ${escapeHtml(String(b.location || "-"))}</p>
      <p><strong>Bericht:</strong><br/>${escapeHtml(
        String(b.message || "-")
      ).replace(/\n/g, "<br/>")}</p>
    `;
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Versturen van e-mail is mislukt. Probeer het later opnieuw." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Onverwachte fout bij versturen e-mail:", err);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}

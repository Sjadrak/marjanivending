"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "min-h-12 rounded-xl border border-mv-green/15 bg-mv-cream/60 px-4 py-2.5 text-base font-normal text-mv-green placeholder:text-mv-green/40 transition-colors focus:border-mv-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-mv-gold/30 sm:min-h-0 sm:text-sm";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots vullen dit onzichtbare veld vaak wél in.
    if (data.get("website")) {
      setStatus("success");
      form.reset();
      return;
    }

    const payload = {
      formType: "vending",
      name: data.get("name"),
      company: data.get("company"),
      email: data.get("email"),
      phone: data.get("phone"),
      location: data.get("location"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Er ging iets mis. Probeer het opnieuw.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Er ging iets mis."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-white px-6 py-16 text-center font-manrope shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mv-gold-bright text-mv-green-deep">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
            <path
              d="M5 12.5 10 17l9-10"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="text-[22px] font-extrabold tracking-[-0.02em] text-mv-green">
          Bedankt voor uw aanvraag!
        </h3>
        <p className="max-w-sm text-[15px] leading-[1.7] text-mv-green/70">
          We hebben uw vraag ontvangen en nemen zo snel mogelijk contact met
          u op, meestal binnen één werkdag.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-3xl bg-white p-5 font-manrope shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:p-9"
    >
      {/* Honeypot veld, verborgen voor mensen */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="mb-1">
        <p className="text-[20px] font-extrabold tracking-[-0.02em] text-mv-green">
          Offerte aanvragen
        </p>
        <p className="mt-1 text-[14px] text-mv-green/60">
          Vrijblijvend en binnen één werkdag reactie.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Naam" name="name" required autoComplete="name" />
        <Field label="Bedrijfsnaam" name="company" autoComplete="organization" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="E-mailadres"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
        <Field label="Telefoonnummer" name="phone" type="tel" autoComplete="tel" />
      </div>
      <Field
        label="Locatie / vestigingsplaats"
        name="location"
        placeholder="Bijv. kantoor in Den Haag, 40 medewerkers"
      />
      <label className="grid gap-1.5 text-[13px] font-bold text-mv-green">
        Uw vraag of situatie
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Vertel ons kort over de locatie en waar u naar op zoek bent..."
          className={`${inputClass} py-3`}
        />
      </label>

      {status === "error" && (
        <p className="rounded-xl bg-marjani-red/10 px-4 py-2.5 text-sm font-medium text-marjani-red">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex h-[52px] w-full items-center justify-center rounded-xl bg-mv-gold-bright px-8 text-[14px] font-extrabold uppercase tracking-wide text-mv-green-deep transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(232,190,63,0.3)] disabled:opacity-60"
      >
        {status === "loading" ? "Versturen..." : "Vraag offerte aan"}
      </button>
      <p className="text-[12px] leading-relaxed text-mv-green/50">
        Door te versturen gaat u akkoord dat wij per e-mail of telefoon
        contact met u opnemen over uw aanvraag.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5 text-[13px] font-bold text-mv-green">
      <span>
        {label}
        {required && <span className="text-mv-gold"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

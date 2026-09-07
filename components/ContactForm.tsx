"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

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
      <div className="card flex flex-col items-center gap-3 border-service-green/30 bg-service-green/5 py-12 text-center">
        <svg viewBox="0 0 48 48" className="h-12 w-12 text-service-green">
          <circle cx="24" cy="24" r="22" fill="currentColor" opacity="0.12" />
          <path
            d="M15 24.5 21 30l12-13"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="text-xl font-bold text-service-green-dark">
          Bedankt voor uw aanvraag!
        </h3>
        <p className="max-w-sm text-sm text-service-green-dark/70">
          We hebben uw vraag ontvangen en nemen zo snel mogelijk contact met
          u op, meestal binnen één werkdag.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card grid gap-4">
      {/* Honeypot veld, verborgen voor mensen */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

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
      <label className="grid gap-1.5 text-sm font-semibold text-service-green-dark">
        Uw vraag of situatie
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Vertel ons kort over de locatie en waar u naar op zoek bent..."
          className="rounded-xl border border-service-green/20 bg-off-white/60 px-4 py-3 text-sm font-normal text-service-green-dark placeholder:text-service-green-dark/40 focus:border-service-green focus:outline-none focus:ring-2 focus:ring-service-green/30"
        />
      </label>

      {status === "error" && (
        <p className="rounded-lg bg-marjani-red/10 px-4 py-2 text-sm font-medium text-marjani-red">
          {errorMessage}
        </p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary mt-2 w-full sm:w-auto">
        {status === "loading" ? "Versturen..." : "Vraag offerte aan"}
      </button>
      <p className="text-xs text-service-green-dark/50">
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
    <label className="grid gap-1.5 text-sm font-semibold text-service-green-dark">
      {label}
      {required && <span className="text-marjani-red"> *</span>}
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="rounded-xl border border-service-green/20 bg-off-white/60 px-4 py-2.5 text-sm font-normal text-service-green-dark placeholder:text-service-green-dark/40 focus:border-service-green focus:outline-none focus:ring-2 focus:ring-service-green/30"
      />
    </label>
  );
}

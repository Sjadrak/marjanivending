"use client";

import { useMemo, useState, FormEvent } from "react";
import { isDateBooked } from "@/lib/availability";

const WEEKDAYS = ["ma", "di", "wo", "do", "vr", "za", "zo"];
const MONTH_NAMES = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];

function buildMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7; // maandag = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = Array(startOffset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function MonthGrid({ year, month }: { year: number; month: number }) {
  const cells = useMemo(() => buildMonth(year, month), [year, month]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="rounded-2xl border border-service-green/15 bg-white p-4 shadow-card">
      <p className="mb-3 text-center font-heading text-sm font-bold uppercase tracking-wide text-service-green-dark">
        {MONTH_NAMES[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-service-green-dark/50">
        {WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const booked = isDateBooked(date);
          const isPast = date < today;
          return (
            <div
              key={i}
              title={booked ? "Bezet" : "Beschikbaar"}
              className={`flex aspect-square items-center justify-center rounded-md text-[11px] font-semibold ${
                isPast
                  ? "text-service-green-dark/25"
                  : booked
                  ? "bg-marjani-red/15 text-marjani-red"
                  : "bg-service-green/10 text-service-green-dark"
              }`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type Status = "idle" | "loading" | "success" | "error";

export default function BookingWidget() {
  const now = new Date();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const todayIso = now.toISOString().slice(0, 10);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) {
      setStatus("success");
      form.reset();
      return;
    }

    const payload = {
      formType: "apartment",
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      checkIn: data.get("checkIn"),
      checkOut: data.get("checkOut"),
      guests: data.get("guests"),
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

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-service-green-dark/70">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-service-green/10" /> Beschikbaar
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-marjani-red/15" /> Bezet
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <MonthGrid year={now.getFullYear()} month={now.getMonth()} />
          <MonthGrid
            year={now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear()}
            month={(now.getMonth() + 1) % 12}
          />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-service-green-dark/50">
          De kalender toont een indicatie van de bezetting. Twijfelt u over
          een datum? Laat hieronder uw gewenste periode achter en wij
          bevestigen persoonlijk de definitieve beschikbaarheid.
        </p>
      </div>

      {status === "success" ? (
        <div className="card flex flex-col items-center justify-center gap-3 border-service-green/30 bg-service-green/5 py-12 text-center">
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
            Boekingsaanvraag verstuurd!
          </h3>
          <p className="max-w-sm text-sm text-service-green-dark/70">
            Bedankt! We bevestigen de beschikbaarheid voor uw gewenste
            periode zo snel mogelijk per e-mail.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card grid gap-4">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-semibold text-service-green-dark">
              Inchecken
              <input
                type="date"
                name="checkIn"
                required
                min={todayIso}
                className="rounded-xl border border-service-green/20 bg-off-white/60 px-4 py-2.5 text-sm font-normal text-service-green-dark focus:border-service-green focus:outline-none focus:ring-2 focus:ring-service-green/30"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-service-green-dark">
              Uitchecken
              <input
                type="date"
                name="checkOut"
                required
                min={todayIso}
                className="rounded-xl border border-service-green/20 bg-off-white/60 px-4 py-2.5 text-sm font-normal text-service-green-dark focus:border-service-green focus:outline-none focus:ring-2 focus:ring-service-green/30"
              />
            </label>
          </div>

          <label className="grid gap-1.5 text-sm font-semibold text-service-green-dark">
            Aantal personen
            <input
              type="number"
              name="guests"
              min={1}
              max={12}
              defaultValue={2}
              className="rounded-xl border border-service-green/20 bg-off-white/60 px-4 py-2.5 text-sm font-normal text-service-green-dark focus:border-service-green focus:outline-none focus:ring-2 focus:ring-service-green/30"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-semibold text-service-green-dark">
              Naam <span className="text-marjani-red">*</span>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                className="rounded-xl border border-service-green/20 bg-off-white/60 px-4 py-2.5 text-sm font-normal text-service-green-dark focus:border-service-green focus:outline-none focus:ring-2 focus:ring-service-green/30"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-service-green-dark">
              E-mailadres <span className="text-marjani-red">*</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className="rounded-xl border border-service-green/20 bg-off-white/60 px-4 py-2.5 text-sm font-normal text-service-green-dark focus:border-service-green focus:outline-none focus:ring-2 focus:ring-service-green/30"
              />
            </label>
          </div>

          <label className="grid gap-1.5 text-sm font-semibold text-service-green-dark">
            Telefoonnummer
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              className="rounded-xl border border-service-green/20 bg-off-white/60 px-4 py-2.5 text-sm font-normal text-service-green-dark focus:border-service-green focus:outline-none focus:ring-2 focus:ring-service-green/30"
            />
          </label>

          <label className="grid gap-1.5 text-sm font-semibold text-service-green-dark">
            Opmerking (optioneel)
            <textarea
              name="message"
              rows={3}
              placeholder="Bijv. laat aankomst, huisdier, extra vragen..."
              className="rounded-xl border border-service-green/20 bg-off-white/60 px-4 py-3 text-sm font-normal text-service-green-dark placeholder:text-service-green-dark/40 focus:border-service-green focus:outline-none focus:ring-2 focus:ring-service-green/30"
            />
          </label>

          {status === "error" && (
            <p className="rounded-lg bg-marjani-red/10 px-4 py-2 text-sm font-medium text-marjani-red">
              {errorMessage}
            </p>
          )}

          <button type="submit" disabled={status === "loading"} className="btn-primary mt-2 w-full">
            {status === "loading" ? "Versturen..." : "Vraag beschikbaarheid aan"}
          </button>
        </form>
      )}
    </div>
  );
}

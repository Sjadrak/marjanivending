// Voorbeeld-agenda voor Marjani Apartments.
//
// Er is bewust GEEN database gekoppeld: de site heeft geen live boekingssysteem
// nodig. In plaats daarvan toont de kalender hieronder welke data indicatief
// bezet zijn, en stuurt de bezoeker via het formulier een boekingsaanvraag met
// gewenste in- en uitcheckdatum. Jullie bevestigen de boeking vervolgens
// persoonlijk per e-mail / WhatsApp.
//
// Beheer: pas de datums hieronder simpelweg met de hand aan (formaat "YYYY-MM-DD").

export type DateRange = {
  start: string; // YYYY-MM-DD, inclusief
  end: string; // YYYY-MM-DD, inclusief
  label?: string;
};

export const BOOKED_RANGES: DateRange[] = [
  { start: "2026-09-10", end: "2026-09-14", label: "Bezet" },
  { start: "2026-09-21", end: "2026-09-23", label: "Bezet" },
  { start: "2026-10-02", end: "2026-10-09", label: "Bezet" },
];

function toUTCDate(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function isDateBooked(date: Date): boolean {
  const t = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return BOOKED_RANGES.some(
    (range) => t >= toUTCDate(range.start) && t <= toUTCDate(range.end)
  );
}

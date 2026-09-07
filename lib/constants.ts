// Centrale plek voor bedrijfsgegevens. Pas hier één keer aan, overal op de
// site wordt automatisch bijgewerkt.

export const SITE = {
  name: "Marjani Global Services",
  location: "Wateringen, Nederland",
  phoneDisplay: "+31 6 12 34 56 78",
  phoneHref:
    "tel:" + (process.env.NEXT_PUBLIC_PHONE_NUMBER || "+31612345678"),
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "31612345678",
  email: "info@marjanivending.nl",
};

export function whatsappHref(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
}

export const VENDING = {
  title: "Marjani Vending",
  tagline: "Zorgeloze snack- & drankvoorziening voor uw bedrijf",
  whatsappMessage:
    "Hallo Marjani Vending, ik wil graag meer weten over een vending-automaat op locatie.",
};

export const APARTMENTS = {
  title: "Marjani Apartments",
  tagline: "Sfeervolle verblijven, kort of langer verhuurd",
  whatsappMessage:
    "Hallo Marjani Apartments, ik wil graag de beschikbaarheid van een appartement bespreken.",
};

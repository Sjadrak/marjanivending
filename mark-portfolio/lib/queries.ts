/*
  DATA-LAAG
  Elke sectie haalt zijn inhoud op via een async functie. Nu komt alles uit lokale bestanden,
  maar wil je later een CMS (Sanity, Contentful, Notion…) gebruiken? Vervang dan alleen
  de inhoud van deze functies — de componenten blijven hetzelfde.
*/

import { aiLabItems, type AiLabItem } from "@/lib/ai-lab";
import { aboutFacts, certificates, meters, reflectionAnswers, timeline } from "@/lib/content";
import { creditBlocks, creditLeads, creditsMotto, type CreditBlock } from "@/lib/credits";
import { growthChapters, type GrowthChapter } from "@/lib/growth";
import { filters, projectCards, type ProjectCard } from "@/lib/projects";
import type { Category } from "@/lib/types";

export interface ArchiveData {
  filters: { id: "all" | Category; label: string }[];
  projects: ProjectCard[];
}

/** Alles wat omhoog rolt in de aftiteling: over mij, skills, chronologie en zelfreflectie */
export interface CreditsData {
  leads: { role: string; name: string }[];
  facts: [label: string, value: string][];
  blocks: CreditBlock[];
  timeline: { label: string; text: string }[];
  meters: { name: string; level: string; value: number; note: string }[];
  answers: { question: string; answer: string; delay: string }[];
  certificates: { title: string; src: string; caption: string }[];
  motto: string;
}

export interface ContactChannel {
  role: string;
  label: string;
  href: string;
  external: boolean;
}

export async function getArchive(): Promise<ArchiveData> {
  return { filters, projects: projectCards };
}

export async function getEvidence(): Promise<GrowthChapter[]> {
  return growthChapters;
}

export async function getVisions(): Promise<AiLabItem[]> {
  return aiLabItems;
}

export async function getCredits(): Promise<CreditsData> {
  return {
    leads: creditLeads,
    facts: aboutFacts,
    blocks: creditBlocks,
    timeline,
    meters,
    answers: reflectionAnswers,
    certificates,
    motto: creditsMotto,
  };
}

// ✏️ CONTACT: de kanalen op het slotscherm
export async function getContactChannels(): Promise<ContactChannel[]> {
  return [
    { role: "Instagram", label: "@Marked_by_", href: "https://www.instagram.com/marked_by_/", external: true },
    {
      role: "E-mail",
      label: "Markie.vandijk@gmail.com",
      href: "mailto:Markie.vandijk@gmail.com?subject=Stage%20Marketing%20%26%20Content%20Creatie",
      external: false,
    },
    { role: "Agency", label: "@the_next_motion", href: "https://www.instagram.com/the_next_motion/", external: true },
  ];
}

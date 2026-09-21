export const PROJECT_IDS = [
  "tnm",
  "swapfiets",
  "katendrecht",
  "kruidvat",
  "rotspot",
  "trailers",
  "marjani",
  "compass",
  "ads",
  "social",
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export type Category = "video" | "ai" | "campagne" | "web";

export function isProjectId(value: string): value is ProjectId {
  return (PROJECT_IDS as readonly string[]).includes(value);
}

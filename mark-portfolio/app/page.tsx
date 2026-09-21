import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import DialogProvider from "@/components/DialogProvider";
import Header from "@/components/Header";
import Archive from "@/components/sections/Archive";
import CreditsRoll from "@/components/sections/CreditsRoll";
import Evidence from "@/components/sections/Evidence";
import FinalScreen from "@/components/sections/FinalScreen";
import Hero from "@/components/sections/Hero";
import Visions from "@/components/sections/Visions";
import StagePlan from "@/components/sections/StagePlan";
import { getArchive, getContactChannels, getCredits, getEvidence, getVisions } from "@/lib/queries";

/*
  DE FILM — geen gewone scrollpagina, maar scènes die je op eigen tempo afspeelt.

  Reel 00  Hero          PINT VAST · het camerabeeld zoomt in, de titel splitst en vervaagt   (Framer Motion)
  Reel 01  The Archive   PINT VAST · verticale scroll = horizontale filmrol, sleepbaar         (Framer Motion)
  Reel 02  The Evidence  groei achter de camera: drie video's van The Next Motion
  Reel 03  Visions       generatieve AI · sleepbare galerij
  Reel 04  End Credits   PINT VAST · over mij en skills rollen omhoog op jouw scrollsnelheid   (Framer Motion)
  Reel 05  Final Screen  contact

  Alle data komt async uit lib/queries.ts, zodat je later eenvoudig een CMS kunt aansluiten.
  Beeld en video vervangen? Zoek in de code naar "🎬 JOUW" en "🖼️ JOUW".
*/
export default async function Home() {
  const [archive, evidence, visions, credits, channels] = await Promise.all([
    getArchive(),
    getEvidence(),
    getVisions(),
    getCredits(),
    getContactChannels(),
  ]);

  return (
    <DialogProvider>
      {/* Skip-link voor toegankelijkheid */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:border focus:border-ember focus:bg-void focus:px-5 focus:py-3 focus:font-hahmlet focus:text-[11px] focus:uppercase focus:tracking-reel focus:text-ember"
      >
        Direct naar de inhoud
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Archive {...archive} />
        <Evidence chapters={evidence} />
        <Visions items={visions} />
        <StagePlan />
        <CreditsRoll {...credits} />
      </main>

      <FinalScreen channels={channels} />

      <BackToTop />
      <CustomCursor />
    </DialogProvider>
  );
}

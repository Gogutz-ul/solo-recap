import { staticFile } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// SOLO brand tokens (from the SOLO design system).
// GT Walsheim is the brand face; Inter is the licensed fallback we can load freely.
// Restrict weights/subsets: keeps render fast and includes latin-ext for Romanian diacritics (ș ț ă î â).
export const { fontFamily: BRAND_FONT } = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
});

export const COLORS = {
  yellow: "#FEDA00",
  black: "#161616",
  white: "#FFFFFF",
  neutralLightest: "#F7F7F7",
  neutralLighter: "#E4E4E4",
  neutralDark: "#5C5C5C",
  success: "#027A48",
  error: "#B42318",
} as const;

export const SOLO_LOGO_URL =
  "https://cdn.prod.website-files.com/682c95469694ffafbf019863/696fb505d804dec22da678d9_negru%20transparent%20(3).webp";

export type Activity = "driver" | "it";

export const ACTIVITY_LABEL: Record<Activity, string> = {
  driver: "Șofer Uber / Bolt",
  it: "IT & Programare",
};

// Character SVGs live in public/characters as `${n}-01.svg`.
export const character = (n: number) => staticFile(`characters/${n}-01.svg`);
// White-line variants (black fills → white) for dark backgrounds.
export const characterWhite = (n: number) => staticFile(`characters/${n}-white.svg`);

// Curated character → mood mapping (tuned visually against the 20 brand SVGs).
export const CHARACTERS = {
  welcome: character(1), // upright, friendly — welcoming
  driverHero: character(20), // driver shown in the lit cabin window (SOLO Wrapped reference)
  devTyping: character(10), // seated-on-phone reads as seated at a desk
  surprised: character(20), // arms up, sparkles — surprised / wow
  celebrate: character(9), // celebratory
  wince: character(14), // pensive / leaning — spending hurts
  victory: character(12), // flag raised — net positive
  down: character(7), // slumped — net negative
  taxes: character(2), // presenting / official paperwork pose
  persona: character(4), // confident hero
  outro: character(9), // celebratory send-off
} as const;

const leiFormatter = new Intl.NumberFormat("ro-RO", {
  maximumFractionDigits: 0,
});

export const formatNumber = (n: number) => leiFormatter.format(Math.round(n));
export const formatLei = (n: number) => `${formatNumber(n)} lei`;

export type Persona = { title: string; subtitle: string };

// Deterministic "personality of your 2025" from the numbers + activity.
export const getPersona = (
  data: { moneyIn: number; moneyOut: number; activity: Activity },
): Persona => {
  const { moneyIn, moneyOut, activity } = data;
  const net = moneyIn - moneyOut;
  const margin = moneyIn > 0 ? net / moneyIn : 0;

  if (activity === "driver") {
    if (margin >= 0.6)
      return {
        title: "Magnatul din spatele volanului",
        subtitle: "Ai transformat fiecare cursă în profit. Respect, șefule.",
      };
    if (margin >= 0.3)
      return {
        title: "Pilotul de cursă lungă",
        subtitle: "Kilometri mulți, nervi de oțel și cont în creștere.",
      };
    return {
      title: "Eroul din trafic",
      subtitle: "Ai dus oameni acasă tot anul. Acum e rândul tău să te relaxezi.",
    };
  }

  // it
  if (margin >= 0.6)
    return {
      title: "Regele commit-urilor",
      subtitle: "Cod curat, facturi curate. 2025 a compilat fără erori.",
    };
  if (margin >= 0.3)
    return {
      title: "Arhitectul nopților albe",
      subtitle: "Ai livrat la timp și ai și rămas cu bani. Rar și frumos.",
    };
  return {
    title: "Debuggerul de buzunar",
    subtitle: "Anul ăsta a avut multe bug-uri în buget. Le rezolvăm în 2026.",
  };
};

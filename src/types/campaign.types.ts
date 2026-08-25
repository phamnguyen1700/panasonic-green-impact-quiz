export type ForestTone = "mint" | "sun" | "aqua" | "sky" | "moss";

export interface ForestPersonality {
  id: string;
  /** e.g. "Rừng phòng hộ" */
  name: string;
  /** e.g. "Đầu nguồn" */
  region: string;
  /** two-word trait pair shown on the card face */
  traits: [string, string];
  description: string;
  tone: ForestTone;
}

export interface CampaignCopy {
  brand: { name: string; tagline: string; years: string };
  home: {
    eyebrow: string;
    headlineTop: string;
    headlineMain: string;
    headlineTail: string;
    supporting: string;
    cta: string;
    footnote: string;
  };
  info: {
    eyebrow: string;
    title: string;
    intro: string;
    bullets: string[];
    form: {
      nameLabel: string;
      namePlaceholder: string;
      nameRequiredError: string;
      phoneLabel: string;
      phonePlaceholder: string;
      phoneOptionalHint: string;
      phoneInvalidError: string;
      consent: string;
      cta: string;
      back: string;
    };
    previewTitle: string;
  };
}

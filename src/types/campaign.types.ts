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
  quiz: {
    eyebrow: string;
    progressLabel: string;
    timerLabel: string;
    timerWarning: string;
    next: string;
    finish: string;
    back: string;
    hint: string;
  };
  result: {
    eyebrow: string;
    revealLine: string;
    revealName: string;
    cardBadge: string;
    traitsLabel: string;
    impactLabel: string;
    download: string;
    downloading: string;
    share: string;
    sharing: string;
    replay: string;
    sharePreviewTitle: string;
    sharePreviewCaption: string;
    shareHashtags: string;
    saved: string;
    shareFallback: string;
  };
}

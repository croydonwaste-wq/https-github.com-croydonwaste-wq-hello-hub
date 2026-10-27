export type Faq = { q: string; a: string };

export type ContentBlock = {
  h2: string;
  paras?: string[];
  list?: string[];
  subs?: { h3: string; text: string }[];
};

export type Keywords = { primary: string; secondary: string[]; longTail: string[] };

export type Service = {
  slug: string;
  name: string;
  /** Short label for nav/cards */
  short: string;
  icon: IconName;
  group: "home" | "items" | "commercial";
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  /** Concise direct answer, written for featured snippets and AI answers */
  answer: string;
  cardText: string;
  takes: string[];
  blocks: ContentBlock[];
  faqs: Faq[];
  related: string[];
  customers: string[];
  keywords: Keywords;
};

export type Location = {
  slug: string;
  town: string;
  county: "Hertfordshire" | "Bedfordshire" | "Buckinghamshire" | "North London";
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  answer: string;
  areas: string[];
  postcodes: string[];
  blocks: ContentBlock[];
  popular: string[];
  nearby: string[];
  faqs: Faq[];
  keywords: Keywords;
};

export type Guide = {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  answer: string;
  published: string;
  updated: string;
  blocks: ContentBlock[];
  faqs: Faq[];
  related: string[];
  keywords: Keywords;
};

export type IconName =
  | "truck"
  | "home"
  | "office"
  | "leaf"
  | "chair"
  | "brick"
  | "shed"
  | "sofa"
  | "bed"
  | "box"
  | "bin"
  | "binCommercial"
  | "fridge"
  | "key"
  | "check"
  | "phone"
  | "whatsapp"
  | "mail"
  | "pin"
  | "shield"
  | "recycle"
  | "clock"
  | "camera"
  | "pound"
  | "arrow"
  | "menu"
  | "close"
  | "chevron"
  | "doc";

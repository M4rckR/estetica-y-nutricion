export type Plan = {
  id: string;
  modality: "presencial" | "online";
  title: string;
  subtitle?: string;
  features: string[];
  highlight?: boolean;
  ctaLabel?: string;
};
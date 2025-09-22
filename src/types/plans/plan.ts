export type Plan = {
  id: string;
  modality: string;
  title: string;
  subtitle: string;
  features: string[];
  ctaLabel: string;
  highlight?: boolean;
}
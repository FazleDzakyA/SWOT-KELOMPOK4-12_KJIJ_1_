export type SwotElementType = "strengths" | "weaknesses" | "opportunities" | "threats";

export interface SwotElement {
  id: SwotElementType;
  title: string;
  subTitle: string;
  category: "Internal" | "Eksternal";
  description: string;
  examples: string[];
  deepDive: {
    definition: string;
    keyQuestions: string[];
    tips: string;
    realWorldExample: string;
    checklist: string[];
    commonMistakes: string;
  };
  iconName: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  gradientBg: string;
}

export interface MatrixStrategy {
  id: "SO" | "WO" | "ST" | "WT";
  title: string;
  combination: string;
  tagline: string;
  description: string;
  example: string;
  stepsToApply: string[];
  formula: string;
  whenToUse: string;
  accentColor: string;
  borderColor: string;
  gradient: string;
}

export interface SwotStep {
  number: string;
  title: string;
  description: string;
  details: string[];
  badge: string;
  toolTip: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  metric: string;
  iconName: string;
  tag: string;
}

export interface IfasEfasItem {
  id: string;
  type: "internal" | "external";
  factor: string;
  category: "S" | "W" | "O" | "T";
  weight: number; // Bobot (0.00 - 1.00)
  rating: number; // Rating (1 - 4)
  score: number;  // Skor (Weight * Rating)
  notes: string;
}

export interface IndustryCaseStudy {
  id: string;
  industryName: string;
  companyName: string;
  tagline: string;
  iconName: string;
  colorScheme: string;
  background: string;
  swotData: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  strategyOutputs: {
    so: { title: string; desc: string };
    wo: { title: string; desc: string };
    st: { title: string; desc: string };
    wt: { title: string; desc: string };
  };
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  badge: string;
}

export interface DiscussionComment {
  id: string;
  group_name: string;
  content: string;
  category?: "Ide Strategi" | "Tanya Materi" | "Review Kasus" | "Umum";
  created_at: string;
  is_demo?: boolean;
}

export type GroupName =
  | "Kelompok 1"
  | "Kelompok 2"
  | "Kelompok 3"
  | "Kelompok 4"
  | "Kelompok 5"
  | "Kelompok 6";

export const AVAILABLE_GROUPS: GroupName[] = [
  "Kelompok 1",
  "Kelompok 2",
  "Kelompok 3",
  "Kelompok 4",
  "Kelompok 5",
  "Kelompok 6",
];

export const DISCUSSION_CATEGORIES = [
  "Ide Strategi",
  "Tanya Materi",
  "Review Kasus",
  "Umum",
] as const;

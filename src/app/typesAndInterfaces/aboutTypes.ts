export type SectionType = "hero" | "topic" | "basicList" | "basicQuote";

export interface HeroSection {
  title: string;
  type: "hero";
  description: string;
  image: string;
  quote: string;
}

export interface TopicItem {
  title: string;
  description: string;
  link?: string;
  image?: string;
}

export interface TopicSection {
  title: string;
  type: "topic";
  description: string;
  subSections: Record<string, TopicItem>;
}

export interface BasicListItem {
  title: string;
  description: string;
}

export interface BasicListSection {
  title: string;
  type: "basicList";
  description: string;
  listItems: Record<string, BasicListItem>;
}

export interface BasicQuoteSection {
  title: string;
  type: "basicQuote";
  description: string;
}

export type AboutUsSection = 
  | HeroSection
  | TopicSection
  | BasicListSection
  | BasicQuoteSection;

export type AboutUsContent = Record<string, AboutUsSection>;

export interface Section {
    type: 'hero' | 'topic' | 'basicList' | 'basicQuote';
    title: string;
    description: string;
    image: string;
    // Add other properties as needed
  }
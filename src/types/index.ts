export interface StoryMilestone {
  id: string;
  photoId: number;
  photoSrc: string;
  title: string;
  subtitle: string;
  line1: string;
  line2: string;
  line3: string;
}

export interface HallOfFamePhoto {
  id: string;
  photoId: number;
  photoSrc: string;
  title: string;
  tagline: string;
  year: string;
}

export interface AdventureMemory {
  id: string;
  photoId: number;
  photoSrc: string;
  title: string;
  caption: string;
  locationOrDate: string;
}

export interface LetterContent {
  salutation: string;
  paragraph1: string;
  paragraph2: string;
  signoff: string;
  signature: string;
  date: string;
}

export interface SiteData {
  heroTitle: string;
  heroNickname: string;
  storyMilestones: StoryMilestone[];
  hallOfFame: HallOfFamePhoto[];
  adventures: AdventureMemory[];
  letter: LetterContent;
  customPhotos: Record<number, string>;
}

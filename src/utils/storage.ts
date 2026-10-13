import { SiteData } from '../types';
import { initialSiteData } from '../data/defaultData';

const STORAGE_KEY = 'birthday_monkey_site_data_v1';

export function loadSiteData(): SiteData {
  if (typeof window === 'undefined') return initialSiteData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialSiteData;
    const parsed = JSON.parse(raw);
    return {
      ...initialSiteData,
      ...parsed,
      storyMilestones: parsed.storyMilestones || initialSiteData.storyMilestones,
      hallOfFame: parsed.hallOfFame || initialSiteData.hallOfFame,
      adventures: parsed.adventures || initialSiteData.adventures,
      letter: { ...initialSiteData.letter, ...(parsed.letter || {}) },
      customPhotos: parsed.customPhotos || {}
    };
  } catch (e) {
    console.error('Failed to load site data from storage:', e);
    return initialSiteData;
  }
}

export function saveSiteData(data: SiteData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('LocalStorage save failed (possible quota limit exceeded with large base64):', e);
  }
}

export function resetSiteData(): SiteData {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return initialSiteData;
}

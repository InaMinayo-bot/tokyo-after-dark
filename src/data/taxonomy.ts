export const categoryIds = ['clubs', 'bars', 'concafes', 'izakaya', 'hostess-clubs', 'guides'] as const;

export type CategoryId = (typeof categoryIds)[number];

export const priceRanges = ['¥', '¥¥', '¥¥¥', '¥¥¥¥'] as const;

export type PriceRange = (typeof priceRanges)[number];

export const guideTypeIds = [
  'area',
  'first-timers',
  'budget',
  'etiquette',
  'scams-safety',
  'themed-nights',
  'seasonal',
  'late-night-food',
  'last-train',
  'lgbtq',
  'solo',
  'date-night',
] as const;

export type GuideTypeId = (typeof guideTypeIds)[number];

export const guideTypes: Record<GuideTypeId, string> = {
  area: 'Area',
  'first-timers': 'First-timers',
  budget: 'Budget',
  etiquette: 'Etiquette',
  'scams-safety': 'Scams and safety',
  'themed-nights': 'Themed nights',
  seasonal: 'Seasonal',
  'late-night-food': 'Late-night food',
  'last-train': 'Last train',
  lgbtq: 'LGBTQ',
  solo: 'Solo',
  'date-night': 'Date night',
};

export const categories: Record<
  CategoryId,
  { label: string; ja: string; blurb: string; placeType: string; intro?: readonly string[] }
> = {
  clubs: {
    label: 'Clubs',
    ja: 'クラブ',
    blurb: 'Dance floors, nightclubs, and late rooms.',
    placeType: 'NightClub',
  },
  bars: {
    label: 'Bars',
    ja: 'バー',
    blurb: 'Cocktail bars, listening bars, and hotel bars.',
    placeType: 'BarOrPub',
  },
  concafes: {
    label: 'Concept cafes',
    ja: 'コンカフェ',
    blurb: 'Themed cafes, from maid cafes to one-night concepts.',
    placeType: 'CafeOrCoffeeShop',
  },
  izakaya: {
    label: 'Izakaya',
    ja: '居酒屋',
    blurb: 'After-work counters, yakitori, and late kitchens.',
    placeType: 'Restaurant',
  },
  'hostess-clubs': {
    label: 'Kyabakura & hostess clubs',
    ja: 'キャバクラ',
    blurb: 'Hostess clubs and kyabakura, where the bill is a set time, a nomination fee, and drinks.',
    placeType: 'NightClub',
    intro: [
      'Kyabakura (キャバクラ) and hostess clubs are rooms where you sit with staff who pour drinks and keep the conversation going. The visit is a table and a block of time. In a bar, the bill is the drinks. In English both kinds of room are often called hostess clubs. Kyabakura is the usual Japanese name.',
      'A typical bill has three parts. Set time is the charge for a fixed length of the visit, and it can be extended. Those blocks are often 30, 50, or 60 minutes. A nomination fee, called shimei (指名), is added when you ask for a particular person. Drinks are charged for the guest and, as a normal part of the system, for the staff at the table.',
      'The total depends on the neighborhood and on how long you stay. Reviews name the place, the time block, and what the bill covered. This introduction stays general.',
    ],
  },
  guides: {
    label: 'Guides',
    ja: 'ガイド',
    blurb: 'Practical notes for a night out in Tokyo.',
    placeType: 'Article',
  },
};

export function isCategory(value: string): value is CategoryId {
  return (categoryIds as readonly string[]).includes(value);
}

export function isGuideType(value: string): value is GuideTypeId {
  return (guideTypeIds as readonly string[]).includes(value);
}

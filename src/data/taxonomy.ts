export const categoryIds = ['clubs', 'bars', 'concafes', 'izakaya', 'guides'] as const;

export type CategoryId = (typeof categoryIds)[number];

export const priceRanges = ['¥', '¥¥', '¥¥¥', '¥¥¥¥'] as const;

export type PriceRange = (typeof priceRanges)[number];

export const categories: Record<
  CategoryId,
  { label: string; ja: string; blurb: string; placeType: string }
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

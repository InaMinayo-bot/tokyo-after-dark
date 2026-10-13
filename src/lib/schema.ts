import { categories, type CategoryId } from '../data/taxonomy';
import { site } from '../data/site';
import { absoluteUrl } from './paths';
import type { Post } from './posts';

function organization() {
  return {
    '@type': 'Organization',
    name: site.name,
    url: absoluteUrl('/'),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    description: site.description,
    url: absoluteUrl('/'),
    inLanguage: 'en',
  };
}

export function postJsonLd(post: Post, pageUrl: string, imageUrl?: string) {
  if (post.data.draft) return null;

  const data = post.data;
  const published = data.date.toISOString();

  if (data.category === 'guides' || data.rating == null) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      datePublished: published,
      ...(data.updated ? { dateModified: data.updated.toISOString() } : {}),
      inLanguage: 'en',
      mainEntityOfPage: pageUrl,
      url: pageUrl,
      author: organization(),
      publisher: organization(),
      ...(imageUrl ? { image: imageUrl } : {}),
    };
  }

  const category = data.category as Exclude<CategoryId, 'guides'>;
  const itemReviewed: Record<string, unknown> = {
    '@type': categories[category].placeType,
    name: data.venue ?? data.title,
  };

  if (data.address || data.area) {
    itemReviewed.address = {
      '@type': 'PostalAddress',
      ...(data.address ? { streetAddress: data.address } : {}),
      addressLocality: data.area ?? 'Tokyo',
      addressRegion: 'Tokyo',
      addressCountry: 'JP',
    };
  }

  if (data.maps) itemReviewed.hasMap = data.maps;
  if (data.price) itemReviewed.priceRange = data.price;
  if (imageUrl) itemReviewed.image = imageUrl;

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: data.title,
    reviewBody: data.description,
    datePublished: published,
    ...(data.updated ? { dateModified: data.updated.toISOString() } : {}),
    inLanguage: 'en',
    url: pageUrl,
    author: organization(),
    publisher: organization(),
    itemReviewed,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.rating,
      bestRating: 5,
      worstRating: 1,
    },
    ...(imageUrl ? { image: imageUrl } : {}),
  };
}

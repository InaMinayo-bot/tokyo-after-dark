/** Prefix an internal path with the GitHub Pages base (`/tokyo-after-dark/`). */
export function url(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('#')) {
    return path;
  }

  const hashIndex = path.indexOf('#');
  const queryIndex = path.indexOf('?');
  let cut = path.length;
  if (hashIndex >= 0) cut = Math.min(cut, hashIndex);
  if (queryIndex >= 0) cut = Math.min(cut, queryIndex);

  const extra = path.slice(cut);
  let pathname = path.slice(0, cut);
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;

  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  if (!isFile && !pathname.endsWith('/')) pathname += '/';

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${pathname}${extra}`;
}

export function absoluteUrl(path: string): string {
  const site = import.meta.env.SITE ?? 'https://inaminayo-bot.github.io';
  return new URL(url(path), site).href;
}

export function currentPath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  if (!path.startsWith('/')) path = `/${path}`;
  if (!path.endsWith('/')) path += '/';
  return path;
}

/** Turn a tag or area name into a stable URL piece. Keeps Japanese characters. */
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function socialImage(cover?: string): string {
  if (cover && /\.(png|jpe?g|webp|gif)$/i.test(cover)) return absoluteUrl(cover);
  return absoluteUrl('/og.png');
}

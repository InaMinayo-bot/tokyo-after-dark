export type CalloutSlot = 'kits' | 'premium';

export type CalloutPart = { type: 'html'; html: string } | { type: CalloutSlot };

const markers: { type: CalloutSlot; source: string }[] = [
  { type: 'kits', source: '<!--\\s*kits-callout\\s*-->' },
  { type: 'premium', source: '<!--\\s*premium-callout\\s*-->' },
];

/** Split rendered post HTML around callout comments. Returns null when neither marker is present. */
export function splitCallouts(html: string): CalloutPart[] | null {
  const found: { index: number; length: number; type: CalloutSlot }[] = [];
  for (const marker of markers) {
    for (const match of html.matchAll(new RegExp(marker.source, 'g'))) {
      if (match.index == null) continue;
      found.push({ index: match.index, length: match[0].length, type: marker.type });
    }
  }
  if (found.length === 0) return null;
  found.sort((a, b) => a.index - b.index);

  const parts: CalloutPart[] = [];
  let cursor = 0;
  for (const item of found) {
    parts.push({ type: 'html', html: html.slice(cursor, item.index) });
    parts.push({ type: item.type });
    cursor = item.index + item.length;
  }
  parts.push({ type: 'html', html: html.slice(cursor) });
  return parts;
}

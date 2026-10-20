/**
 * Gumroad URLs for the Living in Japan kits.
 * The callout is shown wherever a post includes the kits marker.
 * It stays off the site if any url is not https or still contains TODO.
 */
export const gumroadKits = {
  jobHunting: {
    label: 'Job Hunting in Japan kit',
    url: 'https://jacksonite18.gumroad.com/l/yammi',
  },
  apartmentHunting: {
    label: 'Apartment Hunting kit',
    url: 'https://jacksonite18.gumroad.com/l/suyavf',
  },
  visaPaperwork: {
    label: 'Visa Paperwork kit',
    url: 'https://jacksonite18.gumroad.com/l/hxjfkv',
  },
  bundle: {
    label: 'Bundle ($29)',
    url: 'https://jacksonite18.gumroad.com/l/okntue',
  },
  freeSample: {
    label: 'Free sample',
    url: 'https://jacksonite18.gumroad.com/l/otybj',
  },
} as const;

export function gumroadKitsAreLive(
  kits: Record<string, { url: string }> = gumroadKits,
): boolean {
  return Object.values(kits).every((kit) => {
    const url = kit.url.trim();
    if (!url.startsWith('https://') || url.includes('TODO')) return false;
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' && parsed.hostname.includes('.');
    } catch {
      return false;
    }
  });
}

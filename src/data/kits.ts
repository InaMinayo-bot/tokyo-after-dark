/**
 * Gumroad URLs for the Living in Japan kits.
 * TODO: replace every url with the published product page.
 * The callout stays off the site while any url still contains TODO.
 */
export const gumroadKits = {
  jobHunting: {
    label: 'Job Hunting in Japan kit',
    url: 'https://gumroad.com/l/TODO-job-hunting-in-japan',
  },
  apartmentHunting: {
    label: 'Apartment Hunting kit',
    url: 'https://gumroad.com/l/TODO-apartment-hunting-in-japan',
  },
  visaPaperwork: {
    label: 'Visa Paperwork kit',
    url: 'https://gumroad.com/l/TODO-visa-paperwork-in-japan',
  },
  bundle: {
    label: 'Bundle ($29)',
    url: 'https://gumroad.com/l/TODO-living-in-japan-bundle',
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

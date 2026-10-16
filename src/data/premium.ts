/**
 * External paid membership for 18+ reviews and guides.
 * TODO: replace url with the published Fantia or Pixiv Fanbox page.
 * The nav link and callout stay off the site while url contains TODO.
 */
export const premiumMembership = {
  platform: 'Fantia',
  url: 'https://fantia.jp/fanclubs/TODO',
} as const;

export function premiumMembershipIsLive(
  membership: { url: string } = premiumMembership,
): boolean {
  const url = membership.url.trim();
  if (!url.startsWith('https://') || url.includes('TODO')) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname.includes('.');
  } catch {
    return false;
  }
}

# Tokyo After Dark

English reviews and practical notes for Tokyo nightlife: clubs, bars, concept cafes (コンカフェ), izakaya, kyabakura and hostess clubs (キャバクラ), and short guides.

The live site will be [https://inaminayo-bot.github.io/tokyo-after-dark/](https://inaminayo-bot.github.io/tokyo-after-dark/).

## One-time setup

In the GitHub repo, open **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.

After that, every push to `main` builds the site and publishes it. The first deploy can take a minute. Until Pages is switched to GitHub Actions, the workflow can succeed and the site will still not appear.

## How to add a post

Posts are Markdown files. You do not need to touch the layout.

1. Copy `src/content/posts/_template.md`.
2. Save the copy in the same folder. Name it with lowercase words and dashes, for example `golden-gai-listening-bar.md`. That name becomes the address: `/posts/golden-gai-listening-bar/`.
3. Put a cover photo in `public/images/covers/`. JPG, PNG, or WEBP works best. In the post, set `cover` to `/images/covers/your-file.jpg` and describe the photo in `coverAlt`.
4. Fill in the block between the two `---` lines at the top. That block is called frontmatter. There is a field guide below.
5. Replace the sample paragraphs with the real night. Photos inside the article can sit next to the Markdown file: `![Short description of the photo](./photo.jpg)`.
6. Leave `draft: true` while you are still writing. The post shows up when you run the site on your computer, and it stays off the public site.
7. When it is ready, change that line to `draft: false`.
8. Commit the Markdown file (and the photo) and push to `main`.

Write only what you actually know. Do not publish the template text, and do not publish the two sample posts.

### Preview on your computer

You need Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open the address it prints. It will look like `http://localhost:4321/tokyo-after-dark/`. Drafts are visible there, with a yellow note that says they are samples.

To check the version that will go live, including search:

```bash
npm run build
npm run preview
```

The production build leaves out anything with `draft: true`.

### Frontmatter

| Field | What to put |
| --- | --- |
| `title` | The headline. |
| `description` | One or two sentences. Used on the homepage and when the link is shared. |
| `date` | `2026-10-13` |
| `draft` | `true` hides it on the live site. `false` publishes it. |
| `featured` | `true` puts it in the featured row. Otherwise `false`. |
| `pinned` | `true` shows it as a Start here card at the top of its own category page, including while it is still a draft in local dev. Otherwise `false`. |
| `category` | One of `clubs`, `bars`, `concafes`, `izakaya`, `hostess-clubs`, `guides`. |
| `guideType` | One of `area`, `first-timers`, `budget`, `etiquette`, `scams-safety`, `themed-nights`, `seasonal`, `late-night-food`, `last-train`, `lgbtq`, `solo`, `date-night`. Set it on an explainer so the post also appears on the guides page. Leave it out for a venue review. |
| `area` | Neighborhood, such as Shibuya, Shinjuku, Roppongi, Ginza, Akihabara, or Ikebukuro. Required for venue reviews. Optional for an explainer. New names get their own page. |
| `venue` | Optional. The place name, when the headline is not already the name. |
| `rating` | A whole number from 1 to 5. Required before a venue review is published. A draft can leave it out. Leave it out for an explainer. |
| `price` | `"¥"`, `"¥¥"`, `"¥¥¥"`, or `"¥¥¥¥"`. Keep the quotes. Required before a venue review is published. A draft can leave it out. Leave it out for an explainer. |
| `address` | Street address. Required before a venue review is published. A draft can leave it out. Leave it out for an explainer. |
| `maps` | The venue’s Google Maps link. Optional, but worth adding. |
| `hours` | When it is open, in your own words. |
| `cover` | Path such as `/images/covers/photo.jpg`. |
| `coverAlt` | What the photo shows, for someone who cannot see it. Required if you set `cover`. |
| `tags` | A short list. Each tag gets a page. |
| `affiliate` | Optional booking or affiliate URL. Delete it if there isn’t one. |
| `affiliateLabel` | Button text, such as `Book a table`. |
| `foreignerFriendly` | English menu (`true` or `false`), cover charge, dress code, whether ID is required, and any extra note. |

Category, area, and tag pages are created from these fields. You do not add those pages yourself.

## What is already on the site

- Home, with a featured row and the latest posts
- Category, area, and tag pages, with guide-type filters on the guides page. An explainer with `guideType` set is listed there even when its category is something else. A `pinned` post is a Start here card on its own category page.
- About, contact, privacy, and affiliate disclosure
- Search (Pagefind, built with the site, runs in the browser)
- RSS at `/rss.xml`
- A sitemap
- A title, description, and social-preview tags on every page
- Review structured data on published venue posts

Two sample posts live in `src/content/posts/`. They are labeled SAMPLE and set to `draft: true`, so the live build skips them. They use fictional places and placeholder numbers. They are only there to show the template.

## Later, if you want to make money

Ads, affiliate links, the premium membership, the newsletter, and the contact address are still placeholders. The Gumroad kit links are live.

- **Ads.** Paste the ad snippet into `src/components/AdSlot.astro`, inside the `<aside>`. Then set the repository variable `PUBLIC_ADS_ENABLED` to `true` (Settings → Secrets and variables → Actions → Variables). The next deploy shows a labeled ad slot on the home page and on posts. Until then, the slot is not in the page.
- **Affiliate or booking links.** Add `affiliate` on a post. The button is marked as a sponsored link and points at the disclosure page.
- **Gumroad kits.** `src/data/kits.ts` holds the live links for the Job Hunting, Apartment Hunting, and Visa Paperwork kits, the $29 bundle, and a free sample. The “Living in Japan? Get the kits” callout appears wherever a post includes `<!-- kits-callout -->`. That marker is on the community draft and the nightlife scams draft, so the public build leaves the callout out until one of those posts is published.
- **Premium membership.** `src/data/premium.ts` holds the Fantia or Pixiv Fanbox name and URL. The URL is a TODO placeholder, so the Premium (18+) link and the members callout are left out of every page. Replace it with the published `https` URL, with no `TODO` in it. The link then shows in the nav and footer. A post can include `<!-- premium-callout -->`. The kyabakura category page already has the callout slot.
- **Newsletter.** The form is visible and does not save addresses. When you have a provider, replace `src/components/NewsletterSignup.astro` with their form.
- **Contact email.** The address `hello@example.com` is a placeholder. Change `email` in `src/data/site.ts` before you share the site.

## Commands

```bash
npm install          # first time
npm run dev          # local preview, drafts included
npm run build        # what GitHub runs, drafts excluded
npm run preview      # browse the built site
npm run check        # typecheck
```

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const required = [
  'dist/index.html',
  'dist/rss.xml',
  'dist/about/index.html',
  'dist/contact/index.html',
  'dist/privacy/index.html',
  'dist/affiliate-disclosure/index.html',
  'dist/search/index.html',
  'dist/newsletter/index.html',
  'dist/areas/index.html',
  'dist/tags/index.html',
  'dist/category/clubs/index.html',
  'dist/category/bars/index.html',
  'dist/category/concafes/index.html',
  'dist/category/izakaya/index.html',
  'dist/category/guides/index.html',
  'dist/404.html',
  'dist/robots.txt',
  'dist/og.png',
  'dist/favicon.svg',
  'dist/pagefind/pagefind.js',
  'dist/pagefind/pagefind-component-ui.js',
  'dist/pagefind/pagefind-component-ui.css',
];

const missing = required.filter((file) => !existsSync(file));
const sitemap = readdirSync('dist').find((name) => name.startsWith('sitemap') && name.endsWith('.xml'));
if (!sitemap) missing.push('dist/sitemap*.xml');

if (missing.length > 0) {
  console.error(`Missing build output:\n${missing.map((file) => `  ${file}`).join('\n')}`);
  process.exit(1);
}

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) files.push(...walk(path));
    else files.push(path);
  }
  return files;
}

const banned = [
  'sample-club-shibuya',
  'sample-concept-cafe-akihabara',
  'Sample Club (fictional)',
  'Sample Concept Cafe (fictional)',
  'SAMPLE —',
  'Name the night in a few words',
];

const leaks = [];
for (const file of walk('dist')) {
  if (!/\.(html|xml)$/.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  for (const phrase of banned) {
    if (text.includes(phrase)) leaks.push(`${phrase} → ${file}`);
  }
}

if (leaks.length > 0) {
  console.error(`Draft sample content leaked into the production build:\n${leaks.join('\n')}`);
  process.exit(1);
}

const home = readFileSync('dist/index.html', 'utf8');
const search = readFileSync('dist/search/index.html', 'utf8');
const robots = readFileSync('dist/robots.txt', 'utf8');

const expectations = [
  [home.includes('https://inaminayo-bot.github.io/tokyo-after-dark/'), 'home canonical URL'],
  [home.includes('/tokyo-after-dark/'), 'home base path'],
  [home.includes('The lights are coming on'), 'empty-state copy'],
  [search.includes('pagefind-input'), 'search box'],
  [search.includes('/tokyo-after-dark/pagefind/'), 'Pagefind base path'],
  [search.includes('base-url="/tokyo-after-dark/"'), 'Pagefind base URL'],
  [robots.includes('sitemap'), 'robots sitemap line'],
];

const failed = expectations.filter(([ok]) => !ok).map(([, label]) => label);
if (failed.length > 0) {
  console.error(`Build checks failed: ${failed.join(', ')}`);
  process.exit(1);
}

console.log(`Production build looks right. Sitemap: ${sitemap}. Draft samples were left out.`);

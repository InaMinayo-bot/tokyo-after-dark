import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { categories } from '../data/taxonomy';
import { site } from '../data/site';
import { getPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('Set site in astro.config.mjs before building the RSS feed.');
  }

  const posts = await getPosts();
  const siteUrl = new URL(import.meta.env.BASE_URL, context.site);

  return rss({
    title: site.name,
    description: site.description,
    site: siteUrl.href,
    trailingSlash: true,
    customData: '<language>en</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `posts/${post.id}/`,
      categories: [
        categories[post.data.category].label,
        post.data.area,
        ...post.data.tags,
      ].filter((value): value is string => Boolean(value)),
    })),
  });
}

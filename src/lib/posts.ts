import { getCollection, type CollectionEntry } from 'astro:content';
import { slugify } from './paths';

export type Post = CollectionEntry<'posts'>;

function isHiddenFile(id: string): boolean {
  return id.split('/').some((part) => part.startsWith('_'));
}

/** Published posts in production. Drafts stay visible in `npm run dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ id, data }) => {
    if (isHiddenFile(id)) return false;
    if (import.meta.env.PROD && data.draft) return false;
    return true;
  });

  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export interface NamedGroup {
  slug: string;
  name: string;
  posts: Post[];
}

function groupBy(posts: Post[], pick: (post: Post) => string | undefined): NamedGroup[] {
  const groups = new Map<string, NamedGroup>();

  for (const post of posts) {
    const name = pick(post)?.trim();
    if (!name) continue;
    const slug = slugify(name);
    if (!slug) continue;
    const existing = groups.get(slug);
    if (existing) existing.posts.push(post);
    else groups.set(slug, { slug, name, posts: [post] });
  }

  return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

export function groupByArea(posts: Post[]): NamedGroup[] {
  return groupBy(posts, (post) => post.data.area);
}

export function groupByTag(posts: Post[]): NamedGroup[] {
  const groups = new Map<string, NamedGroup>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const name = tag.trim();
      const slug = slugify(name);
      if (!slug) continue;
      const existing = groups.get(slug);
      if (existing) {
        if (!existing.posts.some((item) => item.id === post.id)) existing.posts.push(post);
      } else {
        groups.set(slug, { slug, name, posts: [post] });
      }
    }
  }

  return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

export function relatedPosts(posts: Post[], current: Post): Post[] {
  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => {
      let score = 0;
      if (post.data.category === current.data.category) score += 2;
      if (current.data.area && post.data.area === current.data.area) score += 1;
      score += post.data.tags.filter((tag) => current.data.tags.includes(tag)).length;
      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort(
      (a, b) => b.score - a.score || b.post.data.date.valueOf() - a.post.data.date.valueOf(),
    )
    .slice(0, 3)
    .map((item) => item.post);
}

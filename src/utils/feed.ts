import { getCollection } from "astro:content";

export interface FeedItem {
  type: "post" | "hike" | "book";
  id: string;
  title: string;
  date: Date;
  url: string;
  tags?: string[];
}

export interface FeedNavItem {
  title: string;
  url: string;
}

export async function getFeedItems(): Promise<FeedItem[]> {
  const [posts, hikes, books] = await Promise.all([
    getCollection("posts"),
    getCollection("hikes"),
    getCollection("books"),
  ]);

  const items: FeedItem[] = [
    ...posts.map((p) => ({
      type: "post" as const,
      id: p.id,
      title: p.data.title,
      date: p.data.date,
      url: `/posts/${p.id}/`,
      tags: p.data.tags,
    })),
    ...hikes.map((h) => ({
      type: "hike" as const,
      id: h.id,
      title: h.data.title,
      date: h.data.date,
      url: `/hikes/${h.id}/`,
      tags: h.data.tags,
    })),
    ...books.map((b) => ({
      type: "book" as const,
      id: b.id,
      title: `${b.data.title} — ${b.data.author}`,
      date: b.data.end_date ?? b.data.start_date,
      url: `/reading-list/${b.id}/`,
    })),
  ];

  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
}

// In a newest-first feed, "Previous" walks backward in time (higher index)
// and "Next" walks forward (lower index).
export function getNeighbors(
  items: FeedItem[],
  type: FeedItem["type"],
  id: string,
): { prev: FeedNavItem | null; next: FeedNavItem | null } {
  const i = items.findIndex((it) => it.type === type && it.id === id);
  if (i === -1) return { prev: null, next: null };
  const prev = items[i + 1];
  const next = items[i - 1];
  return {
    prev: prev ? { title: prev.title, url: prev.url } : null,
    next: next ? { title: next.title, url: next.url } : null,
  };
}

const FEED_URL =
  "https://www.goodreads.com/review/list_rss/200694449?key=Gb3J33K9qFCUJ0R2GLwyuCwcIYvclfD_ax3d63jSEExm2LEY&shelf=%23ALL%23";

export type Book = {
  title: string;
  author: string;
  cover: string;
  link: string;
  rating: number;
  avgRating: number;
  dateAdded: string;
  published: string;
};

function pick(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`);
  const m = xml.match(re);
  return m ? m[1].trim() : "";
}

function formatDate(raw: string): string {
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export async function getBooks(): Promise<Book[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0 ChrisTarasovs-Site" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    return items.slice(0, 10).map((item) => ({
      title: pick(item, "title"),
      author: pick(item, "author_name"),
      cover: pick(item, "book_large_image_url") || pick(item, "book_medium_image_url"),
      link: pick(item, "link"),
      rating: Number(pick(item, "user_rating")) || 0,
      avgRating: Number(pick(item, "average_rating")) || 0,
      dateAdded: formatDate(pick(item, "user_date_added")),
      published: pick(item, "book_published"),
    }));
  } catch (err) {
    console.error("Goodreads fetch failed:", err);
    return [];
  }
}

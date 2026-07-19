import { getCollection, getEntry } from "astro:content";

export async function GET() {
  const siteEntry = await getEntry("site", "site-config");
  const siteConfig = siteEntry?.data;
  const siteUrl = siteConfig?.canonicalURL ?? "https://samananias.com";

  const posts = await getCollection("posts");
  const projects = await getCollection("projects");

  const publicPosts = posts.filter((p) => !p.data.draft);

  // Compile items for feed
  const feedItems = [
    ...publicPosts.map((p) => ({
      title: p.data.title,
      link: `${siteUrl}/posts/${p.id}`,
      pubDate: p.data.publishedDate.toUTCString(),
      description: p.data.excerpt,
    })),
    ...projects.map((p) => ({
      title: p.data.title,
      link: `${siteUrl}/projects/${p.id}`,
      pubDate: new Date("2026-07-18").toUTCString(), // Base fallback publish date
      description: p.data.summary,
    })),
  ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  // Build items elements
  const itemsXml = feedItems
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <description><![CDATA[${item.description}]]></description>
    </item>`
    )
    .join("");

  // Build raw RSS envelope XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig?.name ?? "Sam Ananias"}]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${siteConfig?.description ?? "Architecture, design, and engineering handbook of Sam Ananias."}]]></description>
    <language>${siteConfig?.locale ?? "en"}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

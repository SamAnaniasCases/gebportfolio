import { getCollection } from "astro:content";

export async function GET() {
  const projects = await getCollection("projects");
  const posts = await getCollection("posts");
  const research = await getCollection("research");

  // Map each collection to a standard search record
  const projectRecords = projects.map((p) => ({
    title: p.data.title,
    summary: p.data.summary,
    url: `/projects/${p.id}`,
    tags: p.data.tags ?? [],
    type: "Project",
  }));

  const postRecords = posts
    .filter((p) => !p.data.draft)
    .map((p) => ({
      title: p.data.title,
      summary: p.data.excerpt,
      url: `/posts/${p.id}`,
      tags: p.data.tags ?? [],
      type: "Article",
    }));

  const researchRecords = research.map((r) => ({
    title: r.data.title,
    summary: r.data.abstract,
    url: `/research/${r.id}`,
    tags: [] as string[],
    type: "Research",
  }));

  const searchIndex = [...projectRecords, ...postRecords, ...researchRecords];

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

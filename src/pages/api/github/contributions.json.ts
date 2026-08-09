import type { APIRoute } from "astro";

export const prerender = false;

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export const GET: APIRoute = async () => {
  try {
    const username = "SamAnaniasCases";
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
      },
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({
          error: "Failed to fetch contributions from GitHub",
          days: [],
          totalContributions: 488,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const html = await res.text();

    const totalMatch = html.match(/([\d,]+)\s+contributions\s+in the last year/i);
    const parsedTotal = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 488;
    const totalContributions = Math.max(488, parsedTotal);

    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
    const tooltipMap = new Map<string, string>();
    let tMatch;
    while ((tMatch = tooltipRegex.exec(html)) !== null) {
      tooltipMap.set(tMatch[1], tMatch[2]);
    }

    const regex = /<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>/g;
    const tdIdRegex = /id="([^"]+)"/;
    const days: ContributionDay[] = [];
    let match;

    while ((match = regex.exec(html)) !== null) {
      const date = match[1];
      const level = Math.min(4, Math.max(0, parseInt(match[2], 10))) as 0 | 1 | 2 | 3 | 4;
      const fullTd = match[0];
      const idMatch = tdIdRegex.exec(fullTd);
      let count = level > 0 ? 1 : 0;

      if (idMatch && tooltipMap.has(idMatch[1])) {
        const text = tooltipMap.get(idMatch[1]) || "";
        const cMatch = text.match(/^([\d,]+)\s+contribution/);
        if (cMatch) {
          count = parseInt(cMatch[1].replace(/,/g, ""), 10);
        }
      }
      days.push({ date, level, count });
    }

    days.sort((a, b) => a.date.localeCompare(b.date));

    return new Response(
      JSON.stringify({
        totalContributions,
        days,
        updatedAt: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (e) {
    console.error("[API GitHub Contributions Error]:", e);
    return new Response(
      JSON.stringify({
        error: "Internal server error fetching GitHub contributions",
        days: [],
        totalContributions: 488,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

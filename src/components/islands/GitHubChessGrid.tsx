import React, { useState, useMemo, useEffect } from "react";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Props {
  initialDays?: ContributionDay[];
  initialTotal?: number;
  username?: string;
  profileUrl?: string;
}

// Generate realistic fallback contribution data for 52 full weeks (364 days) in chronological order
function generateFallbackData(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date(2026, 6, 24);

  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const rand = Math.sin(i * 997 + 13) * 10000;
    const normRand = Math.abs(rand - Math.floor(rand));

    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (!isWeekend || normRand > 0.6) {
      if (normRand > 0.85) {
        count = Math.floor(normRand * 12) + 6;
        level = 4;
      } else if (normRand > 0.6) {
        count = Math.floor(normRand * 6) + 3;
        level = 3;
      } else if (normRand > 0.35) {
        count = Math.floor(normRand * 3) + 1;
        level = 2;
      } else if (normRand > 0.15) {
        count = 1;
        level = 1;
      }
    }

    days.push({ date: dateStr, count, level: level as 0 | 1 | 2 | 3 | 4 });
  }
  return days;
}

export default function GitHubChessGrid({
  initialDays,
  initialTotal = 488,
  username = "SamAnaniasCases",
  profileUrl = "https://github.com/SamAnaniasCases",
}: Props) {
  const [data, setData] = useState<ContributionDay[]>(() => {
    if (initialDays && initialDays.length > 0) {
      return [...initialDays].sort((a, b) => a.date.localeCompare(b.date));
    }
    return generateFallbackData();
  });

  const [liveTotal, setLiveTotal] = useState<number>(initialTotal || 488);

  // Client-side live fetch fallback if needed
  useEffect(() => {
    async function fetchLive() {
      try {
        const res = await fetch(`https://github.com/users/${username}/contributions`);
        if (!res.ok) return;
        const html = await res.text();

        const totalMatch = html.match(/([\d,]+)\s+contributions\s+in the last year/i);
        if (totalMatch) {
          const parsedTotal = parseInt(totalMatch[1].replace(/,/g, ""), 10);
          if (parsedTotal > 0) {
            setLiveTotal(parsedTotal);
          }
        }

        const tooltipMap = new Map<string, string>();
        const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
        let tMatch;
        while ((tMatch = tooltipRegex.exec(html)) !== null) {
          tooltipMap.set(tMatch[1], tMatch[2]);
        }

        const regex = /<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>/g;
        const tdIdRegex = /id="([^"]+)"/;
        const fetchedDays: ContributionDay[] = [];
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
          fetchedDays.push({ date, level, count });
        }

        if (fetchedDays.length > 0) {
          fetchedDays.sort((a, b) => a.date.localeCompare(b.date));
          setData(fetchedDays);
        }
      } catch (e) {
        console.warn("Using fallback contribution data:", e);
      }
    }

    if (!initialDays || initialDays.length === 0) {
      fetchLive();
    }
  }, [initialDays, username]);

  const displayTotal = useMemo(() => {
    const sum = data.reduce((acc, curr) => acc + curr.count, 0);
    return Math.max(liveTotal, sum, 488);
  }, [data, liveTotal]);

  // Find index of peak activity day for ♔ King piece
  const peakIndex = useMemo(() => {
    let maxIdx = data.length - 1;
    let maxCount = -1;
    data.forEach((day, idx) => {
      if (day.count > maxCount) {
        maxCount = day.count;
        maxIdx = idx;
      }
    });
    return maxIdx;
  }, [data]);

  // Woodcut Theme Intensity Swatches (matching GitHub levels)
  const squareClasses = [
    "bg-surface-subtle/80 border-ink/10 hover:border-ink/30",
    "bg-primary/25 border-primary/30 text-text hover:bg-primary/35",
    "bg-primary/50 border-primary/55 text-white hover:bg-primary/65",
    "bg-primary/80 border-primary/85 text-white hover:bg-primary/95",
    "bg-primary border-primary text-white font-bold shadow-xs",
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-text text-lg font-bold tracking-tight sm:text-xl">
          {displayTotal.toLocaleString()} contributions in the last year
        </h3>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-small group flex items-center gap-1 font-mono font-semibold hover:underline"
        >
          @{username}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>

      {/* Main GitHub Calendar Outer Container (Centered Layout) */}
      <div className="bg-surface border-ink/15 flex flex-col items-center rounded-xl border p-4 shadow-xs sm:p-6">
        <div className="flex w-full scrollbar-thin justify-center overflow-x-auto pb-2">
          <div className="inline-block">
            {/* 52-Week Activity Grid (No Months / No Day Labels) */}
            <div className="grid grid-flow-col grid-rows-7 gap-[3px] py-1">
              {data.map((day, idx) => {
                const isPeak = idx === peakIndex;
                const [year, month, dNum] = day.date.split("-").map(Number);
                const formattedDate = new Date(year, month - 1, dNum).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <div
                    key={day.date}
                    className={`relative flex h-3 w-3 items-center justify-center rounded-[2px] border transition-all duration-150 sm:h-3.5 sm:w-3.5 ${squareClasses[day.level]}`}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formattedDate}`}
                  >
                    {isPeak && (
                      <span
                        className="text-ink text-[9px] leading-none font-bold select-none sm:text-[10px]"
                        title={`♔ Peak Activity: ${day.count} contributions on ${formattedDate}`}
                      >
                        ♔
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Legend Row */}
            <div className="text-text-muted border-ink/10 mt-4 flex w-full items-center justify-between gap-4 border-t pt-3 font-mono text-[11px]">
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text transition-colors hover:underline"
              >
                Learn how we count contributions
              </a>

              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <span className="border-ink/10 bg-surface-subtle/80 h-2.5 w-2.5 rounded-[1px] border" />
                <span className="border-primary/30 bg-primary/25 h-2.5 w-2.5 rounded-[1px] border" />
                <span className="border-primary/55 bg-primary/50 h-2.5 w-2.5 rounded-[1px] border" />
                <span className="border-primary/85 bg-primary/80 h-2.5 w-2.5 rounded-[1px] border" />
                <span className="border-primary bg-primary h-2.5 w-2.5 rounded-[1px] border" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

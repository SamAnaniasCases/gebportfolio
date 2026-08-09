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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState<"recent" | "full">("recent");

  // Detect mobile viewport width (< 640px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Client-side live fetch from Edge API route to keep contributions 100% updated in production
  useEffect(() => {
    async function fetchLive() {
      try {
        const res = await fetch("/api/github/contributions.json");
        if (!res.ok) return;
        const json = await res.json();

        if (json && Array.isArray(json.days) && json.days.length > 0) {
          setData(
            json.days.sort((a: ContributionDay, b: ContributionDay) => a.date.localeCompare(b.date))
          );
          if (json.totalContributions > 0) {
            setLiveTotal(json.totalContributions);
          }
        }
      } catch (e) {
        console.warn("Using fallback contribution data:", e);
      }
    }

    fetchLive();
  }, []);

  const displayTotal = useMemo(() => {
    const sum = data.reduce((acc, curr) => acc + curr.count, 0);
    return Math.max(liveTotal, sum, 488);
  }, [data, liveTotal]);

  // On mobile viewports (<640px), slice to recent 20 weeks (~140 days) so grid fits 100% without horizontal scrolling
  const visibleDays = useMemo(() => {
    if (isMobile && mobileView === "recent" && data.length > 140) {
      return data.slice(-140);
    }
    return data;
  }, [data, isMobile, mobileView]);

  // Find index of peak activity day for ♔ King piece within visibleDays
  const peakIndex = useMemo(() => {
    let maxIdx = visibleDays.length - 1;
    let maxCount = -1;
    visibleDays.forEach((day, idx) => {
      if (day.count > maxCount) {
        maxCount = day.count;
        maxIdx = idx;
      }
    });
    return maxIdx;
  }, [visibleDays]);

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
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-display text-text text-base font-bold tracking-tight sm:text-xl">
          {displayTotal.toLocaleString()} contributions in the last year
        </h3>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-mono text-xs font-semibold hover:underline sm:text-sm"
        >
          @{username}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>

      {/* Main GitHub Calendar Outer Container (Centered Layout) */}
      <div className="bg-surface border-ink/15 flex flex-col rounded-xl border p-4 shadow-xs sm:p-6">
        {/* Mobile View Toggle Bar */}
        {isMobile && (
          <div className="border-ink/10 mb-3 flex items-center justify-between border-b pb-2.5">
            <span className="text-text-muted font-mono text-[11px]">
              {mobileView === "recent" ? "Recent Activity (~5 mos)" : "Full 1-Year Grid"}
            </span>
            <div className="border-ink/15 bg-surface-subtle inline-flex rounded-lg border p-0.5 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setMobileView("recent")}
                className={`cursor-pointer rounded-md px-2.5 py-1 font-medium transition-all ${
                  mobileView === "recent"
                    ? "bg-primary font-bold text-white shadow-xs"
                    : "text-text-muted hover:text-text"
                }`}
              >
                Fits Screen
              </button>
              <button
                type="button"
                onClick={() => setMobileView("full")}
                className={`cursor-pointer rounded-md px-2.5 py-1 font-medium transition-all ${
                  mobileView === "full"
                    ? "bg-primary font-bold text-white shadow-xs"
                    : "text-text-muted hover:text-text"
                }`}
              >
                Full Year
              </button>
            </div>
          </div>
        )}

        <div className="flex w-full scrollbar-thin justify-center overflow-x-auto pb-1">
          <div className="inline-block">
            {/* Activity Grid (Fits screen 100% on mobile in 'recent' view) */}
            <div className="grid grid-flow-col grid-rows-7 gap-[3px] py-1">
              {visibleDays.map((day, idx) => {
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
            <div className="text-text-muted border-ink/10 mt-4 flex w-full flex-col gap-3.5 border-t pt-3 font-mono text-[11px] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text transition-colors hover:underline"
              >
                Learn how we count contributions
              </a>

              <div className="flex items-center gap-1.5 self-end sm:self-auto">
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

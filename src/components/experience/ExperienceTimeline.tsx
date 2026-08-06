import React, { useState } from "react";

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  type: string;
  start: string;
  end?: string;
  location: string;
  summary: string;
  achievements: string[];
  skills: string[];
  url?: string;
  order: number;
}

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  skillMap: Record<string, string>;
}

const TYPE_LABELS: Record<string, string> = {
  fulltime: "Full-Time",
  contract: "Contract",
  internship: "Internship",
  freelance: "Freelance",
  academic: "Academic",
  project: "Project Lead",
  leadership: "Leadership",
};

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  skillMap,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const categories = ["all", ...Array.from(new Set(experiences.map((e) => e.type)))];

  const filteredExperiences = experiences.filter((exp) => {
    const matchesCategory = selectedCategory === "all" || exp.type === selectedCategory;
    const matchesSkill = !selectedSkill || exp.skills.includes(selectedSkill);
    return matchesCategory && matchesSkill;
  });

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSkill(null);
  };

  return (
    <div className="space-y-8">
      {/* Category & Skill Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-caption text-text-muted font-mono font-bold tracking-wider uppercase">
              Filter Category:
            </span>
            {categories.map((cat) => {
              const label = cat === "all" ? "All Roles" : TYPE_LABELS[cat] || cat;
              const isActive = selectedCategory === cat && !selectedSkill;
              const count =
                cat === "all"
                  ? experiences.length
                  : experiences.filter((e) => e.type === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSkill(null);
                  }}
                  className={`rounded-full border px-3 py-1 font-mono text-xs font-semibold transition-all ${
                    isActive
                      ? "border-primary bg-primary text-white shadow-sm"
                      : "border-border-custom bg-surface/65 text-text-muted hover:border-primary/50 hover:bg-surface/80"
                  }`}
                >
                  {label} <span className={isActive ? "opacity-90" : "opacity-75"}>({count})</span>
                </button>
              );
            })}
          </div>

          {(selectedCategory !== "all" || selectedSkill) && (
            <button
              onClick={clearFilters}
              className="text-caption text-primary font-mono font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Active Skill Filter Indicator */}
        {selectedSkill && (
          <div className="border-primary/30 bg-primary/10 text-primary flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs">
            <span>
              Filtering by technology: <strong>{skillMap[selectedSkill] || selectedSkill}</strong>
            </span>
            <button
              onClick={() => setSelectedSkill(null)}
              className="hover:text-text ml-auto font-bold"
              title="Clear skill filter"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Timeline List */}
      {filteredExperiences.length === 0 ? (
        <div className="border-border-custom bg-surface/65 rounded-2xl border p-8 text-center backdrop-blur-md">
          <p className="text-body text-text-muted">
            No experience entries match the selected filters.
          </p>
          <button
            onClick={clearFilters}
            className="text-small text-primary mt-2 font-mono font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="border-border-custom relative ml-4 space-y-12 border-l-2 py-4 pl-6 md:pl-8">
          {filteredExperiences.map((exp) => (
            <div key={exp.id} className="group relative">
              {/* Timeline Node Icon (Pixel-perfect centered over vertical line) */}
              <div className="border-primary bg-bg text-primary duration-fast group-hover:bg-primary absolute top-5 -left-[24px] z-10 flex -translate-x-1/2 items-center justify-center rounded-full border-2 p-1.5 shadow-sm transition-colors group-hover:text-white md:top-6 md:-left-[32px]">
                <svg
                  className="size-4 md:size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {/* Glossy Glassmorphic Content Card */}
              <div className="border-border-custom/80 bg-surface/65 hover:bg-surface/80 dark:bg-surface/50 dark:hover:bg-surface/65 relative z-10 space-y-4 rounded-2xl border p-6 shadow-md backdrop-blur-md transition-all hover:shadow-lg dark:border-white/10">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                  <div>
                    <h3 className="text-h3 font-display text-text font-bold">{exp.role}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {exp.url ? (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-body text-primary font-bold hover:underline"
                        >
                          {exp.organization} ↗
                        </a>
                      ) : (
                        <span className="text-body text-primary font-bold">{exp.organization}</span>
                      )}
                      <span className="border-border-custom bg-surface-subtle text-caption text-text-muted rounded-full border px-2.5 py-0.5 font-mono font-bold tracking-wider uppercase">
                        {TYPE_LABELS[exp.type] || exp.type}
                      </span>
                    </div>
                  </div>

                  <div className="text-small text-text-muted flex flex-wrap gap-x-4 gap-y-1.5 font-mono">
                    <span className="flex items-center gap-1.5 font-medium">
                      <svg
                        className="text-primary size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {exp.start} — {exp.end || "Present"}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <svg
                        className="text-primary size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-body text-text-muted leading-relaxed">{exp.summary}</p>

                {/* Achievements following CAR formula */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-caption text-text font-mono font-bold tracking-wider uppercase">
                      Key Engineering Impacts
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="text-small text-text-muted flex items-start gap-2">
                          <svg
                            className="text-primary mt-0.5 size-4 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Applied Technologies Tag Pills with Cross-Filtering */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="border-border-custom space-y-2 border-t pt-2">
                    <span className="text-caption text-text-muted block font-mono tracking-wider uppercase">
                      Applied Technologies (Click tag to filter)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skillId) => {
                        const isSkillSelected = selectedSkill === skillId;
                        return (
                          <button
                            key={skillId}
                            onClick={() => setSelectedSkill(isSkillSelected ? null : skillId)}
                            className={`rounded border px-2.5 py-0.5 font-mono text-xs transition-all ${
                              isSkillSelected
                                ? "border-primary bg-primary text-white shadow-sm"
                                : "bg-surface-subtle border-border-custom text-text-muted hover:border-primary/50 hover:text-primary"
                            }`}
                          >
                            {skillMap[skillId] || skillId}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

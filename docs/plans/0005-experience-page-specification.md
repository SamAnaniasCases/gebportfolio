# Experience Page Information Architecture, Schema & Content Strategy Specification

<callout icon="♞">**Status:** Active Design & Implementation Specification · **Owner:** Sam Ananias Cases · **Date:** 2026-08-01 · **Version:** 1.3.0</callout>

This document is the official **Source of Truth** and Content Specification for the **Experience Page (`/experience`)**, the **`experience` Content Collection**, the **3D WebGL King Scroll Companion Component**, and the **Experience Authoring Template**. All content additions, schema changes, timeline component implementations, 3D WebGL features, and future design enhancements must strictly adhere to the rules, categorization taxonomy, impact formula, and visual identity standards defined here.

---

## 1. Page Purpose & Positioning

### Primary Purpose

The Experience page is an authentic, chronological timeline showcasing engineering growth, academic achievements, contract/freelance work, internships, and project leadership. Rather than inventing corporate titles or exaggerating experience, it presents a **transparent, evidence-backed narrative of practical software development, systems thinking, and continuous learning**.

### Target Audience & First 5–10 Seconds Takeaway

Within 10 seconds of landing on `/experience`, a hiring manager, recruiter, or collaborator must understand:

1. **Authentic Career Stage**: Clear positioning as an early-career developer / recent graduate with real project and technical experience.
2. **Categorized Role History**: Clear distinction between Full-Time, Contract/Freelance, Internship, Academic/Capstone, and Leadership roles via explicit category pills (`type`).
3. **Engineering Impact (CAR Framework)**: Key achievements written as Context -> Action -> Verified Outcome statements without corporate buzzwords or invented metrics.
4. **Applied Technologies**: Direct binding between experience entries and validated skills declared in `src/content/skills/`.
5. **Interactive 3D Scroll Companion**: A 3D turned-wood King chess piece companion guiding scroll progress along the timeline.

---

## 2. Rules of Engagement & Content Taxonomy

### Rule 1: No Invented Corporate Titles

In strict adherence to **Content & Writing Style Guide §3.1 & §9.3**:

- Do **not** create fake positions at major corporations (e.g. `Google`, `Netflix`, `Meta`).
- Clearly label personal projects as projects, academic work as academic, and freelance work as freelance.

### Rule 2: Explicit Experience Categorization Taxonomy

Every entry inside `src/content/experience/*.yaml` must specify a `type` field conforming to one of the following 7 enum values:

| `type` Enum Value | Display Label  | Definition & Scope                                                  | Example Entry                            |
| :---------------- | :------------- | :------------------------------------------------------------------ | :--------------------------------------- |
| `fulltime`        | `Full-Time`    | Standard employment with a company or organization.                 | Software Engineer                        |
| `contract`        | `Contract`     | Fixed-term or client-contracted software engineering engagement.    | Front-End Consultant                     |
| `internship`      | `Internship`   | Structured internship or apprenticeship program.                    | Software Engineering Intern              |
| `freelance`       | `Freelance`    | Independent client project or freelance service contract.           | Web Developer Freelance                  |
| `academic`        | `Academic`     | University degree, capstone thesis, or academic research position.  | BS Industrial Technology — Computer Tech |
| `project`         | `Project Lead` | Major independent software development or open-source system lead.  | BITS Timekeeping System Lead             |
| `leadership`      | `Leadership`   | Student organization, community, or technical club leadership role. | Tech Club Vice President                 |

### Rule 3: The CAR Impact Formula (Context, Action, Result)

Every achievement bullet point (`achievements: [...]`) must follow the **CAR Framework**:

- **Context**: What was the task, problem, or goal?
- **Action**: What specific technical action or architectural choice did the author execute?
- **Result / Impact**: What observable outcome, efficiency gain, or verified milestone resulted?

### Rule 4: Authoring Template for New Experience Entries

To create a new experience entry, add a YAML file in `src/content/experience/<your-entry-slug>.yaml` using the template below:

```yaml
# File: src/content/experience/software-engineer-intern.yaml

organization: "Company or Organization Name"
role: "Your Official Role Title"
type: "internship" # Options: fulltime | contract | internship | freelance | academic | project | leadership
start: "2024-06" # Format: YYYY-MM or YYYY
end: "2024-12" # Format: YYYY-MM or YYYY (leave empty string "" for Present)
location: "City, Country or Remote"
summary: "A concise 1-2 sentence high-level overview of your responsibilities, key systems built, or focus area."

# Achievements following CAR (Context -> Action -> Result)
achievements:
  - "Designed and implemented an automated testing suite using Playwright, increasing regression coverage across core user flows."
  - "Refactored front-end state management using TypeScript strict mode, eliminating runtime type errors."
  - "Collaborated on API design with senior engineers, optimizing database queries for peak traffic."

# Skill IDs matching files inside src/content/skills/*.yaml
skills:
  - typescript
  - rust
  - kubernetes

# Optional project or company link
url: "https://example.com"

# Display order on timeline (1 = top/most recent, 2 = second, 3 = third, etc.)
order: 1
```

---

## 3. Astro v5 Content Layer Schema & Validation Rules

The `experience` collection is configured in [src/content.config.ts](../../src/content.config.ts) using the `glob` loader:

```typescript
const experience = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/experience" }),
  schema: z.object({
    organization: z.string(),
    role: z.string(),
    type: z
      .enum([
        "fulltime",
        "contract",
        "internship",
        "freelance",
        "academic",
        "project",
        "leadership",
      ])
      .default("project"),
    start: z.string(), // Format: "YYYY-MM" or "YYYY"
    end: z.string().optional(), // Omitted or empty string implies "Present"
    location: z.string(),
    summary: z.string(),
    achievements: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]), // References IDs in src/content/skills/*.yaml
    url: z.string().url().optional(),
    order: z.number().default(0), // Lower numbers render earlier in timeline
  }),
});
```

---

## 4. UI Layout, Visual Identity & 3D Companion Specification

### 4.1 Layout & Typography Rules

1. **Timeline Node Aesthetics**: Vertical left-bordered timeline line (`border-l-2 border-border-custom`) with woodcut node icons (`<DoodleIcon>` SVGs for Briefcase, Calendar, MapPin, CheckCircle).
2. **No Text Emojis**: System text emojis (`✉`, 📷, 💼) are strictly forbidden in UI components and templates. Use theme-aware vector SVGs (`<DoodleIcon.astro>` or `<DoodleIcon.tsx>`).
3. **Category Badges**: Render category pills (`FULL-TIME`, `FREELANCE`, `ACADEMIC`, etc.) using border tokens and mono typography (`font-mono text-caption uppercase font-bold tracking-wider`).
4. **Skill Tag Resolution**: Map skill IDs listed in `skills: [...]` to canonical names loaded from the `skills` collection.
5. **Glossy Glassmorphic Cards**: Timeline cards use frosted glassmorphism (`bg-surface/65 backdrop-blur-md relative z-10 dark:border-white/10 shadow-md`), allowing background 3D motion to remain silhouetted behind cards while preserving 100% text legibility.

### 4.2 Interactive 3D WebGL King Scroll Companion Specification

The Experience page integrates `<Scroll3DKingCanvas client:only="react" />` ([Scroll3DKingCanvas.tsx](../../src/components/experience/Scroll3DKingCanvas.tsx)):

1. **Reference Camera Perspective**: Fixed elevated top-down tabletop view ($\sim 50^\circ$ pitch angle looking down from above: `position(2.4, 4.6, 4.0)`, `lookAt(2.0, 0.4, 0)`), capturing the top cross/crown rim while displaying turned-wood 3D height and depth.
2. **Procedural Wood Texture & Self-Shading**: Turned-wood lathe geometry with procedural canvas grain (`map: woodTexture`, `roughness: 0.36`), cross emblem, warm key light, fill light, and gold rim highlights (`#d4af37`).
3. **4-Phase Physical Hop State Machine**:
   - **Anticipation**: Crouches into the tile before jumping (`scaleY: 0.90`, `scaleX: 1.06`).
   - **Upward Arc**: Arcs into the air (`0.50` units hop height) with forward tilt (`0.15` rad).
   - **Landing Impact**: Compresses on contact (`scaleY: 0.88`, `scaleX: 1.08`).
   - **Rest Recovery**: Springs back upright onto active milestone square.
4. **Realistic Soft Radial Shadow**: Feathered circular radial shadow texture (`createShadowTexture()`) that scales (`1.0 + jumpY * 0.4`) and diffuses (`opacity` decreases) dynamically during airborne hops.
5. **Interactive Drag & Drop**: Window-level raycasting allows users to click/drag the 3D piece anywhere on screen. Clamped boundaries (`clampedX = Math.min(4.0, Math.max(0.2, rawX))`) strictly prevent the piece from entering the left navigation bar or sliding off-screen. Releasing lerps the piece back to its right-margin track (`initialX = 3.6`).
6. **Responsive Strategy**:
   - _Desktop_ ($>1024\text{px}$): Scale `0.62x`, position `X = 3.6` (right margin).
   - _Tablet_ ($768\text{px}-1024\text{px}$): Scale `0.50x`, position `X = 2.8`.
   - _Mobile_ ($<768\text{px}$): Scale `0.38x`, position `X = 2.1`, opacity `0.45` (watermark).

---

## 5. Future Design Enhancements & Evolution Roadmap

To continuously elevate the Experience page design while respecting the woodcut aesthetic and static performance budget:

### 5.1 Interactive Category Filter Bar

- Add interactive filter pills below the header (`ALL`, `FULL-TIME`, `CONTRACT`, `ACADEMIC`, `PROJECT LEAD`).
- Selecting a filter smoothly isolates matching timeline cards with animated CSS height/opacity transitions, updating the 3D King step cadence dynamically.

### 5.2 Hover-Synchronized 3D Nods

- Hovering any milestone card sends a subtle event to `<Scroll3DKingCanvas />`, causing the 3D King to execute a soft 15° rotation nod toward that card.

### 5.3 Applied Technology Cross-Filtering

- Tapping any skill tag pill (e.g. `Rust`, `Kubernetes`, `TypeScript`) filters the timeline to highlight roles where that specific skill was applied.

### 5.4 Expandable Architecture Case Study Drawer

- Clicking an experience card opens a glossy slide-over drawer displaying architecture diagrams, repository links, benchmark logs, and detailed technical post-mortems.

---

## 6. Verification & Definition of Done

Every edit to experience content, schema, or `/experience` layout must pass the full project verification suite:

1. `cmd /c "npx pnpm run format"` — Formats YAML, Markdown, and Astro code with Prettier.
2. `cmd /c "npx pnpm run lint"` — Validates ESLint rules.
3. `cmd /c "npx pnpm run check"` — Runs Astro compiler typechecks and relative document link checks.
4. `cmd /c "npx pnpm run build"` — Ensures static production bundle compiles cleanly.
5. `cmd /c "npx pnpm run test:e2e"` — Validates Playwright E2E suite.
6. `cmd /c "npx pnpm run test:a11y"` — Verifies axe-core accessibility audits.

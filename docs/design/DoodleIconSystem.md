# Doodle Icon System

<callout icon="🎨">**Status:** Active · **Owner:** Gen · **Created:** 2026-07-30</callout>

The **Doodle Icon System** provides hand-drawn, theme-aware vector icons (`.svg`) for Astro pages and React interactive components across the portfolio. It replaces generic system emojis and standard corporate UI icon sets with an organic, ink-on-paper doodle aesthetic that aligns perfectly with our **Woodcut & Engraving Visual Theme** ([WoodcutTheme.md](WoodcutTheme.md)).

---

## 1. Core Principles & Styling Rules

1. **Ink Linework Aesthetic**: All SVGs feature hand-drawn sketch vector linework.
2. **Dynamic Color Binding (`currentColor`)**: Icons inherit text color dynamically. In Light Mode, icons draw in dark ink (`#261e1a` / `--color-text-raw`). In Dark Mode, icons automatically invert to bright white/pale-blue ink (`#f0f4ff`).
3. **Responsive Sizing**: Size is controlled via standard Tailwind width/height utility classes (`size-4`, `size-5`, `size-6`) or explicit `size` numeric props (`size={20}`).
4. **Accessibility**:
   - Decorative icons automatically set `aria-hidden="true"` and `focusable="false"`.
   - Standalone/interactive icons pass an `ariaLabel` prop which applies `role="img"` and `aria-label="..."`.

---

## 2. Component Usage

### 2.1 Astro Components (`DoodleIcon.astro`)

```astro
---
import DoodleIcon from "../components/ui/DoodleIcon.astro";
---

<!-- Basic icon rendering -->
<DoodleIcon name="mail" class="text-primary size-4" />

<!-- With custom size and accessibility label -->
<DoodleIcon name="search" size={24} ariaLabel="Search articles" />
```

### 2.2 React Components (`DoodleIcon.tsx`)

```tsx
import React from "react";
import { DoodleIcon } from "../components/ui/DoodleIcon";

export const ActionButton: React.FC = () => {
  return (
    <button className="flex items-center gap-2">
      <DoodleIcon name="camera" className="size-4" />
      <span>Toggle Camera</span>
    </button>
  );
};
```

---

## 3. Directory Structure & Icon Categories

All icon SVGs are stored under `src/assets/icons/doodle/`:

```
src/assets/icons/doodle/
├── interface/        # search, mail, bell, settings, lock, link, trash, cross, menu, etc.
├── misc/             # bot, bug, chip, coffee, fire, rocket, server, trophy, etc.
├── emojis/           # happy-emoji, cool-emoji, wink-emoji, laughing-emoji, etc.
├── objects/          # camera, crown, frame, paint-brush, tv, etc.
├── arrows/           # arrow-up, arrow-down, arrow-left, arrow-right, refresh, etc.
└── files/            # doc, folder, doc-add, folder-delete, etc.
```

---

## 4. Icon Resolution Rules

Icons can be referenced using either:

- **Short Name**: `name="mail"` (resolves to `interface/mail.svg`)
- **Category Relative Name**: `name="interface/mail"` or `name="misc/bot"`

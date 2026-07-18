# Coding Standards

<callout icon="♞">**Status:** Active · **Owner:** Gen · **Last Reviewed:** 2026-07-18</callout>

Software quality guidelines, styling conventions, and engineering constraints.

---

## 1. Core Principles

1.  **Readability First**: Code is read more than written. Use expressive, clear naming rather than cryptic abbreviations.
2.  **KISS (Keep It Simple, Stupid)**: Build the simplest solution that works. Avoid speculative generality or premature optimization.
3.  **DRY (Don't Repeat Yourself)**: Extract common logic into helper functions, utilities, or reusable primitives, but avoid over-abstraction.
4.  **YAGNI (You Aren't Gonna Need It)**: Do not add features or packages before they are genuinely required.

---

## 2. TypeScript & JavaScript Standards

### Naming Conventions

- **Variables**: Use descriptive camelCase names. Booleans must begin with a status prefix (`is`, `has`, `can`, `should`).
  ```typescript
  // GOOD
  const isUserAuthenticated = true;
  const projectSearchQuery = "portfolio";

  // BAD
  const flag = true;
  const q = "portfolio";
  ```
- **Functions**: Use a verb-noun pattern.
  ```typescript
  // GOOD
  function calculateSimilarity(a: number[], b: number[]) {}
  async function fetchProjectData(slug: string) {}

  // BAD
  function similarity(a, b) {}
  async function project(slug) {}
  ```

### Immutability Pattern (CRITICAL)

- Always treat data as immutable. Never mutate arrays or objects directly; use the spread operator instead.
  ```typescript
  // GOOD
  const updatedUser = { ...user, name: "New Name" };
  const updatedArray = [...items, newItem];

  // BAD
  user.name = "New Name";
  items.push(newItem);
  ```

### Type Safety

- TypeScript must be run in `strict` compiler mode.
- Avoid using `any`; use `unknown` combined with type narrowing/guards, or infer types from schemas.

---

## 3. Control Flow & Readability

### Early Returns

- Avoid deep nesting of conditional statements. Use early returns to clear guard conditions early.
  ```typescript
  // GOOD
  if (!user) return;
  if (!user.isAdmin) return;
  if (!project.isActive) return;
  // Process admin user task...

  // BAD
  if (user) {
    if (user.isAdmin) {
      if (project.isActive) {
        // Process admin user task...
      }
    }
  }
  ```

### Magic Numbers

- Define named constants for unexplained numbers to improve code searchability and meaning.
  ```typescript
  // GOOD
  const MAX_RETRY_COUNT = 3;
  const DEBOUNCE_DELAY_MS = 500;

  if (retryCount > MAX_RETRY_COUNT) {
  }
  setTimeout(callback, DEBOUNCE_DELAY_MS);

  // BAD
  if (retryCount > 3) {
  }
  setTimeout(callback, 500);
  ```

---

## 4. Async & Error Handling

### Parallel Async Execution

- Use `Promise.all` for parallel execution when multiple asynchronous actions are independent.
  ```typescript
  // GOOD
  const [projects, posts, skills] = await Promise.all([
    fetchProjects(),
    fetchPosts(),
    fetchSkills(),
  ]);
  ```

### Error Handling Boundaries

- Validate all boundaries (API calls, form inputs, local storage actions). Always catch errors, print clean non-technical messages to users, and log structural errors without exposing secrets.
  ```typescript
  // GOOD
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch failure:", error);
    throw new Error("Failed to load content.");
  }
  ```

---

## 5. UI & Component Standards

### Component Structure

- Every component must have a single responsibility.
- Props must be strictly typed via TypeScript interfaces with clean default values.
  ```typescript
  interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    variant?: "primary" | "secondary";
  }

  export function Button({
    children,
    onClick,
    disabled = false,
    variant = "primary"
  }: ButtonProps) {
    return (
      <button onClick={onClick} disabled={disabled} class={`btn-${variant}`}>
        {children}
      </button>
    );
  }
  ```

### State Management

- Use functional state updates when updating state based on its previous value.
  ```typescript
  // GOOD
  setCount((prev) => prev + 1);

  // BAD
  setCount(count + 1);
  ```

### Conditional Rendering

- Keep conditional rendering simple. Avoid nested ternary expressions.
  ```typescript
  // GOOD
  {isLoading && <Spinner />}
  {error && <ErrorMessage message={error} />}
  {data && <DataDisplay data={data} />}
  ```

---

## 6. JSDoc Documentation

- Document helper methods and public utilities using JSDoc formatting, outlining parameters, return values, and usage examples.
  ````typescript
  /**
   * Formats an ISO date string to a human-readable date.
   *
   * @param dateString - The ISO date string to format
   * @returns A formatted date string (e.g., "July 18, 2026")
   *
   * @example
   * ```typescript
   * const label = formatDate("2026-07-18"); // "July 18, 2026"
   * ```
   */
  export function formatDate(dateString: string): string {
    // Implementation
  }
  ````

---

## 7. Testing Strategy

- **AAA (Arrange, Act, Assert)**: Structure tests cleanly following the AAA pattern.
- **Colocated Unit Tests**: Unit tests live directly alongside source files as `*.test.ts`.
- **E2E and Visual Tests**: Integrated regression tests live inside the root `/tests` folder.

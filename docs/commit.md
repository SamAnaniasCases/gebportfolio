---
name: accurate-commit-message
description: Generate an accurate Git commit message from verified repository changes. Use when an AI agent needs to summarize staged or unstaged changes before committing.
---

# Accurate Commit Message

Generate a concise Git commit message that describes only changes verified in the repository.

## Objective

Create a commit message that is:

- Accurate and grounded in the Git diff
- Clear to someone reviewing the project history
- Focused on the reason and effect of the change
- Consistent with Conventional Commits
- Free from assumptions, invented details, or unrelated changes

## Required workflow

1. Read the repository's contribution guidelines and rules when available:
   - `AGENTS.md`
   - `CONTRIBUTING.md`
   - `README.md`
   - `.gitmessage`
   - Other repository-specific instructions
2. Inspect the repository state:
   - On Windows, always wrap shell commands with `cmd /c` (e.g. `cmd /c "git status --short"`).

   ```bash
   cmd /c "git status --short"
   ```

3. Prefer inspecting the staged diff first:

   ```bash
   cmd /c "git diff --cached --stat"
   cmd /c "git diff --cached"
   ```

4. If nothing is staged, inspect the unstaged diff:

   ```bash
   cmd /c "git diff --stat"
   cmd /c "git diff"
   ```

5. Review recent commit messages to align with the repository's existing style:

   ```bash
   cmd /c "git log -10 --pretty=format:\"%s\""
   ```

6. Identify:
   - The primary change
   - The affected component or scope
   - The user-visible or technical effect
   - Important secondary changes
   - Tests, specifications, or documentation changed (e.g., `docs/Changelog.md`)
7. Generate the commit message only after reviewing the actual diff.

## Commit format

Use Conventional Commits unless the repository specifies another format:

```text
<type>(<optional-scope>): <summary>

<optional-body>

<optional-footer>
```

### Allowed types

- `feat`: Introduces user-visible functionality
- `fix`: Corrects faulty behavior
- `refactor`: Changes implementation without changing intended behavior
- `perf`: Improves performance
- `test`: Adds or updates tests
- `docs`: Changes documentation only
- `build`: Changes build tooling or dependencies
- `ci`: Changes continuous-integration configuration
- `chore`: Performs repository maintenance
- `style`: Changes formatting without affecting behavior
- `revert`: Reverts an earlier commit

Choose the type based on the change's purpose, not merely the files modified.

## Subject rules

- Use the imperative mood: `add`, `fix`, `update`, or `remove`
- Start with a lowercase letter unless repository conventions differ
- Do not end with a period
- Keep the subject concise, preferably no more than 72 characters
- Describe the primary outcome rather than implementation trivia
- Use a scope only when it adds useful context
- Do not claim behavior that the diff does not demonstrate
- Do not mention tests unless tests are the primary change

Good:

```text
fix(auth): reject expired refresh tokens
```

Bad:

```text
Updated some authentication files.
```

## Body rules

Include a body when the subject cannot adequately explain the change.

The body should:

- Explain why the change was needed
- Summarize important behavior or architectural changes
- Mention meaningful constraints or side effects
- Wrap lines at approximately 72 characters when practical
- Avoid repeating the subject
- Avoid listing every modified file

Example:

```text
fix(auth): reject expired refresh tokens

Validate token expiration before issuing a new access token. This
prevents expired sessions from being renewed through the refresh
endpoint.
```

## Breaking changes

For a breaking change, add `!` and a footer:

```text
feat(api)!: replace offset pagination with cursors

BREAKING CHANGE: List endpoints now accept cursor and limit instead of
page and pageSize.
```

Only mark a change as breaking when the diff provides clear evidence.

Accuracy requirements

- Never invent a ticket number, issue, test result, motivation, or effect.
- Never say tests pass unless the agent ran them successfully.
- Never infer a bug fix solely from a filename or branch name.
- Do not include untracked files unless their contents were inspected.
- Distinguish staged changes from unstaged changes.
- Base a commit message on staged changes when staged changes exist.
- If the diff contains unrelated changes, recommend splitting the commit.
- If the intent remains unclear after inspecting the diff, ask for context instead of guessing.

## Mixed-change handling

If the changes represent multiple independent purposes:

1. State that the commit should be split.
2. Group the files or hunks by purpose.
3. Suggest one commit message for each group.
4. Do not create a misleading umbrella message unless explicitly requested.

Example:

```text
These changes contain two independent updates and should be split:

1. fix(parser): handle empty configuration files
2. docs(cli): add configuration examples
```

## Output format

Return:

```text
<commit message>
```

When useful, also include a short verification section:

```text
Evidence:
- <verified change from the diff>
- <verified change from the diff>
```

Do not include the evidence section when the caller requests only the commit message.

## Final checklist

Before returning the message, confirm that:

- Every claim is supported by the inspected diff
- The type reflects the purpose of the change
- The scope is accurate and useful
- The summary uses imperative mood
- The summary is concise
- No issue numbers or test results were invented
- Breaking changes are clearly identified
- Unrelated changes have been flagged

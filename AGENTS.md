## Identity

Lyngurium is a CSS-in-JS library, a transplant of Ammolite that built for Lynx.

- You are a professional TypeScript and CSS developer working on this repository.

- Ammolite GitHub repository: `https://github.com/gemvale/ammolite`.

- Lynx GitHub repository: `https://github.com/lynx-family/lynx`.

- Both Ammolite(Web) and Lyngurim(Lynx) docs: `https://gemvale.github.io/llms.txt`.

## Non-Negotiable Rules

- Do not hallucinate.
- Do not invent APIs, files, or behavior.
- Do not assume features that are not present in the repository.
- Do not introduce new dependencies unless explicitly requested.
- Preserve existing code style.
- Preserve file and directory structure.

## Architecture

This repository is a pnpm workspace.

### Core

- `packages/lynx` - User-facing API

### Plugins

- `plugins/rsbuild` - Rsbuild integration
- `plugins/postcss` - PostCSS integration

### Tests

- `tests/variables` - Variable tests
- `tests/keyframes` - Keyframes tests
- `tests/style` - Style tests

## Code Standards

Language:

- TypeScript only.
- No `any` unless unavoidable.
- All variables must have explicit types.
- All exported APIs must have explicit types.

Style:

- Functional programming only.
- No classes unless the codebase already uses one in that exact location.
- No OOP abstractions.
- No mutation unless required.
- Prefer pure functions.
- Prefer small composable utilities.

## Editing Rules

When modifying code:

- Prefer minimal diffs.
- Do not refactor unrelated code.
- Do not rename files or symbols unless they are incorrect.
- If behavior changes, update tests accordingly.
- Never change public API semantics without explicit instruction.

If uncertain about intended behavior:

- Prefer reading tests as source of truth.
- Do not guess.

If a change affects multiple packages:

- Update in dependency order (compiler → integration → plugins → web).

## Testing Rules

- Do not delete failing tests to fix errors.
- Do not weaken assertions.
- Add tests when adding new behavior.
- Keep test style consistent with existing tests.

## Performance

- Avoid runtime allocations inside hot paths.
- Avoid unnecessary object cloning.
- Avoid non-deterministic behavior.
- Ensure stable output ordering where relevant.
- Compiler output must be deterministic.

## Tooling

The project uses:

- Node.js
- pnpm (workspace)
- just (task runner)
- ls-lint
- typos-cli

Always prefer `just` commands.

Never run raw `pnpm` unless explicitly required.

## Commands

Install dependencies:

```sh
just i
```

Lint:

```sh
just lint
```

Format:

```sh
just fmt
```

Build:

```sh
just build
```

Test:

```sh
just test
```
  
## What NOT to Do

- Do not migrate tooling.
- Do not introduce frameworks.
- Do not add config files unless explicitly requested.
- Do not add formatting rules.
- Do not silently change build behavior.

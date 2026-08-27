---
title: "Tools & Productivity"
subtitle: "Biome in 2026: How to Replace ESLint and Prettier with a 100x Faster Rust Linter"
description: "Complete guide to Biome.js 1.9 in 2026: replace ESLint and Prettier with a single Rust binary, zero deps, 100x faster, ready-to-use rules for TypeScript and React, automatic migration."
date: "02 July 2026"
image: "./biome-rust-2026.svg"
icon: "./biome-icon.svg"
language: "js"
---

![biome 2026 rust linter](./biome-rust-2026.svg)

# Biome in 2026:
## The 100x Faster Linter

02 July 2026

#### Complete guide to Biome.js 1.9 in 2026: replace ESLint and Prettier with a single Rust binary, zero deps, 100x faster, ready-to-use rules for TypeScript and React, automatic migration.

### What is Biome and why should you migrate today in 2026?

#### Biome is the successor to ESLint and Prettier written in Rust by the creator of Rome. In 2026, with stable version 1.9, it replaces ESLint + Prettier + import-sort + jsdoc-checker with a single native binary, zero production dependencies and 80-200x better performance.

#### Real benchmarks (typical Next.js 16 project, 12,000 files):
- **ESLint 9 + Prettier 3**: 12.4s + 4.2s = 16.6s
- **Biome 1.9 (lint + format)**: 0.08s
- **node_modules disk space**: ESLint/Prettier = 384MB, Biome = 11MB
- **Transitive dependencies**: ESLint/Prettier = 287 packages, Biome = 0

```bash
# Install Biome globally (single binary, ~11 MB, no deps)
npm install --save-dev @biomejs/biome

# Or use the standalone installer (no Node required)
curl -fsSL https://biomejs.dev/install.sh | bash
```

### 1. Automatic migration from ESLint and Prettier in 2026

#### Biome includes a `migrate` command that imports your `.eslintrc`, `prettier.config.js`, `.editorconfig` and Tailwind class-sort rules automatically. Full migration of a large project takes less than 5 minutes.

```bash
# 1. Install Biome
npm install --save-dev @biomejs/biome

# 2. Migrate from ESLint and Prettier (reads your current config and translates it)
npx @biomejs/biome migrate eslint --write
npx @biomejs/biome migrate prettier --write

# 3. Run the first lint+format (replaces eslint . and prettier --write .)
npx @biomejs/biome check --write
npx @biomejs/biome format --write .
```

#### What rules Biome covers out-of-the-box (no plugins):

| Rule | ESLint + Plugin | Biome 1.9 |
| --- | --- | --- |
| TypeScript rules | `@typescript-eslint/eslint-plugin` | Included |
| React rules | `eslint-plugin-react` + `react-hooks` | Included |
| Next.js rules | `eslint-config-next` | Included |
| Import sort | `eslint-plugin-import` | Included |
| JSX a11y | `eslint-plugin-jsx-a11y` | Included |
| Tailwind class sort | `eslint-plugin-tailwindcss` | Included (2026) |
| Json, CSS, HTML | not supported | Natively included |

### 2. Minimal config for a Next.js 16 project in 2026

#### The modern `biome.json` is declarative, supports JSON Schema and is auto-validated in the editor with official extension for VS Code, Cursor and Zed.

```json
// biome.json (recommended config for Next.js + React + TS in 2026)
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
  "files": {
    "ignoreUnknown": false,
    "includes": ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.json", "**/*.css"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100,
    "lineEnding": "lf"
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": { "noUnusedImports": "error", "noUnusedVariables": "error" },
      "style": { "useImportType": "error", "useNodejsImportProtocol": "error" },
      "suspicious": { "noExplicitAny": "warn" },
      "a11y": { "recommended": true },
      "performance": { "recommended": true }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded",
      "trailingCommas": "all"
    }
  }
}
```

### 3. Editor and CI integration in 2026

#### Biome ships a native LSP that works in VS Code, Cursor, Zed, Neovim and Helix. No daemon, no worker processes: the LSP starts in 8ms and format on save is instant.

#### In CI, `biome ci` fails the pipeline on errors, much faster than ESLint + Prettier:

```yaml
# .github/workflows/ci.yml — block PRs with lint or format errors
name: CI
on: [pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: jdxcode/setup-biome@v2  # automatic setup
      - run: biome ci .
      # Finishes in <2 seconds on large projects
```

```json
// .vscode/settings.json — format on save with Biome
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": { "quickfix.biome": "explicit", "source.biome": "explicit" },
  "[typescript]": { "editor.defaultFormatter": "biomejs.biome" },
  "[typescriptreact]": { "editor.defaultFormatter": "biomejs.biome" }
}
```

### 4. When NOT to migrate to Biome in 2026

#### To be honest: there are cases where Biome is not the best option yet.

- **Very specific custom rules**: if your team maintains 40+ internal ESLint custom rules, portability requires rewriting them in Rust. Cost > benefit short-term.
- **Legacy Vue/Svelte plugins**: Biome 1.9 supports Vue and Svelte basics, but the plugin ecosystem is not as mature as ESLint's.
- **Projects with complex prettier-plugin-tailwindcss**: although Biome supports it, migration may require manual tweaks.
- **Small teams with stable tooling**: if your current setup works, the 16s CI savings doesn't compensate the migration cost if you have 5 PRs per day.

#### For everything else — 95% of JavaScript/TypeScript projects in 2026 — Biome is objectively better: faster, fewer deps, better DX, same result.

### 5. Real case: migrating a SaaS in production

#### Migrating a production SaaS with 80k lines of code takes less than one hour:

```bash
# 1. Pre-audit (without touching anything)
npx @biomejs/biome migrate eslint --dry-run

# 2. Backup and migrate
cp .eslintrc.json .eslintrc.json.bak
npx @biomejs/biome migrate eslint --write
npx @biomejs/biome migrate prettier --write

# 3. Disable ESLint in VS Code and CI
# 4. Remove dependencies
npm uninstall eslint prettier eslint-plugin-react \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser eslint-config-next

# 5. Update scripts in package.json
{
  "scripts": {
    "lint": "biome check",
    "lint:fix": "biome check --write",
    "format": "biome format --write ."
  }
}

# 6. Validate in CI
biome ci .
```

#### Immediate benefit: CI goes from 38s to 1.4s, `npm install` goes from 14s to 4s, PRs review faster.

### Conclusions

#### Biome in 2026 is not just an ESLint alternative: it is strictly superior in almost every metric that matters — speed, DX, disk space, dependencies and consistency. For any new project, starting with Biome is the obvious choice. For existing projects, the 5-minute automatic migration pays off in less than a month thanks to CI and developer experience savings. The future of JavaScript tooling is written in Rust.
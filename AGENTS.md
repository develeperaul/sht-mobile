# AGENTS.md

## Commands

```bash
quasar dev      # Start dev server with hot reload
quasar build    # Build for production
```

## Architecture

- **Framework**: Quasar (Vue 3 + Vite)
- **State**: Pinia stores in `src/stores/`
- **HTTP**: Ky (`src/api/`)
- **Router**: Vue Router (hash mode)

## Key Config

- API: `https://admin.sayhellotravel.ru` (quasar.config.ts:76)
- Router: hash mode (quasar.config.ts:65)
- Boot order: init → init-user → auth → init-favourites → global-registration → registr-validators → registr-error-handlers → directives

## Auto-imports

Composables and stores are auto-imported. Stores use `Store` suffix pattern (e.g., `useAuthStore` → `import { useAuthStore } from '@/stores'`).

## Quasar Plugins

Notify, Loading, Dialog are available globally.

## TypeScript

Strict mode enabled. Imports use path aliases (`@/`, `@components/`, `@pages/`, etc.) - check quasar.config.ts for full list.
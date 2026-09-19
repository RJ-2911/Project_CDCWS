# Community Driven Collaborative Workspace

## Setup

```powershell
npm install
npm run dev
```

Useful commands:

- `npm run build`: type-check and create a production build
- `npm run lint`: run Oxlint
- `npm run preview`: serve the production build locally

## Current Stack

- React, TypeScript, and Vite
- tldraw for the infinite canvas
- Socket.IO client for real-time collaboration
- Better Auth client for authentication
- Zustand for client state
- Tailwind CSS and Lucide React for UI
- jsPDF and html-to-image for board export

The backend is planned as a NestJS service with PostgreSQL persistence. Its module boundaries and the shared contracts are documented in [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

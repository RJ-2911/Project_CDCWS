# CCWS Project Structure

The current Vite application remains at the project root so existing commands continue to work. New code is organized by responsibility:

```text
CCWS/
|-- src/                         # React frontend
|   |-- components/              # Shared UI components
|   |-- features/                # Canvas, collaboration, blocks, community, export
|   |-- hooks/                   # Reusable React hooks
|   |-- lib/                     # API, Socket.IO, export, and utility clients
|   |-- pages/                   # Route-level screens
|   |-- routes/                  # Router configuration
|   |-- store/                   # Zustand application state
|   `-- types/                   # Frontend-only types
|-- backend/                     # Planned NestJS API and Socket.IO service
|   `-- src/
|       |-- common/              # Guards, filters, pipes, and shared backend helpers
|       |-- config/              # Environment and application configuration
|       |-- database/             # PostgreSQL setup and repositories
|       `-- modules/              # Auth, boards, collaboration, blocks, community, export
|-- shared/types/                # Contracts shared by frontend and backend
|-- database/                    # SQL migrations and seed data
|-- docs/architecture/           # Architecture and workflow documentation
`-- tests/                       # Unit, integration, and end-to-end tests
```

The backend and database folders are templates only; their services still need to be implemented.

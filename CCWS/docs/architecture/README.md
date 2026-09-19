# Architecture Notes

The browser frontend communicates with the NestJS backend through REST APIs and Socket.IO. The backend validates Better Auth sessions, coordinates collaboration rooms, and persists board data in PostgreSQL.

Feature ownership follows the synopsis modules: Canvas, Collaboration, Content Blocks, Community, and Export.

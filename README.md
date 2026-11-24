# ChatFlow

A frontend-only messaging application built with React, Vite and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Included interactions

- Demo sign-in and logout
- Conversation switching and search
- Send messages with Enter; Shift+Enter adds a new line
- Create group conversations and choose members
- Attach a local image or document (preview as an attachment)
- Profile name and availability editing
- Conversation details and member list
- Read receipt styling and online indicators
- Local persistence with localStorage

## Demo limitations

This is a frontend prototype. Authentication, message delivery, online presence, typing and read receipts are simulated locally. Real multi-user chat requires a backend and Socket.IO server.

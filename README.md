# Socket.IO + React JS CHAT-APP

This project is a minimal single-room global chat using **Socket.IO** and **React** 

## Features
- Single global chat room where everyone sees all messages in real time.
- Dark theme UI built with React (no build step).
- Username persisted in `localStorage`.
- Per-client message cache in `localStorage` (last 50 messages).
- Server and client in a single repo; server serves the static client files.

## Requirements
- Node.js 16+ (or newer)
- npm

## Install & Run Locally
1. Clone or unzip the project folder.
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open your browser to `http://localhost:3000` (open multiple tabs to test realtime).

## How it works
- `server/index.js` boots an Express server and attaches Socket.IO to it. It serves files from `/client` (including `index.html`) and manages an in-memory message history (ephemeral).
- The client loads React and Socket.IO from CDN and connects back to the server.
- Messages are kept in server memory (lost on restart) and also cached per-client in the browser's `localStorage`.
- No database is required.


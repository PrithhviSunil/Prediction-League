Frontend

The React frontend for a multiplayer sports prediction platform where friends create private leagues and compete to predict the outcomes of real matches.

This app consumes the [backend REST API](../backend) — handling authentication, league management, predictions, and live leaderboards.

> **Status:** In active development.

## Features


- **Authentication** — register and log in; the JWT is stored client-side and attached to protected requests.
- **Leagues** — create a private league (with a shareable invite code) or join one by code.
- **Predictions** — browse upcoming matches and submit a pick before kickoff.
- **Leaderboards** — see live standings for a league, sorted by points.

## Tech Stack

- **React** (with TypeScript)
- **Vite** — build tool and dev server
- **React Router** — client-side navigation
- **Fetch API** — talks to the backend, sending the JWT in an `Authorization: Bearer` header on protected routes

## How It Talks to the Backend

The frontend is a single-page app that calls the backend API. After login, the returned JWT is saved to `localStorage`, then read back and attached to the header of every authenticated request:

```ts
const token = localStorage.getItem('token')

await fetch('http://localhost:3000/api/predictions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ leagueId, matchId, predicted_winner })
})
```

## Pages

| Route | Description |
|-------|-------------|
| `/register` | Create an account |
| `/login` | Log in and store a session token |
| `/leagues` | Create or join a league |
| `/matches` | Browse matches and submit predictions |
| `/leaderboard` | View league standings |

## Running Locally

The backend must be running first (see the [backend README](../backend)).

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
   
3. Open the URL Vite prints (usually `http://localhost:5173`).

## Roadmap

- [x] Login and registration
- [x] Client-side routing
- [x] League creation and joining
- [x] Leaderboard view
- [x] Match browsing and prediction submission
- [ ] Styling and responsive design
- [ ] League selection dropdown (replace manual league ID entry)
- [ ] Deployment (Vercel)

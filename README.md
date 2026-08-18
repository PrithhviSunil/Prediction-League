
A multiplayer web app where friends create private leagues and compete to predict the outcomes of real sports matches — think fantasy football, but for calling winners.

---

## What It Does

1. Users register and log in (JWT-based auth).
2. A user creates a private league and gets a shareable invite code.
3. Friends join using that code.
4. Matches are added with two teams, a kickoff time, and an optional underdog.
5. Members predict winners before kickoff — predictions lock once the match starts.
6. Once a match is resolved, every prediction is scored and every leaderboard updates atomically.

**Scoring:** 1 point for a correct pick, 2 if you correctly backed the underdog.

## Repository Structure

This is a monorepo containing both halves of the app:

```
├── backend/     Node.js + Express + PostgreSQL REST API
└── frontend/    React + TypeScript + Tailwind CSS
```

See **[backend/README.md](./backend/README.md)** and **[frontend/README.md](./frontend/README.md)** for setup instructions and technical details specific to each half.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, TypeScript, Tailwind CSS, React Router, Vite |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |
| Hosting | Vercel (frontend) · Render (backend) · Neon (database) |

## What I Actually Built

This project was as much about learning production backend engineering as it was about the app itself:

- **Layered architecture** — routes → controllers → services, fully typed in TypeScript with no `any`.
- **Relational schema design** — 5 tables including a many-to-many junction table (`league_members`) linking users to leagues.
- **Transactional integrity** — resolving a match writes to 3 tables across many rows in a single SQL transaction (`BEGIN`/`COMMIT`/`ROLLBACK`), so a failure mid-update can never leave leaderboards out of sync with predictions.
- **Real authentication** — JWT middleware verifies every protected request; the server never trusts a client-supplied user ID.
- **Full deployment** — hosted database, deployed API, and a live frontend talking to it in production.

## Running Locally

Both the backend and frontend need to be running:

```bash
# Terminal 1
cd backend
npm install
npm run dev

# Terminal 2
cd frontend
npm install
npm run dev
```

See the individual READMEs for environment variable setup.

## Roadmap

- [x] Auth, leagues, matches, predictions, scoring, leaderboards
- [x] React frontend with Tailwind styling
- [x] Full deployment (Vercel + Render + Neon)
- [ ] Automated fixture ingestion via a sports data API
- [ ] Configurable underdog point multipliers per league
- [ ] League selection dropdown (replace manual league ID entry)

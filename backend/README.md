The backend for the multiplayer sports prediction platform where friends create private leagues and compete to predict the outcomes of real matches. Correct picks earn points, backing the underdog earns bonus points, and a live leaderboard tracks who's on top.

This is a REST API built to practice production-style backend engineering: layered architecture, relational schema design, authentication, and transactional data integrity.

> **Status:** Backend complete. Frontend (React) in progress.

## How It Works

1. Users register and log in — a JWT is issued on login.
2. A user creates a league and receives a shareable invite code.
3. Friends join the league using that code.
4. Matches are added with two teams, a kickoff time, and an optional underdog.
5. Members submit predictions before kickoff; predictions lock once the match starts.
6. When a match is resolved, every prediction is scored and all leaderboards update in a single atomic operation.

## Scoring

| Outcome | Points |
|---------|--------|
| Correct prediction | 1 |
| Correct prediction on the underdog | 2 |
| Incorrect prediction | 0 |

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL (raw SQL via the `pg` library)
- **Auth:** JWT (`jsonwebtoken`) + bcrypt password hashing

## Architecture

The API uses a layered architecture to keep concerns separated:

```
Request → Route → Controller → Service → Database
```

- **Routes** map URLs to controllers.
- **Controllers** handle HTTP parsing and responses only — no business logic.
- **Services** hold business logic and all database access.
- **Middleware** verifies JWTs and protects routes.

Every layer is fully typed in TypeScript across request bodies, database rows, and custom result types (no `any`).

### Database Schema

Five tables with foreign keys and constraints:

- `users` — accounts with hashed passwords
- `leagues` — prediction leagues with unique invite codes
- `league_members` — junction table (many-to-many between users and leagues), stores per-league points
- `matches` — fixtures with teams, kickoff time, underdog, and result
- `predictions` — a user's pick for a match within a league

### Transactional Scoring

Resolving a match writes to three tables (`matches`, `predictions`, `league_members`) across many rows. This runs inside a single SQL transaction (`BEGIN` / `COMMIT` / `ROLLBACK`), so a failure partway through rolls everything back — leaderboards can never end up out of sync with predictions.

### Validation

Submitting a prediction passes through a three-check pipeline before it's accepted:

1. The match exists and hasn't started (predictions lock at kickoff).
2. The user is a member of the league they're predicting in.
3. The user hasn't already predicted this match in this league.

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/register` | Create an account | — |
| POST | `/api/login` | Log in, receive a JWT | — |
| POST | `/api/leagues` | Create a league | ✅ |
| POST | `/api/leagues/join` | Join a league by invite code | ✅ |
| GET | `/api/leagues/:id/leaderboard` | League standings | ✅ |
| POST | `/api/matches` | Add a match | ✅ |
| GET | `/api/matches` | List matches | — |
| POST | `/api/matches/:id/resolve` | Resolve a match and score predictions | ✅ |
| POST | `/api/predictions` | Submit a prediction | ✅ |

Protected routes require an `Authorization: Bearer <token>` header.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a PostgreSQL database and run the schema in `schema.sql`.
3. Create a `.env` file in this folder (see `.env.example`):
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=prediction_league
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_secret
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

The API runs at `http://localhost:3000`.

## Roadmap

- [x] Authentication (register, login, JWT middleware)
- [x] League creation and joining
- [x] Match management
- [x] Predictions with validation
- [x] Transactional scoring engine
- [x] Leaderboards
- [ ] React frontend
- [ ] Deployment (Vercel + hosted Postgres)
- [ ] Automated fixture ingestion via a sports data API
- [ ] Configurable underdog multipliers per league

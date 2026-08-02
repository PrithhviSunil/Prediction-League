## Backend writes going to local DB instead of Neon

**Symptom:** DATABASE_URL printed the correct Neon connection string on
startup, but registered users kept landing in local Postgres, not Neon.
Postman requests even succeeded when no server had been started manually.

**Cause:** A stale `node` process from an earlier session was still running
and bound to port 3000, holding the old localhost DB connection. Postman was
hitting that ghost process, not the updated code.

**Fix:** `taskkill /IM node.exe /F` to kill all node processes, then restart
with `npm run dev`. Verified the ghost was dead by confirming Postman failed
before restarting.

**Lesson:** "My code changes aren't taking effect" often means a stale process,
not a code bug. Check what's actually bound to the port before debugging the code.

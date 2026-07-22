import { Router } from "express";
import { createLeagueHandler as leagues } from "../controllers/leagueController";
import { joinLeagueHandler as joinLeague } from "../controllers/leagueController";
import { leaderboardHandler as leaderboard } from "../controllers/leagueController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router()

router.post('/leagues', authenticate ,leagues)
router.post('/leagues/join', authenticate ,joinLeague)
router.get('/leagues/:id/leaderboard', leaderboard)
export default router
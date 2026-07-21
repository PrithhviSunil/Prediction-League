import { Router } from "express";
import { createLeagueHandler as leagues } from "../controllers/leagueController";
import { joinLeagueHandler as joinLeague } from "../controllers/leagueController";
import { leaderboardHandler as leaderboard } from "../controllers/leagueController";

const router = Router()

router.post('/leagues', leagues)
router.post('/leagues/join', joinLeague)
router.get('/leagues/:id/leaderboard', leaderboard)
export default router
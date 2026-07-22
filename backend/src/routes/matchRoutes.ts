import { Router } from "express";
import { createMatchHandler as matches } from "../controllers/matchController";
import { getMatchesHandler as fixtures, resolveMatchHandler } from "../controllers/matchController";


const router = Router()

router.post('/matches', matches)
router.get('/matches', fixtures)
router.post('/matches/:id/resolve', resolveMatchHandler)
export default router

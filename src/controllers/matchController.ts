import { Request, Response } from 'express'
import { MatchRow, CreateMatchRequestBody } from '../types'
import { createMatch, getMatches, resolveMatch } from '../services/matchService'


export async function createMatchHandler(req: Request, res:Response) {
    const { sport, competition, team1, team2, underdog, start_time } = req.body as CreateMatchRequestBody
    const match = await createMatch(sport, competition, team1, team2, underdog, start_time)
    res.status(201).json(match)
}

export async function getMatchesHandler(req: Request, res: Response) {
    const fixtures = await getMatches()
    res.status(200).json(fixtures)
}

export async function resolveMatchHandler(req: Request, res: Response) {
    const matchId = Number(req.params.id)
    const { winner } = req.body as { winner: string }
    await resolveMatch(matchId, winner)
    res.status(200).json({ message: 'Match resolved' })
}
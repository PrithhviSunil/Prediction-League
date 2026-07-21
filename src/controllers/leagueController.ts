import { Request, Response } from 'express'
import { createLeague, joinLeague, getLeaderboard } from '../services/leagueService'
import { CreateLeagueRequestBody, JoinLeagueRequestBody } from '../types'


export async function createLeagueHandler(req: Request, res: Response) {
    const { name, userId } = req.body as CreateLeagueRequestBody
    const league = await createLeague(name, userId)
    res.status(201).json(league)
}

export async function joinLeagueHandler(req: Request, res:Response) {
    const { invite_code, userId } = req.body as JoinLeagueRequestBody
    const join = await joinLeague(invite_code, userId)
    
    if (!join) {
        res.status(404).json({error :'Invalid Invite Code'})
        return
    } 
    res.status(200).json(join)
    
}

export async function leaderboardHandler(req: Request, res: Response) {
    const leagueId = Number(req.params.id)
    const leaderboard = await getLeaderboard(leagueId)
    res.status(200).json(leaderboard)
}


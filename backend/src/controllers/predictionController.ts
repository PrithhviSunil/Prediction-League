import { Request, Response } from 'express'
import { CreatePredictionRequestBody } from '../types'
import { createPrediction } from '../services/predictionService'

export async function predictionHandler(req: Request, res:Response) {
    const userId = req.userId!
    const { leagueId, matchId, predicted_winner } = req.body as CreatePredictionRequestBody
    const predict = await createPrediction(userId, leagueId, matchId, predicted_winner)

    if (!predict.success) {
        const messages = {
        MATCH_UNAVAILABLE: 'Match not found or already started',
        NOT_A_MEMBER: 'You are not a member of this league',
        ALREADY_PREDICTED: 'You have already predicted this match'
    }
    res.status(400).json({ error: messages[predict.reason] })
    return
}

res.status(201).json(predict.prediction)
    
}
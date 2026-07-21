import pool from '../db'
import { PredictionRow, MatchRow, LeagueRow, PredictionResult } from '../types'


export async function createPrediction(
    userId: number, 
    leagueId : number, 
    matchId : number, 
    predicted_winner : string
): Promise<PredictionResult> {
    const time_check = await pool.query<MatchRow> (
        `SELECT * FROM matches WHERE id = $1 AND start_time > NOW()`,
        [matchId]

    )
    if (time_check.rows.length === 0) {
        return { success : false, reason: 'MATCH_UNAVAILABLE'}
    }


    const member_check = await pool.query<LeagueRow> (
        `SELECT * FROM league_members WHERE league_id = $1 AND user_id = $2`,
        [leagueId ,userId]
    )
    if (member_check.rows.length === 0) {
        return { success: false, reason: 'NOT_A_MEMBER' }
    }

    const prediction_check = await pool.query<PredictionRow> (
        `SELECT * FROM predictions WHERE user_id = $1 AND match_id = $2 AND league_id = $3`,
        [userId, matchId, leagueId]
    )
    if (prediction_check.rows.length > 0) {
        return { success: false, reason: 'ALREADY_PREDICTED' }
    }
        
    
       
    const result = await pool.query<PredictionRow> (
    `INSERT INTO predictions (user_id, league_id, match_id, predicted_winner)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
    [userId, leagueId, matchId, predicted_winner])

   

    return { success: true, prediction: result.rows[0]! }




}
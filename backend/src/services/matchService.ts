import pool from '../db'
import { MatchRow, PredictionRow } from '../types'

export async function createMatch(
    sport : string,
    competition : string,
    team1 : string,
    team2 : string,
    underdog : string | null,
    start_time : string
): Promise<MatchRow> {
    const result = await pool.query<MatchRow> (
        `INSERT INTO matches (sport, competition, team1, team2, underdog, start_time) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [sport, competition, team1, team2, underdog, start_time]
    )
    const fixture = result.rows[0]!
    return fixture
}

export async function getMatches(): Promise<MatchRow[]> {
    const result = await pool.query<MatchRow> (
        `SELECT * FROM matches ORDER BY start_time`,
    )
    const fixtures = result.rows
    return fixtures
}

function calculatePoints(
    predictedWinner: string,
    actualWinner: string,
    underdog: string | null
): number {
    let points = 0;
    if (predictedWinner === actualWinner) {
        if (actualWinner === underdog) {
            points += 2;

        } else {
            points += 1;
        }  
    } 
    return points
}

export async function resolveMatch(
    matchId: number, 
    winner: string
): Promise<void> {
    const client = await pool.connect()
        try {
        await client.query('BEGIN')

        // 1. Update the match's winner, RETURNING underdog (you need it for scoring)
        const matchResult = await client.query<MatchRow>(
            `UPDATE matches SET winner = $1 WHERE id = $2 RETURNING underdog`,
            [winner, matchId]
        )
        const underdog = matchResult.rows[0]!.underdog

        const predictions = await client.query<PredictionRow>(
            `SELECT * FROM predictions where match_id = $1`,
            [matchId]
        )

        for (const pred of predictions.rows) {
            const points = calculatePoints(pred.predicted_winner, winner, underdog)
            await client.query(
                `UPDATE predictions SET points_earned = $1 WHERE id = $2`,
                [points, pred.id]
            )
            await client.query(
                `UPDATE league_members SET points = points + $1
                WHERE league_id = $2 AND user_id = $3`,
                [points, pred.league_id, pred.user_id]
            )
        }

        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK')
        throw error
    } finally {
        client.release()

    }
}


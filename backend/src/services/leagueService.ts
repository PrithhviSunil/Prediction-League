
import pool from '../db'
import { LeagueRow, leaderboardRow } from '../types'



function generateInviteCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
}


export async function createLeague(
    name : string, 
    userId: number
): Promise<LeagueRow> {
    const client = await pool.connect()
    const invite_code = generateInviteCode()

    try {
        await client.query('BEGIN')

        const result = await client.query<LeagueRow> (
            `INSERT INTO leagues (name, invite_code, created_by)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [name, invite_code, userId]
        )
        const league = result.rows[0]!

        await client.query(
            `INSERT INTO league_members (league_id, user_id)
            VALUES ($1, $2)`,
            [league.id, userId]
        )

        await client.query('COMMIT')
        return league

    } catch (error) {
        await client.query('ROLLBACK')
        throw error
      
    } finally {
        client.release()
    }    
}

export async function joinLeague(
    invite_code : string,
    userId : number
): Promise<LeagueRow | null> {
    const result = await pool.query<LeagueRow> (
        `SELECT * FROM leagues WHERE invite_code = $1`,
        [invite_code]
    )
    
    if (result.rows.length === 0) {
        return null

    }
    const league = result.rows[0]!
    await pool.query(
        `INSERT INTO league_members (league_id, user_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [league.id, userId]
    )

    return league
}
 

export async function getLeaderboard(leagueId: number): Promise<leaderboardRow[]> {
    const result = await pool.query<leaderboardRow>(
        `SELECT users.username, league_members.points
         FROM league_members
         JOIN users ON users.id = league_members.user_id
         WHERE league_members.league_id = $1
         ORDER BY league_members.points DESC`,
        [leagueId]
    )
    return result.rows
}
    

import pool from '../src/db'
import dotenv from 'dotenv'

dotenv.config()

const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY!

interface ApiMatch {
    homeTeam: { name: string }
    awayTeam: { name: string }
    utcDate: string
    status: string
}

async function fetchFixtures(): Promise<ApiMatch[]> {
    const res = await fetch('https://api.football-data.org/v4/competitions/PL/matches?status=SCHEDULED', {
        headers: { 'X-Auth-Token': FOOTBALL_API_KEY }
    })

    if (!res.ok) {
        throw new Error(`API request failed: ${res.status}`)
    }

    const data = await res.json()
    return data.matches
}

async function seedFixtures() {
    const fixtures = await fetchFixtures()
    console.log(`Fetched ${fixtures.length} upcoming fixtures`)

    let inserted = 0

    for (const match of fixtures.slice(0, 20)) {  // limit to first 20 for now
        await pool.query(
            `INSERT INTO matches (sport, competition, team1, team2, underdog, start_time)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
                'Football',
                'Premier League',
                match.homeTeam.name,
                match.awayTeam.name,
                null,               // no odds data from free tier, leave underdog unset
                match.utcDate
            ]
        )
        inserted++
    }

    console.log(`Inserted ${inserted} fixtures into the database`)
    process.exit(0)
}

seedFixtures().catch(err => {
    console.error('Failed to seed fixtures:', err)
    process.exit(1)
})
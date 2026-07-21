export interface RegisterRequestBody {
    username: string
    email: string
    password: string
}

export interface UserRow {
    id: number
    username: string
    email: string
    created_at: Date
}

export interface UserWithHash {
    id : number
    username : string
    password_hash : string
}

export interface LoginRequestBody {
    username : string
    password : string
}

export interface LeagueRow {
    id: number
    name: string
    invite_code: string
    created_by: number
    created_at: Date
}

export interface CreateLeagueRequestBody {
    name: string
    userId: number
}

export interface JoinLeagueRequestBody {
    invite_code : string,
    userId : number
}

export interface MatchRow {
    id : number
    sport : string
    competition : string
    team1 : string
    team2 : string
    underdog : string 
    start_time : string
    winner : string | null
}

export interface CreateMatchRequestBody {
    sport: string
    competition: string
    team1: string
    team2: string
    underdog: string | null
    start_time: string

}

export interface PredictionRow {
    id: number,
    user_id : string, 
    league_id: string,
    matchId : string, 
    predicted_winner : string
}

export interface CreatePredictionRequestBody {
    id : number,
    userId : number, 
    leagueId: number,
    matchId : number, 
    predicted_winner : string,
    winner : string
}

export type PredictionResult =
    | { success: true; prediction: PredictionRow }
    | { success: false; reason: 'MATCH_UNAVAILABLE' | 'NOT_A_MEMBER' | 'ALREADY_PREDICTED' }


export interface leaderboardRow {
    username : string, 
    points: number
}


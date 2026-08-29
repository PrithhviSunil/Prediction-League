import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL

interface Match {
  id: number
  team1: string
  team2: string
  competition: string
  start_time: string
}

function Matches() {
  const [matches, setMatches] = useState<Match[]>([])
  const [leagueId, setLeagueId] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`${API}/api/matches`).then(res => res.json()).then(data => setMatches(data))
  }, [])

  async function predict(matchId: number, winner: string) {
    setMessage('')
    const token = localStorage.getItem('token')
    const res = await fetch(`${API}/api/predictions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ leagueId: Number(leagueId), matchId, predicted_winner: winner })
    })
    if (!res.ok) {
      const err = await res.json()
      setMessage(err.error || 'Prediction failed')
      return
    }
    setMessage('Prediction submitted.')
  }

  return (
    <div className="min-h-screen bg-black px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-6">Matches</h1>

        <input
          className="w-full mb-8 px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-neutral-500"
          placeholder="League ID to predict in"
          value={leagueId}
          onChange={e => setLeagueId(e.target.value)}
        />

        <div className="space-y-4">
          {matches.map(match => (
            <div key={match.id} className="border border-neutral-800 p-4">
              <p className="text-neutral-500 text-xs mb-1">{match.competition}</p>
              <p className="text-white text-sm mb-3">{match.team1} vs {match.team2}</p>
              <div className="flex gap-2">
                <button
                  className="flex-1 py-2 border border-neutral-800 text-neutral-300 hover:border-neutral-500 hover:text-white text-sm transition"
                  onClick={() => predict(match.id, 'team1')}
                >
                  {match.team1}
                </button>
                <button
                  className="flex-1 py-2 border border-neutral-800 text-neutral-300 hover:border-neutral-500 hover:text-white text-sm transition"
                  onClick={() => predict(match.id, 'team2')}
                >
                  {match.team2}
                </button>
              </div>
            </div>
          ))}
        </div>

        {message && <p className="text-neutral-400 text-sm mt-6">{message}</p>}
      </div>
    </div>
  )
}

export default Matches
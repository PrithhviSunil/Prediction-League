import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL

interface Match {
  id: number
  team1: string
  team2: string
  competition: string
  winner: string | null
}

function Admin() {
  const [matches, setMatches] = useState<Match[]>([])
  const [message, setMessage] = useState('')

  function loadMatches() {
    fetch(`${API}/api/matches`).then(res => res.json()).then(data => setMatches(data))
  }

  useEffect(() => { loadMatches() }, [])

  async function resolve(matchId: number, winner: string) {
    setMessage('')
    const token = localStorage.getItem('token')
    const res = await fetch(`${API}/api/matches/${matchId}/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ winner })
    })
    if (!res.ok) { setMessage('Failed to resolve match'); return }
    setMessage(`Match ${matchId} resolved.`)
    loadMatches()
  }

  return (
    <div className="min-h-screen bg-black px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-6">Resolve matches</h1>
        <div className="space-y-4">
          {matches.map(match => (
            <div key={match.id} className="border border-neutral-800 p-4">
              <p className="text-neutral-500 text-xs mb-1">{match.competition}</p>
              <p className="text-white text-sm mb-3">
                {match.team1} vs {match.team2}
                {match.winner && <span className="text-neutral-400"> — winner: {match.winner}</span>}
              </p>
              {!match.winner && (
                <div className="flex gap-2">
                  <button className="flex-1 py-2 border border-neutral-800 text-neutral-300 hover:border-neutral-500 hover:text-white text-sm transition" onClick={() => resolve(match.id, 'team1')}>{match.team1} won</button>
                  <button className="flex-1 py-2 border border-neutral-800 text-neutral-300 hover:border-neutral-500 hover:text-white text-sm transition" onClick={() => resolve(match.id, 'team2')}>{match.team2} won</button>
                </div>
              )}
            </div>
          ))}
        </div>
        {message && <p className="text-neutral-400 text-sm mt-6">{message}</p>}
      </div>
    </div>
  )
}

export default Admin
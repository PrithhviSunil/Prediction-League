import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL

interface LeaderboardEntry {
  username: string
  points: number
}

function Leaderboard() {
  const [players, setPlayers] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/api/leagues/1/leaderboard`)
      .then(res => res.json())
      .then(data => { setPlayers(data); setLoading(false) })
  }, [])

  return (
    <div className="min-h-screen bg-black px-4 py-16">
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-6">Leaderboard</h1>
        {loading ? (
          <p className="text-neutral-500 text-sm">Loading...</p>
        ) : (
          <div className="border-t border-neutral-800">
            {players.map((player, i) => (
              <div key={player.username} className="flex justify-between items-center py-3 border-b border-neutral-800">
                <span className="text-neutral-300 text-sm">
                  <span className="text-neutral-600 mr-2">{i + 1}</span>{player.username}
                </span>
                <span className="text-white text-sm font-medium">{player.points} pts</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
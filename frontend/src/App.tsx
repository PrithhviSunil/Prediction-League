import { useState, useEffect } from 'react'

interface LeaderboardEntry {
  username: string
  points: number
}

function App() {
  const [players, setPlayers] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/leagues/1/leaderboard')
      .then(res => res.json())
      .then(data => {
        setPlayers(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      <ol>
        {players.map(player => (
          <li key={player.username}>
            {player.username} — {player.points} points
          </li>
        ))}
      </ol>
    </div>
  )
}

export default App
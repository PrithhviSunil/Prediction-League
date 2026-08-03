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
    fetch(`${API}/api/matches`)
      .then(res => res.json())
      .then(data => setMatches(data))
  }, [])

  async function predict(matchId: number, winner: string) {
    setMessage('')
    const token = localStorage.getItem('token')

    const res = await fetch(`${API}/api/predictions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        leagueId: Number(leagueId),
        matchId: matchId,
        predicted_winner: winner
      })
    })

    if (!res.ok) {
      const err = await res.json()
      setMessage(err.error || 'Prediction failed')
      return
    }

    setMessage('Prediction submitted!')
  }

  return (
    <div>
      <h1>Matches</h1>

      <input
        placeholder="League ID to predict in"
        value={leagueId}
        onChange={e => setLeagueId(e.target.value)}
      />

      {matches.map(match => (
        <div key={match.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p>{match.competition}: {match.team1} vs {match.team2}</p>
          <button onClick={() => predict(match.id, 'team1')}>Pick {match.team1}</button>
          <button onClick={() => predict(match.id, 'team2')}>Pick {match.team2}</button>
        </div>
      ))}

      {message && <p>{message}</p>}
    </div>
  )
}

export default Matches
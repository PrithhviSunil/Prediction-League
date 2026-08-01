import { useState, useEffect } from 'react'

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
    fetch('http://localhost:3000/api/matches')
      .then(res => res.json())
      .then(data => setMatches(data))
  }

  useEffect(() => {
    loadMatches()
  }, [])

  async function resolve(matchId: number, winner: string) {
    setMessage('')
    const token = localStorage.getItem('token')

    const res = await fetch(`http://localhost:3000/api/matches/${matchId}/resolve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ winner })
    })

    if (!res.ok) {
      setMessage('Failed to resolve match')
      return
    }

    setMessage(`Match ${matchId} resolved!`)
    loadMatches()   // refresh so the winner shows
  }

  return (
    <div>
      <h1>Admin — Resolve Matches</h1>

      {matches.map(match => (
        <div key={match.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p>
            {match.competition}: {match.team1} vs {match.team2}
            {match.winner && <strong> — Winner: {match.winner}</strong>}
          </p>

          {!match.winner && (
            <>
              <button onClick={() => resolve(match.id, 'team1')}>{match.team1} won</button>
              <button onClick={() => resolve(match.id, 'team2')}>{match.team2} won</button>
            </>
          )}
        </div>
      ))}

      {message && <p>{message}</p>}
    </div>
  )
}

export default Admin
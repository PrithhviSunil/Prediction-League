import { useState } from 'react'

const API = import.meta.env.VITE_API_URL
function Leagues() {
  const [leagueName, setLeagueName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [createdCode, setCreatedCode] = useState('')
  const [message, setMessage] = useState('')

  async function handleCreate() {
    setMessage('')
    const token = localStorage.getItem('token')

    const res = await fetch(`${API}/api/leagues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: leagueName })
    })

    if (!res.ok) {
      setMessage('Failed to create league')
      return
    }

    const data = await res.json()
    setCreatedCode(data.invite_code)
  }

  async function handleJoin() {
    setMessage('')
    const token = localStorage.getItem('token')

    const res = await fetch(`${API}/api/leagues/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ invite_code: inviteCode })
    })

    if (!res.ok) {
      setMessage('Failed to join — invalid code')
      return
    }

    setMessage('Joined league successfully!')
  }

  return (
    <div>
      <h1>Leagues</h1>

      <h2>Create a League</h2>
      <input
        placeholder="League name"
        value={leagueName}
        onChange={e => setLeagueName(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
      {createdCode && <p>League created! Invite code: <strong>{createdCode}</strong></p>}

      <h2>Join a League</h2>
      <input
        placeholder="Invite code"
        value={inviteCode}
        onChange={e => setInviteCode(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>

      {message && <p>{message}</p>}
    </div>
  )
}

export default Leagues
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
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ name: leagueName })
    })
    if (!res.ok) { setMessage('Failed to create league'); return }
    const data = await res.json()
    setCreatedCode(data.invite_code)
  }

  async function handleJoin() {
    setMessage('')
    const token = localStorage.getItem('token')
    const res = await fetch(`${API}/api/leagues/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ invite_code: inviteCode })
    })
    if (!res.ok) { setMessage('Failed to join — invalid code'); return }
    setMessage('Joined league successfully.')
  }

  const inputClass = "w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-neutral-500"
  const btnClass = "w-full mt-3 py-2.5 bg-white hover:bg-neutral-200 text-black text-sm font-medium transition"

  return (
    <div className="min-h-screen bg-black px-4 py-16">
      <div className="max-w-sm mx-auto space-y-12">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Create a league</h2>
          <input className={inputClass} placeholder="League name" value={leagueName} onChange={e => setLeagueName(e.target.value)} />
          <button className={btnClass} onClick={handleCreate}>Create</button>
          {createdCode && (
            <p className="text-neutral-300 text-sm mt-3">
              Invite code: <span className="text-white font-mono">{createdCode}</span>
            </p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Join a league</h2>
          <input className={inputClass} placeholder="Invite code" value={inviteCode} onChange={e => setInviteCode(e.target.value)} />
          <button className={btnClass} onClick={handleJoin}>Join</button>
        </div>

        {message && <p className="text-neutral-400 text-sm">{message}</p>}
      </div>
    </div>
  )
}

export default Leagues
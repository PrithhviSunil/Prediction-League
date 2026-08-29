import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleRegister() {
    setError('')
    const res = await fetch(`${API}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
    if (!res.ok) {
      setError('Registration failed — username or email may be taken')
      return
    }
    navigate('/login')
  }

  const inputClass = "w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-neutral-500"

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-white mb-1">Sign up</h1>
        <p className="text-neutral-500 text-sm mb-8">GaggleScore</p>

        <div className="space-y-3">
          <input className={inputClass} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input className={inputClass} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className={inputClass} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <button className="w-full mt-5 py-2.5 bg-white hover:bg-neutral-200 text-black text-sm font-medium transition" onClick={handleRegister}>
          Sign up
        </button>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  )
}

export default Register
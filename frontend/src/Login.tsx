import { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin() {
    setError('')
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (!res.ok) {
      setError('Invalid username or password')
      return
    }

    const data = await res.json()
    localStorage.setItem('token', data.token)
    alert('Logged in! Token saved.')
  }
  

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}



export default Login
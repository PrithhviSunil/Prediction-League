import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Leaderboard from './Leaderboard'
import Leagues from './Leagues'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link> |{' '}
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/leagues">Leagues</Link> |{' '}
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/leagues" element={<Leagues />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
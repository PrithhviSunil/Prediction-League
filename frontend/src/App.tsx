import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Leaderboard from './Leaderboard'
import Leagues from './Leagues'
import Matches from './Matches'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link> |{' '}
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/leagues">Leagues</Link> |{' '}
        <Link to="/matches">Matches</Link> |{' '}
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
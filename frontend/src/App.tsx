import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Leaderboard from './Leaderboard'
import Leagues from './Leagues'
import Matches from './Matches'
import Admin from './Admin'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link> |{' '}
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/leagues">Leagues</Link> |{' '}
        <Link to="/matches">Matches</Link> |{' '}
        <Link to="/admin">Admin</Link> |{' '}
      </nav>

      <nav className="bg-slate-800 px-6 py-4 flex gap-6 shadow-md">
        <Link to="/login" className="text-slate-200 hover:text-emerald-400 font-medium transition">Login</Link>
        <Link to="/register" className="text-slate-200 hover:text-emerald-400 font-medium transition">Register</Link>
        <Link to="/leagues" className="text-slate-200 hover:text-emerald-400 font-medium transition">Leagues</Link>
        <Link to="/matches" className="text-slate-200 hover:text-emerald-400 font-medium transition">Matches</Link>
        <Link to="/leaderboard" className="text-slate-200 hover:text-emerald-400 font-medium transition">Leaderboard</Link>
        <Link to="/admin" className="text-slate-200 hover:text-emerald-400 font-medium transition">Admin</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
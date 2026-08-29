import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Leaderboard from './Leaderboard'
import Leagues from './Leagues'
import Matches from './Matches'
import Admin from './Admin'
import Home from './Home'

function App() {
  return (
    <BrowserRouter>

      <nav className="bg-black border-b border-neutral-800 px-6 py-4 flex gap-6">
        <Link to="/" className="text-white font-semibold text-sm mr-4">Oracle FC</Link>
        <Link to="/login" className="text-neutral-400 hover:text-white text-sm transition">Login</Link>
        <Link to="/register" className="text-neutral-400 hover:text-white text-sm transition">Register</Link>
        <Link to="/leagues" className="text-neutral-400 hover:text-white text-sm transition">Leagues</Link>
        <Link to="/matches" className="text-neutral-400 hover:text-white text-sm transition">Matches</Link>
        <Link to="/leaderboard" className="text-neutral-400 hover:text-white text-sm transition">Leaderboard</Link>
        
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
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
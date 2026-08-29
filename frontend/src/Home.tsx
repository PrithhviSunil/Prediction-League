import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-white mb-3">Oracle FC</h1>
        <p className="text-neutral-400 text-sm mb-10">
          Predict match winners.
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            to="/login"
            className="px-6 py-2.5 bg-white hover:bg-neutral-200 text-black text-sm font-medium transition"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="px-6 py-2.5 border border-neutral-800 text-white hover:border-neutral-500 text-sm font-medium transition"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-brand text-white grid place-content-center font-bold">EM</div>
          <span className="font-semibold text-lg">EventMate</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-brand' : 'text-gray-700 hover:text-brand'}>Home</NavLink>
          <NavLink to="/create" className={({isActive}) => isActive ? 'text-brand' : 'text-gray-700 hover:text-brand'}>Create Event</NavLink>
          <NavLink to="/mytickets" className={({isActive})=> isActive ? 'text-brand':'text-gray-700 hover:text-brand'}>MyTickets</NavLink>

        </nav>
      </div>
    </header>
  )
}

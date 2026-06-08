import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import CreateEvent from './pages/CreateEvent.jsx'
import Register from './pages/Register.jsx'
import Scanner from './pages/Scanner.jsx'
import NotFound from './pages/NotFound.jsx'
import MyTickets from "./pages/MyTickets.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/register/:eventId" element={<Register />} />
          <Route path="/scan/:eventId" element={<Scanner />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/mytickets" element={<MyTickets />} />
        </Routes>
      </main>
    </div>
  )
}

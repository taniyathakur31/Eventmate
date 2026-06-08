import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import QRGenerator from '../components/QRGenerator'

export default function Register() {
  const { eventId } = useParams()
  const [event, setEvent] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [registeredToken, setRegisteredToken] = useState('')

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('em_events') || '[]')
    const ev = events.find(e => e.id === eventId)
    setEvent(ev || null)
  }, [eventId])

  const handleRegister = (e) => {
    e.preventDefault()
    // Create a registration token (to be verified server-side in real app)
    const token = btoa(JSON.stringify({ eventId, name, email, ts: Date.now() }))
    setRegisteredToken(token)

    // Save to localStorage demo registry
    const prev = JSON.parse(localStorage.getItem('em_regs') || '[]')
    localStorage.setItem('em_regs', JSON.stringify([{ token, eventId, name, email }, ...prev]))
  }

  if (!event) {
    return <div className="card">Event not found.</div>
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Register for: {event.title}</h2>
        <form className="grid gap-4" onSubmit={handleRegister}>
          <div>
            <label className="label">Full Name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <button className="btn-primary" type="submit">Generate My QR</button>
        </form>
      </div>

      <div>
        {registeredToken ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">Your Check‑in QR</h3>
            <QRGenerator value={registeredToken} />
            <p className="text-sm text-gray-600 mt-3">
              Show this QR at the gate. Organizers will scan and mark attendance.
            </p>
          </div>
        ) : (
          <div className="card">
            <p className="text-gray-600">
              Register to get a QR code for check‑in.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

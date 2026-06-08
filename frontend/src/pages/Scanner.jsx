import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import QrReader from 'react-qr-scanner'

export default function Scanner() {
  const { eventId } = useParams()
  const [result, setResult] = useState('')
  const [message, setMessage] = useState('')
  const [stats, setStats] = useState({ total: 0, checkedIn: 0 })

  useEffect(() => {
    const regs = JSON.parse(localStorage.getItem('em_regs') || '[]').filter(r => r.eventId === eventId)
    const checkins = JSON.parse(localStorage.getItem('em_checkins') || '[]').filter(c => c.eventId === eventId)
    setStats({ total: regs.length, checkedIn: checkins.length })
  }, [eventId, message])

  const handleScan = (data) => {
    if (data?.text && data.text !== result) {
      setResult(data.text)
      try {
        // Verify token (in real app, send to backend)
        const payload = JSON.parse(atob(data.text))
        if (payload.eventId !== eventId) {
          setMessage('❌ Invalid event QR.')
          return
        }
        // Check if already checked in
        const seen = JSON.parse(localStorage.getItem('em_checkins') || '[]')
        if (seen.some(s => s.token === data.text)) {
          setMessage('⚠️ Already checked in.')
          return
        }
        const entry = { token: data.text, eventId, name: payload.name, email: payload.email, ts: Date.now() }
        localStorage.setItem('em_checkins', JSON.stringify([entry, ...seen]))
        setMessage('✅ Check‑in successful for ' + payload.name)
      } catch (e) {
        setMessage('❌ Invalid QR format.')
      }
    }
  }

  const handleError = (err) => {
    console.error(err)
    setMessage('Camera error: ' + err?.message)
  }

  const previewStyle = { height: 280, width: '100%' }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Scan QR (Event Admin)</h2>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
        />
        <div className="mt-3 text-sm text-gray-600 break-all">{result}</div>
        {message && <div className="mt-3 text-sm">{message}</div>}
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-2">Attendance Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-brand-light rounded-2xl text-center">
            <div className="text-3xl font-bold text-brand">{stats.total}</div>
            <div className="text-gray-700">Registered</div>
          </div>
          <div className="p-4 bg-green-50 rounded-2xl text-center">
            <div className="text-3xl font-bold text-green-600">{stats.checkedIn}</div>
            <div className="text-gray-700">Checked‑in</div>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          * Demo uses localStorage. Replace with secure backend endpoints for production.
        </p>
      </div>
    </div>
  )
}

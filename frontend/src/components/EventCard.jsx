import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
  return (
    <div className="card">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <span className="text-xs bg-brand-light text-brand px-2.5 py-1 rounded-full">
            {new Date(event.date).toLocaleString()}
          </span>
        </div>
        <p className="text-gray-600">{event.description}</p>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Link to={`/register/${event.id}`} className="btn-primary">Register</Link>
          <Link to={`/scan/${event.id}`} className="btn-outline">Scan (Admin)</Link>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

/**
 * Generates a QR code for the given value and renders it on a canvas.
 * Typically used to encode a registration token or studentId+eventId.
 */
export default function QRGenerator({ value, size = 220 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!value) return
    QRCode.toCanvas(canvasRef.current, value, { width: size, margin: 1 })
  }, [value, size])

  return (
    <div className="card flex flex-col items-center gap-3">
      <canvas ref={canvasRef} className="rounded-xl border" />
      <code className="text-xs break-all text-gray-600">{value}</code>
    </div>
  )
}

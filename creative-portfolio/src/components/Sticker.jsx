import { useId } from 'react'
import { ArrowDownRight } from 'lucide-react'

// Round rotating text sticker (decorative).
export default function Sticker({ text = 'OPEN TO WORK • FREELANCE • ', size = 124, className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <div
      aria-hidden="true"
      className={`relative grid place-items-center rounded-full bg-sun text-ink shadow-[0_10px_40px_rgba(0,0,0,0.45)] ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id={id} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text fontSize="9" fontWeight="700" fill="currentColor" style={{ fontFamily: 'var(--font-mono)' }}>
          <textPath href={`#${id}`} textLength="228" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <ArrowDownRight className="relative" size={size * 0.3} strokeWidth={2.2} />
    </div>
  )
}

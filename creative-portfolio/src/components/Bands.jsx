const a = ['Frontend Development', 'Graphic Design', 'Poster Design', 'Interfaces', 'Typography', 'Motion']
const b = ['Open to work', 'Available for freelance', 'Based in Nigeria', 'Say hello', 'Start a project']

function Band({ items, className, duration, reverse }) {
  const row = [...items, ...items]
  return (
    <div className={`absolute left-[-6%] top-1/2 w-[112%] -translate-y-1/2 overflow-hidden py-3 md:py-4 ${className}`}>
      <div
        className={`marquee-track flex w-max whitespace-nowrap ${reverse ? 'marquee-reverse' : ''}`}
        style={{ animationDuration: duration }}
      >
        {row.map((t, i) => (
          <span key={i} className="display flex items-center text-3xl md:text-5xl">
            {t}
            <span className="mx-6 md:mx-10" aria-hidden="true">✶</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// Two crossing, tilted ticker bands. Purely decorative.
export default function Bands() {
  return (
    <div aria-hidden="true" className="relative h-[210px] overflow-hidden md:h-[300px]">
      <Band items={b} reverse duration="48s" className="rotate-[2.2deg] bg-bone text-ink" />
      <Band items={a} duration="40s" className="-rotate-[2.6deg] bg-signal text-ink shadow-[0_0_60px_rgba(0,0,0,0.5)]" />
    </div>
  )
}

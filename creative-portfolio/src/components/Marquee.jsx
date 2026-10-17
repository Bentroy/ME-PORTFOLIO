export default function Marquee({ items }) {
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-line bg-coal py-4" aria-hidden="true">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="display flex items-center text-2xl md:text-4xl">
            <span className={i % 2 ? 'outline-text' : ''}>{t}</span>
            <span className="mx-6 text-signal md:mx-10">✶</span>
          </span>
        ))}
      </div>
    </div>
  )
}

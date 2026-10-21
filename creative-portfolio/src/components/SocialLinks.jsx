import { site, isPlaceholderUrl } from '../data/site'
import SocialIcon from './SocialIcon'

// Social icon row. Real links open in a new tab; placeholders (URL still contains "YOUR")
// render dimmed and non-clickable so visitors never land on a wrong page.
export default function SocialLinks({ className = '', showLabels = false, tone = 'dark' }) {
  const accent = tone === 'accent'
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`} aria-label="Social links">
      {site.socials.map((s) => {
        const live = !isPlaceholderUrl(s.url)
        const inner = (
          <>
            <SocialIcon id={s.id} />
            {showLabels ? <span className="label">{s.label}</span> : <span className="sr-only">{s.label}</span>}
          </>
        )
        const base = `flex h-11 items-center justify-center gap-2 border ${accent ? 'border-ink/40' : 'border-line'} ${showLabels ? 'px-4' : 'w-11'}`
        return (
          <li key={s.id}>
            {live ? (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className={`${base} ${accent ? 'text-ink hover:border-ink hover:bg-ink hover:text-signal' : 'text-bone hover:border-signal hover:bg-signal hover:text-ink'} transition-colors`}
              >
                {inner}
              </a>
            ) : (
              <span
                title={`${s.label} — add your link in src/data/site.js`}
                className={`${base} cursor-not-allowed border-dashed ${accent ? 'text-ink/60' : 'text-mute'}`}
              >
                {inner}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

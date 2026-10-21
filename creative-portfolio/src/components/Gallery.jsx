import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Maximize2 } from 'lucide-react'
import Lightbox from './Lightbox'
import { riseIn, stagger } from '../lib/motion'

const tilts = [-1.4, 0.9, -0.6, 1.3, -1, 0.7]

// Masonry-style columns: every image keeps its natural aspect ratio — nothing is cropped.
// Add images in src/assets/graphic-design/ — no changes to this file needed.
export default function Gallery({ posters }) {
  const [active, setActive] = useState(null)

  return (
    <>
      <motion.ul
        className="columns-2 gap-3 md:columns-3 md:gap-5 xl:columns-4"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {posters.map((p, i) => (
          <motion.li
            key={p.id}
            variants={riseIn}
            style={{ rotate: tilts[i % tilts.length] }}
            whileHover={{ rotate: 0, scale: 1.04, zIndex: 20, transition: { duration: 0.25 } }}
            className={`relative mb-4 break-inside-avoid md:mb-7 ${i % 5 === 2 ? 'md:pt-10' : ''}`}
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              data-cursor="Enlarge"
              className="group relative block w-full overflow-hidden border border-line bg-coal text-left transition-shadow duration-300 hover:shadow-[9px_9px_0_0_var(--color-signal)] focus-visible:shadow-[9px_9px_0_0_var(--color-signal)]"
              aria-label={`Enlarge: ${p.title}`}
              aria-haspopup="dialog"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              {/* Hover/focus edge tag only — never covers the artwork */}
              <span className="label absolute bottom-0 left-0 flex max-w-full translate-y-full items-center gap-2 bg-signal px-2 py-1 text-[0.62rem] text-ink transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">
                <Maximize2 size={11} aria-hidden="true" />
                <span className="truncate">{String(i + 1).padStart(2, '0')} — {p.title}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <AnimatePresence>
        {active !== null && (
          <Lightbox posters={posters} index={active} onIndex={setActive} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

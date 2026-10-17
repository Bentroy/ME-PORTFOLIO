import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { site } from '../data/site'
import { ease } from '../lib/motion'

// ─────────────────────────────────────────────────────────────
//  CINEMATIC INTRO
//  Your photo: put an image named  portrait.(webp|jpg|jpeg|png|avif)
//  in  src/assets/intro/  — it is picked up automatically.
//  If no photo exists, a clearly labelled placeholder is shown.
// ─────────────────────────────────────────────────────────────
const photos = import.meta.glob('../assets/intro/portrait.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  import: 'default',
})
const photo = Object.values(photos)[0]

// How long the intro holds before the transition starts (ms).
export const INTRO_DURATION = 4200

const ewise = [0.76, 0, 0.24, 1]

export default function Intro({ onDone }) {
  const finished = useRef(false)
  const prevOverflow = useRef('')

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    document.body.style.overflow = prevOverflow.current // release scroll lock immediately
    onDone()
  }, [onDone])

  useEffect(() => {
    prevOverflow.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(finish, INTRO_DURATION) // fail-safe: always ends, even if animations don't
    const onKey = (e) => e.key === 'Escape' && finish()
    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow.current
    }
  }, [finish])

  const letters = 'BENJY'.split('')

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Introduction"
      className="fixed inset-0 z-[55] overflow-hidden bg-ink"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 1.05, ease: ewise, delay: 0.25 } }}
    >
      {/* faint grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 70% 50%, black 10%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 10%, transparent 70%)',
        }}
      />

      {/* Top-left: identity */}
      <motion.div
        className="absolute left-5 top-5 z-20 max-w-[52%] md:left-10 md:top-8 md:max-w-none"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
        transition={{ delay: 0.9, duration: 0.8, ease }}
      >
        <p className="label text-bone">Owuzechi David Benjamin</p>
        <p className="label mt-1 text-mute">Creative Developer · Graphic Designer</p>
      </motion.div>

      {/* Top-right: skip */}
      <motion.button
        type="button"
        onClick={finish}
        autoFocus
        className="label group absolute right-5 top-5 z-30 flex items-center gap-3 border border-line bg-ink/60 px-4 py-3 text-bone backdrop-blur hover:border-signal hover:text-signal md:right-10 md:top-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ delay: 0.4 }}
      >
        Skip intro
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </motion.button>

      {/* Photograph */}
      <div className="absolute left-1/2 top-[14svh] h-[48svh] -translate-x-1/2 lg:left-auto lg:right-[10%] lg:top-1/2 lg:h-[76svh] lg:-translate-y-1/2 lg:translate-x-0" style={{ aspectRatio: '4 / 5' }}>
        <motion.div
          className="relative h-full w-full overflow-hidden border border-line bg-coal"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.95, ease: ewise } }}
          transition={{ duration: 1.2, ease: ewise, delay: 0.15 }}
        >
          {photo ? (
            <motion.img
              src={photo}
              alt="Portrait of Benjy"
              className="h-full w-full object-cover"
              style={{ objectPosition: '50% 18%' }}
              initial={{ scale: 1.25, filter: 'grayscale(1) contrast(1.15)' }}
              animate={{ scale: 1, filter: 'grayscale(0.15) contrast(1.05)' }}
              transition={{ duration: 2.6, ease }}
              draggable={false}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-start justify-end gap-2 p-5">
              <span className="label bg-signal px-2 py-1 text-[0.6rem] text-ink">Photo placeholder</span>
              <span className="label text-[0.62rem] text-mute break-all">Add: src/assets/intro/portrait.jpg</span>
            </div>
          )}
          <span className="label absolute bottom-3 left-3 bg-ink px-2 py-1 text-[0.6rem] text-bone">
            <span className="text-signal">●</span> {site.name}
          </span>
        </motion.div>
      </div>

      {/* Bottom-left: wordmark + statement */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-10 md:px-10 md:pb-14">
        <motion.div
          exit={{ opacity: 0, y: -50, transition: { duration: 0.5, ease } }}
        >
          <h2 aria-label={site.name} className="font-display text-[clamp(4.5rem,25vw,9rem)] font-semibold uppercase leading-[0.85] tracking-[-0.045em] sm:text-[clamp(6rem,22vw,13rem)] lg:text-[16vw] 2xl:text-[17rem]">
            {letters.map((ch, i) => (
              <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.55 + i * 0.08, duration: 0.9, ease }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
            <span aria-hidden="true" className="text-signal">.</span>
          </h2>

          <motion.p
            className="mt-5 max-w-md text-lg leading-snug text-bone/90 md:mt-6 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.9, ease }}
          >
            I&rsquo;m Benjy. I build for the web, design visuals, and explore the space where
            creativity meets technology.
          </motion.p>
        </motion.div>
      </div>

      {/* Timing bar */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-20 h-[3px] origin-left bg-signal"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: INTRO_DURATION / 1000, ease: 'linear' }}
      />
    </motion.div>
  )
}

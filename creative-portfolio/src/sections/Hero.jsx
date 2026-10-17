import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import MaskLine from '../components/MaskLine'
import { posters } from '../data/graphicDesign'
import { ease, stagger } from '../lib/motion'
import { site } from '../data/site'

// Pick three hero posters (falls back gracefully if files are renamed/removed).
const pick = (id, fallbackIndex) => posters.find((p) => p.id === id) ?? posters[fallbackIndex % posters.length]
const stack = posters.length
  ? [pick('poster-08.webp', 0), pick('poster-01.webp', 1), pick('poster-16.webp', 2)]
  : []

const layers = [
  { cls: 'left-[2%] top-[14%] w-[42%] sm:w-[34%] lg:w-[44%]', rot: -7, depth: 14, delay: 0.7 },
  { cls: 'left-[30%] top-[2%] w-[42%] sm:w-[34%] lg:w-[44%]', rot: 5, depth: 28, delay: 0.85 },
  { cls: 'left-[56%] top-[24%] w-[42%] sm:w-[34%] lg:w-[44%]', rot: -2, depth: 42, delay: 1.0 },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 18 })
  const sy = useSpring(my, { stiffness: 80, damping: 18 })

  const onMove = (e) => {
    if (reduce || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pb-14"
      onPointerMove={onMove}
      aria-labelledby="hero-title"
    >
      {/* corner meta */}
      <motion.div
        className="label absolute right-5 top-24 hidden text-right text-mute md:right-10 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <p>Portfolio</p>
        <p className="text-bone">Frontend × Graphic</p>
      </motion.div>

      {/* Poster collage */}
      {stack.length > 0 && (
        <div className="relative mx-auto mb-10 h-[52vw] max-h-[420px] w-full max-w-[680px] lg:absolute lg:right-[2%] lg:top-[14%] lg:mx-0 lg:mb-0 lg:h-[62%] lg:max-h-none lg:w-[40%] lg:max-w-none">
          {stack.map((p, i) => (
            <Layer key={p.id + i} p={p} cfg={layers[i]} sx={sx} sy={sy} reduce={reduce} />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-[1600px]">
        <motion.p
          className="label mb-6 flex items-center gap-3 text-mute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="inline-block h-2 w-2 bg-signal" aria-hidden="true" />
          {site.name} — Creative developer & graphic designer
        </motion.p>

        <motion.h1
          id="hero-title"
          className="display text-[clamp(3.4rem,17vw,7rem)] sm:text-[clamp(4rem,18vw,11rem)] lg:text-[11.5vw] 2xl:text-[13rem]"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <MaskLine delay={0.15}>Code</MaskLine>
          <MaskLine delay={0.3} className="outline-text">&amp; Poster</MaskLine>
          <MaskLine delay={0.45}>
            Craft<span className="text-signal">.</span>
          </MaskLine>
        </motion.h1>

        <motion.div
          className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease }}
        >
          <p className="max-w-md text-lg leading-snug text-bone/85 md:text-xl">
            I build websites that work hard and posters that stop the scroll — two disciplines, one
            obsessive eye for detail.
          </p>
          <a
            href="#work"
            className="group label inline-flex w-fit items-center gap-4 border-b border-bone pb-2 text-bone hover:border-signal hover:text-signal"
          >
            Explore the work
            <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function Layer({ p, cfg, sx, sy, reduce }) {
  const x = useTransform(sx, [-0.5, 0.5], [-cfg.depth, cfg.depth])
  const y = useTransform(sy, [-0.5, 0.5], [-cfg.depth, cfg.depth])
  return (
    <motion.div
      className={`absolute ${cfg.cls}`}
      style={reduce ? undefined : { x, y }}
    >
      <motion.img
        src={p.src}
        alt={p.alt}
        className="block h-auto w-full border border-line shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
        initial={{ opacity: 0, y: 80, rotate: cfg.rot * 2 }}
        animate={{ opacity: 1, y: 0, rotate: cfg.rot }}
        transition={{ delay: cfg.delay, duration: 1, ease }}
        draggable={false}
      />
    </motion.div>
  )
}

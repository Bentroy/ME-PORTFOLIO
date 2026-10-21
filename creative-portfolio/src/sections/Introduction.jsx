import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import MaskLine from '../components/MaskLine'
import Reveal from '../components/Reveal'
import SocialLinks from '../components/SocialLinks'
import Sticker from '../components/Sticker'
import { site } from '../data/site'
import { ease, stagger } from '../lib/motion'

// ─────────────────────────────────────────────────────────────
//  YOUR PHOTO: put an image named  portrait.(webp|jpg|jpeg|png|avif)
//  in  src/assets/about/  — it is picked up automatically.
//  (Delete the old portrait.* first so only one exists.)
// ─────────────────────────────────────────────────────────────
const photos = import.meta.glob('../assets/about/portrait.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  import: 'default',
})
const photo = Object.values(photos)[0]

const disciplines = [
  {
    title: 'Frontend web development',
    text: 'Turning ideas into functional, responsive websites and web apps.',
  },
  {
    title: 'Graphic design',
    text: 'Posters and visuals that communicate something at a glance.',
  },
]

const details = [
  { k: 'Location', v: site.location },
  { k: 'Status', v: 'Open to work', dot: true },
  { k: 'Arrangement', v: 'Available for freelance projects' },
  { k: 'Studying', v: 'University student, 400 level' },
]

export default function Introduction() {
  const reduce = useReducedMotion()
  const frame = useRef(null)
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section
      id="top"
      aria-labelledby="about-title"
      className="relative overflow-hidden px-5 pb-24 pt-28 md:px-10 md:pb-40 md:pt-36"
    >
      <span id="about" className="absolute top-0" aria-hidden="true" />

      {/* faint grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at 75% 35%, black 5%, transparent 65%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 75% 35%, black 5%, transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-[1600px]">
        <motion.p
          className="label flex items-center gap-3 text-mute"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          <span className="inline-block h-2 w-2 shrink-0 bg-signal" aria-hidden="true" />
          A little about the person behind the pixels.
        </motion.p>

        {/* Oversized heading — the photo tucks up underneath its right edge on large screens */}
        <motion.h1
          id="about-title"
          className="display relative z-10 mt-6 text-[clamp(4.5rem,26vw,9rem)] sm:text-[clamp(6rem,24vw,16rem)] lg:text-[15.5vw] 2xl:text-[21rem]"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <MaskLine delay={0.1}>
            I&rsquo;m Benjy<span className="text-signal">.</span>
          </MaskLine>
        </motion.h1>

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10 lg:-mt-[3vw]">
          {/* Photo */}
          <div className="lg:sticky lg:top-24 lg:order-2 lg:col-span-5 lg:col-start-8 lg:self-start">
            <div ref={frame} className="relative mx-auto w-full max-w-[26rem] lg:mx-0 lg:ml-auto lg:max-w-none">
              {/* offset accent frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 border border-signal md:translate-x-5 md:translate-y-5"
              />
              <motion.div
                className="relative aspect-[4/5] overflow-hidden border border-line bg-coal"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              >
                {photo ? (
                  <motion.img
                    src={photo}
                    alt="Portrait of Owuzechi David Benjamin, who goes by Benjy"
                    className="absolute inset-0 h-[108%] w-full object-cover"
                    style={{ objectPosition: '50% 20%', y: reduce ? 0 : imgY }}
                    initial={{ scale: 1.18 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.8, ease }}
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-start justify-end gap-2 p-5">
                    <span className="label bg-signal px-2 py-1 text-[0.6rem] text-ink">Photo placeholder</span>
                    <span className="label break-all text-[0.62rem] text-mute">Add: src/assets/about/portrait.jpg</span>
                  </div>
                )}
              </motion.div>
              <motion.div
                className="absolute -right-3 -top-10 z-20 md:-right-6 md:-top-12"
                initial={{ scale: 0, rotate: -80 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 1.3 }}
              >
                <Sticker size={118} className="-rotate-6" />
              </motion.div>
              <motion.p
                className="label absolute -bottom-3 left-3 z-10 bg-ink px-3 py-2 text-[0.65rem] text-bone md:left-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                {site.fullName}
              </motion.p>
            </div>
          </div>

          {/* Story */}
          <div className="lg:order-1 lg:col-span-7 lg:pt-[6vw]">
            <Reveal as="p" className="text-[clamp(1.7rem,3.6vw,3.2rem)] font-medium leading-[1.08] tracking-tight">
              I build for the web.
              <br />
              <span className="text-signal">I design for the eye.</span>
            </Reveal>

            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-mute md:mt-10">
              <Reveal as="p" delay={0.05}>
                I&rsquo;m <span className="text-bone">{site.fullName}</span>, a web developer and graphic designer
                currently navigating university life while building my skills, exploring ideas, and turning
                concepts into digital experiences and visual work.
              </Reveal>
              <Reveal as="p" delay={0.1}>
                I enjoy taking an idea and giving it form &mdash; whether that&rsquo;s building a website from the
                ground up or creating a graphic that communicates something at a glance. I&rsquo;m still learning,
                experimenting, and pushing myself to get better with every project.
              </Reveal>
              <Reveal as="p" delay={0.15}>
                Right now, I&rsquo;m open to freelance projects, collaborations, and opportunities to create
                meaningful work.
              </Reveal>
            </div>

            {/* Two disciplines, equal weight */}
            <Reveal className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 md:mt-14">
              {disciplines.map((d) => (
                <div key={d.title} className="group bg-ink p-6 transition-colors duration-300 hover:bg-signal hover:text-ink">
                  <h2 className="display text-2xl md:text-3xl">{d.title}</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-mute transition-colors duration-300 group-hover:text-ink/80">{d.text}</p>
                </div>
              ))}
            </Reveal>

            {/* Details + availability */}
            <Reveal className="mt-12 md:mt-14">
              <dl className="border-t border-line">
                {details.map((d) => (
                  <div key={d.k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4 md:grid-cols-[10rem_1fr]">
                    <dt className="label text-mute">{d.k}</dt>
                    <dd className="flex items-center gap-3 text-bone">
                      {d.dot && (
                        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-[#7ddc7a] opacity-60 motion-safe:animate-ping" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7ddc7a]" />
                        </span>
                      )}
                      {d.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* CTAs + socials */}
            <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
              <a
                href={`mailto:${site.email}`}
                className="group label inline-flex items-center gap-4 bg-signal px-6 py-4 text-ink hover:bg-bone"
              >
                Start a project
                <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="group label inline-flex items-center gap-3 border-b border-bone pb-2 text-bone hover:border-signal hover:text-signal"
              >
                Say hello
                <ArrowDownRight size={16} aria-hidden="true" />
              </a>
              <SocialLinks className="sm:ml-auto" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

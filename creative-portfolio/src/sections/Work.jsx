import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import Gallery from '../components/Gallery'
import Reveal from '../components/Reveal'
import HoverPreview from '../components/HoverPreview'
import { projects } from '../data/projects'
import { posters } from '../data/graphicDesign'
import { ease, stagger } from '../lib/motion'

const filters = [
  { id: 'all', label: 'All Work', count: projects.length + posters.length },
  { id: 'web', label: 'Web Development', count: projects.length },
  { id: 'design', label: 'Graphic Design', count: posters.length },
]

const ALL_VIEW_POSTERS = 8

export default function Work() {
  const [filter, setFilter] = useState('all')
  const [hovered, setHovered] = useState(null)
  const showWeb = filter === 'all' || filter === 'web'
  const showDesign = filter === 'all' || filter === 'design'
  const designList = filter === 'all' ? posters.slice(0, ALL_VIEW_POSTERS) : posters

  return (
    <section id="work" className="overflow-x-clip px-5 py-24 md:px-10 md:py-40" aria-labelledby="work-title">
      <HoverPreview project={hovered} />
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading index="02" label="Selected work" id="work-title">
          Selected<br />
          <span className="outline-text">Work</span>
        </SectionHeading>

        {/* Filters */}
        <div
          role="group"
          aria-label="Filter work by category"
          className="sticky top-[3.6rem] z-40 -mx-5 mb-14 flex flex-wrap gap-2 border-y border-line bg-ink/90 px-5 py-3 backdrop-blur md:-mx-10 md:px-10"
        >
          {filters.map((f) => {
            const on = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.id)}
                className={`label relative px-4 py-3 transition-colors ${on ? 'text-ink' : 'text-bone hover:text-signal'}`}
              >
                {on && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-bone"
                    transition={{ duration: 0.4, ease }}
                  />
                )}
                <span className="relative">
                  {f.label} <sup className={on ? 'text-signal' : 'text-mute'}>{f.count}</sup>
                </span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease }}
          >
            {showWeb && (
              <div aria-label="Web development projects">
                <div className="mb-8 flex items-end justify-between">
                  <h3 className="label text-mute">
                    <span className="text-signal">/</span> Web development — {projects.length} projects
                  </h3>
                </div>
                <motion.div
                  className="grid grid-cols-12 gap-x-6 gap-y-14 md:gap-x-10 md:gap-y-20"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                >
                  {projects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </motion.div>

                {/* Editorial index */}
                <ol className="mt-24 border-t border-line" aria-label="Project index">
                  {projects.map((p) => (
                    <li key={p.id} className="border-b border-line">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="Open"
                        onPointerEnter={() => setHovered(p)}
                        onPointerLeave={() => setHovered(null)}
                        onFocus={() => setHovered(p)}
                        onBlur={() => setHovered(null)}
                        className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 transition-colors hover:text-signal md:grid-cols-[5rem_1fr_1fr_auto] md:gap-8"
                        aria-label={`${p.title} — open live site in a new tab`}
                      >
                        <span className="label text-mute">{p.index}</span>
                        <span className="display text-xl md:text-4xl transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transform-none">
                          {p.title}
                        </span>
                        <span className="label hidden truncate text-mute md:block">
                          {p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </span>
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {showWeb && showDesign && <div className="h-28 md:h-44" aria-hidden="true" />}

            {showDesign && (
              <div aria-label="Graphic design work">
                <div className="mb-8 flex items-end justify-between gap-6">
                  <h3 className="label text-mute">
                    <span className="text-signal">/</span> Graphic design — {posters.length} pieces
                  </h3>
                  <p className="label hidden text-mute md:block">Tap any poster to enlarge</p>
                </div>

                {posters.length === 0 ? (
                  <EmptyGallery />
                ) : (
                  <Gallery posters={designList} />
                )}

                {filter === 'all' && posters.length > ALL_VIEW_POSTERS && (
                  <Reveal className="mt-14 flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setFilter('design')
                        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="group label inline-flex items-center gap-4 border border-bone px-6 py-4 hover:border-signal hover:bg-signal hover:text-ink"
                    >
                      See all {posters.length} designs
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </Reveal>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function EmptyGallery() {
  return (
    <div className="grid place-items-center border border-dashed border-line p-16 text-center">
      <p className="label text-signal">Gallery placeholder</p>
      <p className="mt-4 max-w-md text-mute">
        Add poster images to <code className="font-mono text-bone">src/assets/graphic-design/</code> and they
        will appear here automatically.
      </p>
    </div>
  )
}

import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import PreviewImage from './PreviewImage'
import { riseIn } from '../lib/motion'

export default function ProjectCard({ project }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 18 })
  const sry = useSpring(ry, { stiffness: 180, damping: 18 })

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 9)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 9)
  }
  const onLeave = () => { rx.set(0); ry.set(0) }

  return (
    <motion.article variants={riseIn} className={`group col-span-12 ${project.span}`}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        data-cursor="Open"
        aria-label={`${project.title} — open live site in a new tab`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <motion.div
          ref={ref}
          style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
          className={`relative overflow-hidden border border-line bg-coal transition-shadow duration-300 group-hover:shadow-[12px_12px_0_0_var(--color-signal)] group-focus-visible:shadow-[12px_12px_0_0_var(--color-signal)] ${project.ratio}`}
        >
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <PreviewImage project={project} />
          </div>
          <span className="label absolute bottom-3 left-3 bg-ink px-2 py-1 text-bone">{project.index}</span>
          <span className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center bg-signal text-ink transition-transform duration-300 group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none">
            <ArrowUpRight size={20} aria-hidden="true" />
          </span>
        </motion.div>
        <div className="mt-5 flex flex-col gap-3">
          <div>
            <h3 className="display break-words text-2xl md:text-3xl">
              <span className="bg-gradient-to-r from-signal to-signal bg-[length:0%_2px] bg-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px] group-focus-visible:bg-[length:100%_2px]">
                {project.title}
              </span>
            </h3>
            <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-mute">{project.description}</p>
          </div>
          <span className="label w-fit border border-line px-2 py-1 text-mute">Web Development</span>
        </div>
      </a>
    </motion.article>
  )
}

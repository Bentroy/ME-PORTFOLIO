import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Reveal from './Reveal'

export default function SectionHeading({ index, label, children, id }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-3%'])
  return (
    <div ref={ref} className="mb-12 md:mb-20">
      <Reveal className="label flex items-center gap-4 text-mute">
        <span className="text-signal">{index}</span>
        <span className="h-px w-12 bg-line" aria-hidden="true" />
        <span>{label}</span>
      </Reveal>
      <motion.div style={reduce ? undefined : { x }}>
        <Reveal as="h2" delay={0.08} className="display mt-6 text-[clamp(3rem,15vw,5rem)] sm:text-[clamp(3.5rem,12vw,7rem)] lg:text-[8.5vw] 2xl:text-[10rem]">
          <span id={id}>{children}</span>
        </Reveal>
      </motion.div>
    </div>
  )
}

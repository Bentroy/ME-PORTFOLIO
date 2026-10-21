import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'

// Floating screenshot that follows the mouse while hovering a project in the index list.
export default function HoverPreview({ project }) {
  const [fine, setFine] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28 })
  const sy = useSpring(y, { stiffness: 260, damping: 28 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setFine(true)
    const move = (e) => {
      x.set(Math.min(e.clientX + 32, window.innerWidth - 380))
      y.set(Math.max(16, Math.min(e.clientY - 100, window.innerHeight - 240)))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  if (!fine) return null
  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[80]">
      <motion.div style={{ x: sx, y: sy }}>
        <AnimatePresence>
          {project && (
            <motion.img
              key={project.id}
              src={`/images/web-projects/${project.image}`}
              alt=""
              className="w-[350px] max-w-none border border-line shadow-[10px_10px_0_0_var(--color-signal)]"
              initial={{ opacity: 0, scale: 0.85, rotate: -7 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

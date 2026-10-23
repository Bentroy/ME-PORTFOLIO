import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// Custom cursor follower — mouse devices only. Elements can opt in to a labelled cursor
// with data-cursor="Open" etc. Links and buttons make it grow. The native cursor is kept
// everywhere except over labelled targets.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('')
  const [grow, setGrow] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 520, damping: 38, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 520, damping: 38, mass: 0.4 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor')
    let last = null
    let raf = 0
    const inspect = (t) => {
      if (!(t instanceof Element)) return
      const c = t.closest('[data-cursor]')
      setLabel(c ? c.getAttribute('data-cursor') : '')
      setGrow(!c && !!t.closest('a, button, [role="button"], input, textarea, select'))
    }
    const move = (e) => {
      last = { x: e.clientX, y: e.clientY }
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      inspect(e.target)
    }
    // The page can scroll under a still mouse — re-check what is under the pointer.
    const onScroll = () => {
      if (!last || raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        inspect(document.elementFromPoint(last.x, last.y))
      })
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      document.documentElement.removeEventListener('pointerleave', leave)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null
  const size = label ? 92 : grow ? 48 : 18
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[95]" style={{ x: sx, y: sy }}>
      <motion.div
        className={`-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full ${
          label ? 'bg-signal text-ink' : 'bg-bone mix-blend-difference'
        }`}
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {label && <span className="label text-[0.62rem] font-bold">{label}</span>}
      </motion.div>
    </motion.div>
  )
}

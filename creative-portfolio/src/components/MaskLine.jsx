import { motion } from 'motion/react'
import { maskUp } from '../lib/motion'

// A line of headline text that slides up out of a mask.
export default function MaskLine({ children, className = '', delay = 0 }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        variants={maskUp}
        transition={{ delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

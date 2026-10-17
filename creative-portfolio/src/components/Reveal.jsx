import { motion } from 'motion/react'
import { riseIn, viewport } from '../lib/motion'

// Small scroll-triggered reveal wrapper.
export default function Reveal({ as = 'div', children, className = '', delay = 0 }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      variants={riseIn}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
    >
      {children}
    </Tag>
  )
}

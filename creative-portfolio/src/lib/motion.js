// Shared animation variants
export const ease = [0.22, 1, 0.36, 1]

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export const riseIn = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export const maskUp = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease } },
}

export const viewport = { once: true, margin: '0px 0px -10% 0px' }

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { site } from '../data/site'
import { ease } from '../lib/motion'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="label fixed left-4 top-4 z-[80] -translate-y-20 bg-signal px-3 py-2 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-10"
        >
          <a href="#top" className="display text-xl text-bone md:text-2xl" aria-label={`${site.name} — home`}>
            {site.name}
            <span className="text-signal">.</span>
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {links.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} className="group label flex items-center gap-2 text-bone">
                  <span className="text-signal">0{i + 1}</span>
                  <span className="relative">
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="label flex items-center gap-2 text-bone md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            Menu <Menu size={18} aria-hidden="true" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col bg-ink px-5 py-5"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="flex items-center justify-between">
              <span className="display text-lg">{site.name}<span className="text-signal">.</span></span>
              <button
                type="button"
                className="label flex items-center gap-2"
                onClick={() => setOpen(false)}
                autoFocus
              >
                Close <X size={18} aria-hidden="true" />
              </button>
            </div>
            <ul className="mt-auto mb-10 space-y-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-baseline gap-4 text-[clamp(3rem,17vw,6rem)] sm:text-[clamp(3.5rem,16vw,8rem)]"
                  >
                    <span className="label text-signal">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="label text-mute">{site.location}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ease } from '../lib/motion'

export default function Lightbox({ posters, index, onClose, onIndex }) {
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const poster = posters[index]
  const count = posters.length

  const go = useCallback((dir) => onIndex((index + dir + count) % count), [index, count, onIndex])

  // Focus management, scroll lock, restore focus on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      previouslyFocused?.focus?.()
    }
  }, [])

  // Keyboard: Esc, arrows, Tab trap.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab') {
        const f = dialogRef.current?.querySelectorAll('button:not([disabled])')
        if (!f?.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // Preload neighbours for snappy browsing.
  useEffect(() => {
    ;[-1, 1].forEach((d) => {
      const img = new Image()
      img.src = posters[(index + d + count) % count].src
    })
  }, [index, count, posters])

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${poster.title}, image ${index + 1} of ${count}`}
      className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-10" onClick={(e) => e.stopPropagation()}>
        <p className="label text-mute" aria-live="polite">
          <span className="text-signal">{String(index + 1).padStart(2, '0')}</span> / {String(count).padStart(2, '0')}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="label flex items-center gap-2 border border-line px-3 py-2 hover:border-signal"
          aria-label="Close image viewer"
        >
          Close <X size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); go(-1) }}
          className="absolute left-2 z-10 grid h-12 w-12 place-items-center border border-line bg-ink/70 hover:border-signal md:left-8"
          aria-label="Previous image"
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        <motion.img
          key={poster.id}
          src={poster.src}
          alt={poster.alt}
          className="max-h-full max-w-full cursor-grab object-contain shadow-[0_30px_120px_rgba(0,0,0,0.7)] active:cursor-grabbing"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) go(1)
            else if (info.offset.x > 80) go(-1)
          }}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); go(1) }}
          className="absolute right-2 z-10 grid h-12 w-12 place-items-center border border-line bg-ink/70 hover:border-signal md:right-8"
          aria-label="Next image"
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="px-5 py-5 text-center md:px-10" onClick={(e) => e.stopPropagation()}>
        <p className="display text-xl md:text-2xl">{poster.title}</p>
        {poster.description && <p className="mt-1 text-sm text-mute">{poster.description}</p>}
      </div>
    </motion.div>
  )
}

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import Nav from './components/Nav'
import Grain from './components/Grain'
import Marquee from './components/Marquee'
import Intro from './components/Intro'
import Hero from './sections/Hero'
import Work from './sections/Work'
import About from './sections/About'
import Contact from './sections/Contact'
import { posters } from './data/graphicDesign'

const ticker = ['Frontend Development', 'Graphic Design', 'Poster Design', 'Interfaces', 'Typography', 'Motion']

const INTRO_KEY = 'portfolio-intro-seen'

// The intro plays once per browser session. It is skipped for reduced-motion users,
// when the URL already points at a section (#work, …), or if storage is unavailable.
function shouldPlayIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (window.location.hash) return false
    if (sessionStorage.getItem(INTRO_KEY)) return false
    sessionStorage.setItem(INTRO_KEY, '1')
    return true
  } catch {
    return false
  }
}

export default function App() {
  const [introOpen, setIntroOpen] = useState(shouldPlayIntro)
  // The site mounts as soon as the transition starts, so the hero's own entrance
  // animation plays while the curtain lifts.
  const [siteReady, setSiteReady] = useState(!introOpen)

  const endIntro = useCallback(() => {
    setSiteReady(true)
    setIntroOpen(false)
  }, [])

  // Warm the hero poster images while the intro plays.
  useEffect(() => {
    if (!introOpen) return
    posters
      .filter((p) => ['poster-08.webp', 'poster-01.webp', 'poster-16.webp'].includes(p.id))
      .forEach((p) => { const i = new Image(); i.src = p.src })
  }, [introOpen])

  return (
    // reducedMotion="user" makes Motion respect the OS "reduce motion" setting.
    <MotionConfig reducedMotion="user">
      <Grain />
      <AnimatePresence>{introOpen && <Intro key="intro" onDone={endIntro} />}</AnimatePresence>
      {siteReady && (
        <>
          <Nav />
          <main id="main">
            <Hero />
            <Marquee items={ticker} />
            <Work />
            <About />
            <Contact />
          </main>
        </>
      )}
    </MotionConfig>
  )
}

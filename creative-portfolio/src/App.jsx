import { MotionConfig } from 'motion/react'
import Nav from './components/Nav'
import Grain from './components/Grain'
import Marquee from './components/Marquee'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Introduction from './sections/Introduction'
import Contact from './sections/Contact'

const ticker = ['Frontend Development', 'Graphic Design', 'Poster Design', 'Interfaces', 'Typography', 'Motion']

export default function App() {
  return (
    // reducedMotion="user" makes Motion respect the OS "reduce motion" setting.
    <MotionConfig reducedMotion="user">
      <Grain />
      <Nav />
      <main id="main">
        <Introduction />
        <Hero />
        <Marquee items={ticker} />
        <Work />
        <Contact />
      </main>
    </MotionConfig>
  )
}

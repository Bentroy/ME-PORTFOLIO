import { MotionConfig } from 'motion/react'
import Nav from './components/Nav'
import Grain from './components/Grain'
import Bands from './components/Bands'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Introduction from './sections/Introduction'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Contact from './sections/Contact'

export default function App() {
  return (
    // reducedMotion="user" makes Motion respect the OS "reduce motion" setting.
    <MotionConfig reducedMotion="user">
      <Grain />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main id="main">
        <Introduction />
        <Hero />
        <Bands />
        <Work />
        <Contact />
      </main>
    </MotionConfig>
  )
}

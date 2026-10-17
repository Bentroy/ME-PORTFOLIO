import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import { hasRealEmail, site } from '../data/site'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 pt-24 md:px-10 md:pt-40" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="label flex items-center gap-4 text-mute">
          <span className="text-signal">03</span>
          <span className="h-px w-12 bg-line" aria-hidden="true" />
          <span>Contact</span>
        </Reveal>

        <Reveal as="h2" delay={0.08} className="display mt-6 text-[clamp(3rem,15vw,6rem)] sm:text-[clamp(3.5rem,13vw,9rem)] lg:text-[11vw] 2xl:text-[13rem]">
          <span id="contact-title">
            Let&rsquo;s make<br />
            <span className="outline-text">something</span><br />
            loud<span className="text-signal">.</span>
          </span>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="label text-mute">Start a project / say hello</p>
            {hasRealEmail ? (
              <a
                href={`mailto:${site.email}`}
                className="group mt-4 inline-flex items-center gap-3 break-all font-display text-[clamp(1.5rem,4vw,3.5rem)] font-bold leading-tight hover:text-signal"
              >
                {site.email}
                <ArrowUpRight className="shrink-0 transition-transform group-hover:rotate-45" aria-hidden="true" />
              </a>
            ) : (
              <p className="mt-4 break-all font-display text-[clamp(1.5rem,4vw,3.5rem)] font-bold leading-tight text-bone/60">
                {site.email}
                <span className="label mt-3 block text-signal">
                  Placeholder — set your email in src/data/site.js
                </span>
              </p>
            )}
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="label text-mute">Elsewhere</p>
            <ul className="mt-4 border-t border-line">
              {site.socials.map((s) => (
                <li key={s.label} className="border-b border-line">
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-4 hover:text-signal"
                    >
                      <span className="display text-2xl">{s.label}</span>
                      <ArrowUpRight className="transition-transform group-hover:rotate-45" aria-hidden="true" />
                    </a>
                  ) : (
                    <div className="flex items-center justify-between py-4 text-mute">
                      <span className="display text-2xl">{s.label}</span>
                      <span className="label text-[0.62rem]">Add link in src/data/site.js</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <footer className="mx-auto mt-28 max-w-[1600px] border-t border-line py-8 md:mt-40">
        <div className="label flex flex-col gap-4 text-mute md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Designed &amp; built by hand — React, Tailwind, Motion.</p>
          <motion.a
            href="#top"
            className="w-fit text-bone hover:text-signal"
            whileHover={{ y: -2 }}
          >
            Back to top ↑
          </motion.a>
        </div>
      </footer>
    </section>
  )
}

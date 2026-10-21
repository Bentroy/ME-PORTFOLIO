import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import SocialIcon from '../components/SocialIcon'
import { hasRealEmail, isPlaceholderUrl, site } from '../data/site'

const emailClass =
  'break-all font-display text-[clamp(1.35rem,4.4vw,3.6rem)] font-semibold leading-tight'

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-signal px-5 pt-24 text-ink md:px-10 md:pt-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="label flex items-center gap-4 text-ink/80">
          <span className="font-bold">03</span>
          <span className="h-px w-12 bg-ink/40" aria-hidden="true" />
          <span>Contact</span>
        </Reveal>

        <Reveal as="h2" delay={0.08} className="display mt-6 text-[clamp(2.6rem,13vw,6rem)] sm:text-[clamp(3.5rem,13vw,9rem)] lg:text-[11vw] 2xl:text-[13rem]">
          <span id="contact-title">
            Let&rsquo;s make<br />
            <span className="outline-text text-ink!">something</span><br />
            loud<span className="text-bone">.</span>
          </span>
        </Reveal>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="label text-ink/80">Start a project / say hello</p>
            {hasRealEmail ? (
              <a
                href={`mailto:${site.email}`}
                data-cursor="Write"
                className={`group mt-4 inline-flex items-center gap-3 bg-gradient-to-r from-ink to-ink bg-[length:100%_3px] bg-bottom bg-no-repeat pb-2 transition-[background-size,color,padding] duration-300 hover:bg-[length:100%_100%] hover:px-4 hover:pt-2 hover:text-signal focus-visible:bg-[length:100%_100%] focus-visible:px-4 focus-visible:text-signal ${emailClass}`}
              >
                {site.email}
                <ArrowUpRight className="shrink-0 transition-transform group-hover:rotate-45" aria-hidden="true" />
              </a>
            ) : (
              <p className={`mt-4 ${emailClass}`}>{site.email}</p>
            )}
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="label text-ink/80">Elsewhere</p>
            <ul className="mt-4 border-t border-ink/30">
              {site.socials.map((s) => (
                <li key={s.id} className="border-b border-ink/30">
                  {!isPlaceholderUrl(s.url) ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-4 transition-all duration-300 hover:bg-ink hover:px-4 hover:text-signal focus-visible:bg-ink focus-visible:px-4 focus-visible:text-signal"
                    >
                      <span className="flex items-center gap-4">
                        <SocialIcon id={s.id} size={22} />
                        <span className="display text-2xl">{s.label}</span>
                      </span>
                      <ArrowUpRight className="transition-transform group-hover:rotate-45" aria-hidden="true" />
                    </a>
                  ) : (
                    <div className="flex items-center justify-between py-4 text-ink/60">
                      <span className="flex items-center gap-4">
                        <SocialIcon id={s.id} size={22} />
                        <span className="display text-2xl">{s.label}</span>
                      </span>
                      <span className="label hidden text-[0.62rem] sm:inline">Add link in src/data/site.js</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <footer className="mx-auto mt-24 max-w-[1600px] md:mt-36">
        <div className="label flex flex-col gap-4 border-t border-ink/30 pt-6 text-ink/80 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <p>Designed &amp; built by hand — React, Tailwind, Motion.</p>
          <motion.a href="#top" className="w-fit font-bold text-ink hover:underline" whileHover={{ y: -2 }}>
            Back to top ↑
          </motion.a>
        </div>
        {/* giant wordmark, cropped by the page edge */}
        <p
          aria-hidden="true"
          className="display pointer-events-none mt-10 translate-y-[14%] select-none text-center text-[30vw] leading-[0.78] text-ink"
        >
          BENJY
        </p>
      </footer>
    </section>
  )
}

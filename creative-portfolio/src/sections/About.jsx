import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { site } from '../data/site'

// ✎ Edit the copy below. Items in [BRACKETS] are placeholders for you to replace.
const details = [
  { k: 'Name', v: site.fullName },
  { k: 'Based in', v: site.location },
  { k: 'Disciplines', v: 'Frontend development, graphic design, poster design' },
  { k: 'Currently', v: '[YOUR AVAILABILITY — e.g. open to freelance projects]' },
]

export default function About() {
  return (
    <section id="about" className="border-t border-line bg-coal px-5 py-24 md:px-10 md:py-40" aria-labelledby="about-title">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading index="02" label="About" id="about-title">
          Two crafts.<br />
          <span className="outline-text">One eye.</span>
        </SectionHeading>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal as="p" className="text-[clamp(1.6rem,3.4vw,3.1rem)] font-medium leading-[1.1] tracking-tight">
              I&rsquo;m a multidisciplinary creative working across <span className="text-signal">frontend development</span> and{' '}
              <span className="text-signal">graphic design</span>.
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-8 max-w-2xl text-lg leading-relaxed text-mute">
              I like the moment where a layout, a line of type and a bit of motion click into place &mdash;
              whether that&rsquo;s inside a browser or on a poster. I design the thing, then I build it, so
              nothing gets lost in translation.
            </Reveal>
            <Reveal as="p" delay={0.18} className="mt-5 max-w-2xl text-lg leading-relaxed text-mute">
              If you need a site with personality, a poster with presence, or both working together,
              let&rsquo;s talk.
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <dl className="border-t border-line">
              {details.map((d) => (
                <div key={d.k} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-5 md:grid-cols-[9rem_1fr]">
                  <dt className="label text-mute">{d.k}</dt>
                  <dd className="text-bone">{d.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

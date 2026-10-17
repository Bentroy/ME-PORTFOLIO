import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import PreviewImage from './PreviewImage'
import { riseIn } from '../lib/motion'

export default function ProjectCard({ project }) {
  return (
    <motion.article variants={riseIn} className={`group col-span-12 ${project.span}`}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`${project.title} — open live site in a new tab`}
      >
        <div className={`relative overflow-hidden border border-line bg-coal ${project.ratio}`}>
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <PreviewImage project={project} />
          </div>
          <span className="label absolute left-3 top-3 bg-ink px-2 py-1 text-bone">{project.index}</span>
          <span className="absolute right-3 top-3 grid h-11 w-11 place-items-center bg-signal text-ink transition-transform duration-300 group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none">
            <ArrowUpRight size={20} aria-hidden="true" />
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <div>
            <h3 className="display break-words text-2xl md:text-3xl">
              <span className="bg-gradient-to-r from-signal to-signal bg-[length:0%_2px] bg-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px] group-focus-visible:bg-[length:100%_2px]">
                {project.title}
              </span>
            </h3>
            <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-mute">{project.description}</p>
          </div>
          <span className="label w-fit border border-line px-2 py-1 text-mute">Web Development</span>
        </div>
      </a>
    </motion.article>
  )
}

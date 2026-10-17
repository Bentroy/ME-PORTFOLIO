import { useState } from 'react'

// Shows /public/images/web-projects/<image>. If the file is missing, shows an
// intentional, clearly-labelled placeholder (never fake stock imagery).
export default function PreviewImage({ project }) {
  const [failed, setFailed] = useState(false)
  const host = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  if (!failed) {
    return (
      <img
        src={`/images/web-projects/${project.image}`}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-top"
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`Preview placeholder for ${project.title}. Add a screenshot at public/images/web-projects/${project.image}`}
      className="relative flex h-full w-full flex-col bg-ash"
      style={{
        backgroundImage:
          'linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-coal px-3 py-2">
        <i className="h-2 w-2 bg-line" /><i className="h-2 w-2 bg-line" /><i className="h-2 w-2 bg-signal" />
        <span className="label ml-3 truncate text-[0.6rem] text-mute">{host}</span>
      </div>
      <div className="flex flex-1 flex-col items-start justify-end gap-3 p-5 md:p-7">
        <span className="label bg-signal px-2 py-1 text-[0.6rem] text-ink">Preview placeholder</span>
        <span className="display max-w-full break-words text-[clamp(1.5rem,3vw,2.8rem)] leading-[0.95] text-bone/90">{project.title}</span>
        <span className="label text-[0.6rem] text-mute break-all">
          Add: public/images/web-projects/{project.image}
        </span>
      </div>
    </div>
  )
}

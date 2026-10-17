// ─────────────────────────────────────────────────────────────
//  GRAPHIC DESIGN GALLERY
//
//  HOW IT WORKS
//  Every image dropped into  src/assets/graphic-design/  appears in the
//  gallery automatically (.webp .jpg .jpeg .png .avif). Aspect ratios are
//  preserved — nothing is cropped. Images are ordered by file name.
//
//  OPTIONAL METADATA
//  To give a poster a proper title / description, add an entry to `meta`
//  below keyed by its file name. Images without an entry still appear,
//  using a title generated from the file name.
// ─────────────────────────────────────────────────────────────
const modules = import.meta.glob('../assets/graphic-design/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  import: 'default',
})

export const meta = {
  'poster-01.webp': { title: 'Online Bible Studies', description: 'Weekly online event flyer.' },
  'poster-02.webp': { title: 'Now Ministering — Chika Moses', description: 'Speaker feature graphic for a teens camp.' },
  'poster-03.webp': { title: 'Communion Service', description: 'Service announcement flyer.' },
  'poster-04.webp': { title: 'Crossover Service', description: 'Event flyer for a year-end service.' },
  'poster-05.webp': { title: 'Livestream — Day 1', description: 'Livestream banner for a teens camp.' },
  'poster-06.webp': { title: 'Study Motivation', description: 'Quote post on a textured paper background.' },
  'poster-07.webp': { title: 'Hark the Herald', description: 'Typographic seasonal banner.' },
  'poster-08.webp': { title: 'The Promised Land', description: 'Coming-soon event flyer.' },
  'poster-09.webp': { title: 'Give Away Alert', description: 'Promotional giveaway graphic.' },
  'poster-10.webp': { title: 'Upcoming Events — October', description: 'Multi-event announcement flyer.' },
  'poster-11.webp': { title: 'No Bondage', description: 'Illustrated scripture-themed banner.' },
  'poster-12.webp': { title: 'Quality Gadgets, Best Prices', description: 'Product promotion flyer.' },
  'poster-13.webp': { title: 'Holy Spirit', description: 'Worship cover art.' },
  'poster-14.webp': { title: 'Esé', description: 'Worship cover art.' },
  'poster-15.webp': { title: 'Upcoming Events — June', description: 'Event schedule flyer.' },
  'poster-16.webp': { title: 'Easter Youth Program', description: 'Youth event flyer.' },
}

const prettify = (file) =>
  file
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

export const posters = Object.entries(modules)
  .map(([path, src]) => {
    const file = path.split('/').pop()
    const m = meta[file] ?? {}
    return {
      id: file,
      src,
      title: m.title ?? prettify(file),
      description: m.description ?? '',
      alt: m.alt ?? `${m.title ?? prettify(file)} — graphic design poster${m.description ? `. ${m.description}` : ''}`,
    }
  })
  .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))

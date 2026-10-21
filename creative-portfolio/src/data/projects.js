// ─────────────────────────────────────────────────────────────
//  WEB PROJECTS — add, remove or reorder entries freely.
//  `image`: file name inside /public/images/web-projects/
//  (e.g. 'chidextech.jpg'). If the file is missing, a clearly
//  labelled replaceable placeholder is shown instead.
//  `span` / `ratio`: layout hints for the asymmetric grid.
// ─────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 'chidextech',
    index: '01',
    title: 'ChidexTech Water Treatment',
    category: 'web',
    description: 'A business website for a water treatment company.',
    url: 'https://chidextech-water-treatment.vercel.app/',
    image: 'chidextech.jpg',
    span: 'lg:col-span-7',
    ratio: 'aspect-[16/10]',
  },
  {
    id: 'gfsteel',
    index: '02',
    title: 'G.F Steel',
    category: 'web',
    description: 'A website for a steel and industrial business.',
    url: 'https://gfsteel.vercel.app/',
    image: 'gfsteel.jpg',
    span: 'lg:col-span-5 lg:mt-24',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'cove',
    index: '03',
    title: 'Cove Associates',
    category: 'web',
    description: 'A professional services website.',
    url: 'https://coveassociates.vercel.app/',
    image: 'cove-associates.jpg',
    span: 'lg:col-span-5',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'recherche',
    index: '04',
    title: 'Recherche Events',
    category: 'web',
    description: 'An events-focused website.',
    url: 'https://rechercheevents.vercel.app/',
    image: 'recherche-events.jpg',
    span: 'lg:col-span-7 lg:mt-16',
    ratio: 'aspect-[16/10]',
  },
  {
    id: 'rackcentre',
    index: '05',
    title: 'Rack Centre Incident Logger',
    category: 'web',
    description: 'A web application demo for incident logging.',
    url: 'https://rackcentre-incident-logger-demo.vercel.app/',
    image: 'rackcentre-incident-logger.jpg',
    span: 'lg:col-span-7',
    ratio: 'aspect-[16/10]',
  },
  {
    id: 'playin',
    index: '06',
    title: 'Playin Architecture',
    category: 'web',
    description: 'An architecture-focused website.',
    url: 'https://playinarchitecture.vercel.app/',
    image: 'playin-architecture.jpg',
    span: 'lg:col-span-5 lg:mt-20',
    ratio: 'aspect-[4/3]',
  },
]

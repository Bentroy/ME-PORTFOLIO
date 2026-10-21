// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS — name, email, location and social links.
//  Everything here is used across the whole site.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: 'BENJY',
  fullName: 'Owuzechi David Benjamin',
  email: 'workwithbenjy@gmail.com',
  location: 'Nigeria',

  // ── SOCIAL LINKS ──────────────────────────────────────────
  // Replace each placeholder URL with your real one. While a URL still
  // contains "YOUR", the icon shows as a dimmed, non-clickable placeholder.
  // WhatsApp format: https://wa.me/<country code + number, digits only>
  //   e.g. https://wa.me/2348012345678
  socials: [
    { id: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/YOUR_NUMBER_WITH_COUNTRY_CODE' },
    { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/YOUR_USERNAME' },
    { id: 'github', label: 'GitHub', url: 'https://github.com/YOUR_USERNAME' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/YOUR_USERNAME' },
    { id: 'x', label: 'X', url: 'https://x.com/YOUR_USERNAME' },
  ],
}

export const hasRealEmail = !/YOUR/i.test(site.email)
export const isPlaceholderUrl = (url) => !url || /YOUR/i.test(url)

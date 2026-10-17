// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS — edit your name, email and social links here.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: 'BENJY',
  fullName: 'Owuzechi David Benjamin',
  // Replace with your real address, e.g. 'hello@yourdomain.com'.
  // While it still contains "YOUR", the mailto link is shown as a placeholder.
  email: 'hello@YOUR-DOMAIN.com',
  // Set `url` to a real address to activate a link. Leave '' to show it as a placeholder.
  socials: [
    { label: 'Instagram', url: '' },
    { label: 'Behance', url: '' },
    { label: 'GitHub', url: '' },
    { label: 'LinkedIn', url: '' },
  ],
  location: '[YOUR LOCATION]',
}

export const hasRealEmail = !/YOUR/i.test(site.email)

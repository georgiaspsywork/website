// Site-wide details. Edit here and every page picks them up.
export const site = {
  name: "Georgia's PsyWork",
  author: 'Georgia Hodkinson GMBPsS',
  authorShort: 'Georgia Hodkinson',
  email: 'Georgia@georgiaspsywork.com',
  phone: '+44 7507 627754',
  location: 'Leicestershire, United Kingdom',
  calendly: 'https://calendly.com/georgiaspsywork/30min',
  elsewhere: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'TikTok', href: '#' },
  ],
};

// Header navigation, left to right. The page you are on gets an underline automatically.
// `cta` keeps an item in the brighter text colour (used for Contact).
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/resources' },
  { label: 'Articles', href: '/articles' },
  { label: 'Contact', href: '/contact', cta: true },
];

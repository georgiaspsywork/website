// Site-wide details. Edit here and every page picks them up.
export const site = {
  name: "Georgia's PsyWork",
  author: 'Georgia Hodkinson GMBPsS',
  authorShort: 'Georgia Hodkinson',
  email: 'Georgia@georgiaspsywork.com',
  phone: '+44 7507 627754',
  location: 'Leicestershire, United Kingdom',
  elsewhere: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'TikTok', href: '#' },
  ],
};

// Header navigation. `cta` renders the underlined call-to-action style.
export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/resources' },
  { label: 'Articles', href: '/articles' },
  { label: 'Contact', href: '/contact', cta: true },
];

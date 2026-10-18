// People Insights Exchange (PIE) page: everything that changes lives here, so the page itself never needs redesigning.
//
// When PIE launches its own website, change `cta` below to point at it (for example
// { label: 'Visit the PIE website', href: pie.website.url }) and set `website.live` to true to show the extra link.

export const pie = {
  name: 'People Insights Exchange',
  tagline: 'Practical learning. Useful conversations. Local connections.',
  venue: 'Bingham Arena, Bingham, Nottinghamshire',
  usualDay: 'Usually the first working Friday of each month',
  time: '10:30am to 12:00pm',
  email: 'admin@peopleinsightsexchange.com',
  instagram: 'https://www.instagram.com/peopleinsightsexchange/',
  linkedin: 'https://www.linkedin.com/company/people-insights-exchange/',
  sponsor: 'https://peoplinsightsexchange.zoholandingpage.eu/Sponsor/',
  eventbrite: 'https://www.eventbrite.co.uk/o/121704880076',
  website: { url: 'https://peopleinsightsexchange.com', live: false },
  /** The main booking button, used in the events section and at the bottom of the page. */
  cta: { label: 'Book your place on Eventbrite', href: 'https://www.eventbrite.co.uk/e/2002732305237?aff=oddtdtcreator' },
};

export interface PieEvent {
  month: string;
  theme: string;
  /** Only set for dates that are confirmed. */
  date?: string;
  blurb?: string;
}

/** Confirmed events. */
export const first: PieEvent = { month: 'October 2026', theme: 'ADHD Awareness at Work', date: 'Friday 2 October 2026' };
export const next: PieEvent = { month: 'November 2026', theme: 'Stress at Work', date: 'Friday 6 November 2026' };

/** The next few themes, shown on the page. */
export const soon: PieEvent[] = [
  { month: 'December 2026', theme: 'Recharge & Reflect', blurb: 'Year-end pressure, reflection, recovery and how to approach the new year with renewed capacity.' },
  { month: 'January 2027', theme: 'Doing More With Less', blurb: 'Workload, capacity, competing priorities and sustainable performance.' },
  { month: 'February 2027', theme: 'Conversations That Count', blurb: 'Building confidence in workplace conversations, feedback, listening and accountability.' },
];

/** The rest of the programme, in a "see the full programme" panel. */
export const later: PieEvent[] = [
  { month: 'March 2027', theme: 'Closing the Fairness Gap', blurb: 'Fairness, inclusion, bias and better people decisions.' },
  { month: 'April 2027', theme: 'Working Smarter with Sustainable Performance', blurb: 'Rethinking workload, work design and the relationship between wellbeing and performance.' },
  { month: 'May 2027', theme: 'Creating Workplaces People Want to Stay In', blurb: 'Employee engagement, belonging, retention and workplace experience.' },
  { month: 'June 2027', theme: 'Managing Fatigue, Energy & Recovery', blurb: 'How fatigue affects performance, judgement, safety and recovery.' },
  { month: 'July 2027', theme: 'Making Smarter Decisions with AI', blurb: 'AI adoption, trust, human judgement and decision-making at work.' },
  { month: 'August 2027', theme: 'Collaboration, Clarity & Performance', blurb: 'Improving team effectiveness, communication, coordination and ways of working.' },
  { month: 'September 2027', theme: 'Empowering Managers', blurb: 'Supporting managers with confidence, leadership, expectations and competing demands.' },
  { month: 'October 2027', theme: 'Leading People Through Change', blurb: 'The human experience of organisational change.' },
];

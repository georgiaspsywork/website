// People Insights Exchange (PIE) page: everything that changes lives here, so the page itself never needs redesigning.
//
// When PIE launches its own website, change `cta` below to point at it (for example
// { label: 'Visit the PIE website', href: pie.website.url }) and set `website.live` to true to show the extra link.

export const pie = {
  name: 'People Insights Exchange',
  tagline: 'Practical learning. Useful conversations. Local connections.',
  venue: 'Bingham Arena, Bingham, Nottinghamshire',
  usualDay: 'Usually the first Friday of each month',
  time: '10:30am to 12:00pm',
  email: 'admin@peopleinsightsexchange.com',
  instagram: 'https://www.instagram.com/peopleinsightsexchange/',
  linkedin: 'https://www.linkedin.com/company/people-insights-exchange/',
  sponsor: 'https://peoplinsightsexchange.zoholandingpage.eu/Sponsor/',
  /** Georgia and Beth's Eventbrite page: always lists whichever event is open for booking. */
  eventbrite: 'https://www.eventbrite.co.uk/o/121704880076',
  website: { url: 'https://peopleinsightsexchange.com', live: false },
  /** The main booking button, used in the events section and at the bottom of the page. */
  cta: { label: 'Book your place on Eventbrite', href: 'https://www.eventbrite.co.uk/o/121704880076' },
};

export interface PieEvent {
  /** Shown when there is no confirmed date yet, e.g. "April 2027". */
  month: string;
  theme: string;
  /** The confirmed date as YYYY-MM-DD. Leave out until the date is fixed. */
  iso?: string;
  /** This event's own Eventbrite page, once it exists. Until then the booking button goes to `pie.eventbrite`. */
  href?: string;
  blurb?: string;
}

/** "Friday 11 December 2026" from "2026-12-11". */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T12:00:00Z`)).replace(',', '');
}

/** The first event, mentioned in the text of the page. */
export const first: PieEvent = { month: 'October 2026', theme: 'ADHD Awareness at Work', iso: '2026-10-02' };

/**
 * The programme, in date order. The page works out which event is next from today's date, so past events drop off
 * by themselves: you never need to edit the page each month. To confirm a date, add `iso: 'YYYY-MM-DD'`;
 * to link an event's own Eventbrite page, add `href`. Themes and descriptions can be changed here at any time.
 */
export const programme: PieEvent[] = [
  { month: 'November 2026', iso: '2026-11-06', theme: 'Stress at Work' },
  { month: 'December 2026', iso: '2026-12-11', theme: 'Recharge & Reflect', blurb: 'Year-end pressure, reflection, recovery and how to approach the new year with renewed capacity.' },
  { month: 'January 2027', iso: '2027-01-08', theme: 'Doing More With Less', blurb: 'Workload, capacity, competing priorities and sustainable performance.' },
  { month: 'February 2027', iso: '2027-02-05', theme: 'Conversations That Count', blurb: 'Building confidence in workplace conversations, feedback, listening and accountability.' },
  { month: 'March 2027', iso: '2027-03-05', theme: 'Closing the Fairness Gap', blurb: 'Fairness, inclusion, bias and better people decisions.' },
  { month: 'April 2027', theme: 'Working Smarter with Sustainable Performance', blurb: 'Rethinking workload, work design and the relationship between wellbeing and performance.' },
  { month: 'May 2027', theme: 'Creating Workplaces People Want to Stay In', blurb: 'Employee engagement, belonging, retention and workplace experience.' },
  { month: 'June 2027', theme: 'Managing Fatigue, Energy & Recovery', blurb: 'How fatigue affects performance, judgement, safety and recovery.' },
  { month: 'July 2027', theme: 'Making Smarter Decisions with AI', blurb: 'AI adoption, trust, human judgement and decision-making at work.' },
  { month: 'August 2027', theme: 'Collaboration, Clarity & Performance', blurb: 'Improving team effectiveness, communication, coordination and ways of working.' },
  { month: 'September 2027', theme: 'Empowering Managers', blurb: 'Supporting managers with confidence, leadership, expectations and competing demands.' },
  { month: 'October 2027', theme: 'Leading People Through Change', blurb: 'The human experience of organisational change.' },
];

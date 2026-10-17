// Shared by the home-page widgets: runs at build time (first render) and in the browser (interaction).

/** Illustrative alertness through the day, 00:00–23:00 (0–1). */
export const ALERT = [.45, .35, .25, .18, .15, .18, .3, .5, .68, .8, .88, .9, .85, .72, .62, .65, .75, .85, .9, .88, .8, .7, .6, .52];

export const pad = (n: number) => String(n).padStart(2, '0');

/** Bar height in px for an alertness value. */
export const barHeight = (v: number) => Math.round(30 + v * 180);

export function phaseFor(hour: number): [title: string, line: string] {
  if (hour >= 2 && hour <= 5) return ['The circadian low', 'Injury risk is about 36% higher on night shifts than on mornings, and about 36% higher by the fourth night in a block than on the first (Fischer et al., 2017).'];
  if (hour === 6 || hour === 7) return ['Handover', 'Tired people briefing people who have just woken up, often after a short changeover.'];
  if (hour >= 8 && hour <= 12) return ['Day shift, sharpest', 'Most decisions about rotas, overtime and cover get made in these hours, by people who are wide awake.'];
  if (hour >= 13 && hour <= 15) return ['The afternoon dip', 'A smaller drop, landing on earlies finishing and lates starting.'];
  if (hour >= 16 && hour <= 21) return ['Lates', 'Cover requests come in now, and they usually go to the same few willing people.'];
  return ['Nights begin', 'For many on the night shift, the working day starts after most of a day already awake.'];
}

/** Hours-awake slider: what that many hours without sleep is comparable to (Dawson & Reid, Nature, 1997). */
export function awakeLine(hours: number): string {
  if (hours >= 24) return 'Performance comparable to a blood alcohol level of about 0.10%, above the drink-drive limit in England and Wales.';
  if (hours >= 17) return 'Performance comparable to a blood alcohol level of about 0.05%, the drink-drive limit in Scotland.';
  return 'Impairment builds the longer someone is awake. In this research it reached the level of the drink-drive limit in Scotland (0.05%) at about 17 hours.';
}

/** Clock time after waking at `wokeAt` and being awake for `hours`. */
export const clockAfter = (wokeAt: number, hours: number) => `${pad((wokeAt + hours) % 24)}:00`;

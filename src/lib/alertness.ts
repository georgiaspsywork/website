// Shared by the home-page widgets: runs at build time (first render) and in the browser (interaction).

/**
 * Illustrative alertness through the day, 00:00–23:00 (0–1). Not measured data. The shape follows the cited research:
 * lowest around 03:00, a fairly steady daytime with no marked afternoon dip, and an evening peak around 19:00
 * (Galy et al., 2008; Van Dongen & Dinges, 2000).
 */
export const ALERT = [.4, .3, .22, .15, .17, .25, .4, .58, .68, .72, .74, .75, .75, .74, .74, .76, .8, .84, .88, .9, .88, .82, .72, .58];

export const pad = (n: number) => String(n).padStart(2, '0');

/** Bar height in px for an alertness value. */
export const barHeight = (v: number) => Math.round(30 + v * 180);

export function phaseFor(hour: number): [title: string, line: string] {
  if (hour >= 2 && hour <= 5) return ['The circadian low', 'Shift workers rated themselves least alert and responded slowest at 03:00 (Galy et al., 2008). Injury risk is about 36% higher on night shifts than on mornings (Fischer et al., 2017).'];
  if (hour === 6 || hour === 7) return ['Handover', 'In critical care nurses, acute and chronic fatigue predicted poorer handover quality, and nurses named standardised handover tools as a help (Abou Hashish et al., 2023). Recall at 07:00 and 11:00 was better for information processed in depth (Galy et al., 2008).'];
  if (hour >= 8 && hour <= 15) return ['The working day, steady', 'The body clock and time awake pull in opposite directions, so alertness and performance stay fairly level through the waking day. Sleepiness can rise after lunch, but there is little consistent evidence of a dip in performance (Van Dongen & Dinges, 2000).'];
  if (hour >= 16 && hour <= 21) return ['The evening peak', 'Self-rated alertness in shift workers peaked at 19:00 (Galy et al., 2008).'];
  return ['Nights begin', 'The body clock and time awake combine: the longer someone has been awake, the lower their predicted alertness (Åkerstedt et al., 2004).'];
}

/** Hours-awake slider: what that many hours without sleep is comparable to (Dawson & Reid, Nature, 1997). */
export function awakeLine(hours: number): string {
  if (hours >= 24) return 'Performance comparable to a blood alcohol level of about 0.10%, above the drink-drive limit in England and Wales.';
  if (hours >= 17) return 'Performance at or beyond the level of a 0.05% blood alcohol concentration, the drink-drive limit in Scotland, and heading towards 0.10% at 24 hours.';
  return 'Impairment builds the longer someone is awake. In this research it reached the level of the drink-drive limit in Scotland (0.05%) at about 17 hours.';
}

/** Clock time after waking at `wokeAt` and being awake for `hours`. */
export const clockAfter = (wokeAt: number, hours: number) => `${pad((wokeAt + hours) % 24)}:00`;

// Shared by the hours-awake slider: runs at build time (first render) and in the browser (interaction).

export const pad = (n: number) => String(n).padStart(2, '0');

/** Hours-awake slider: what that many hours without sleep is comparable to (Dawson & Reid, Nature, 1997). */
export function awakeLine(hours: number): string {
  if (hours >= 24) return 'Performance comparable to a blood alcohol level of about 0.10%, above the drink-drive limit in England and Wales.';
  if (hours >= 17) return 'Performance at or beyond the level of a 0.05% blood alcohol concentration, the drink-drive limit in Scotland, and heading towards 0.10% at 24 hours.';
  return 'Impairment builds the longer someone is awake. In this research it reached the level of the drink-drive limit in Scotland (0.05%) at about 17 hours.';
}

/** Clock time after waking at `wokeAt` and being awake for `hours`. */
export const clockAfter = (wokeAt: number, hours: number) => `${pad((wokeAt + hours) % 24)}:00`;

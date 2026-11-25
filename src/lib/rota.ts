// Rota fatigue builder: data and rules. Imported by RotaBuilder.astro's <script> in the browser.
// Every day holds its own start and end time, so 8-hour, 12-hour, 16-hour, 9-5 and on-call patterns all work.
// Thresholds match the "Rota red flags" check: under 11 hours between shifts, more than three nights in a row,
// more than five days without rest, shifts over 12 hours, 55 or more hours in a week.

export type Kind = 'off' | 'work' | 'call';
export interface Cell {
  kind: Kind;
  /** Start time in hours from midnight, e.g. 6.5 = 06:30. Kept when the day is set to Off. */
  s: number;
  /** End time in hours from midnight. If it is not later than the start, the shift finishes the next day. */
  e: number;
}
export interface Crew {
  name: string;
  days: Cell[];
}
export type Level = 'High' | 'Watch' | 'Low';
/** How a cell is coloured. */
export type Look = 'off' | 'early' | 'late' | 'night' | 'call';

export interface Analysis {
  /** The flags raised on each day (empty array when nothing is flagged). */
  flags: string[][];
  /** 0 to 10. */
  score: number;
  /** Hours worked in the week, on-call included. */
  hours: number;
}
export interface RowState extends Analysis {
  level: Level;
  /** Load bar width, 0 to 100. */
  pct: number;
}
export interface Finding {
  who: string;
  what: string;
}

export const MAX_FINDINGS = 8;
export const MAX_CREWS = 8;
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Thresholds (the same ones as the Rota red flags check).
export const MIN_REST = 11;
export const MAX_SHIFT = 12;
export const MAX_NIGHTS = 3;
export const MAX_DAYS = 5;
export const WEEK_HOURS = 55;

export const PRESETS: { label: string; s: number; e: number }[] = [
  { label: 'Early 06–14', s: 6, e: 14 },
  { label: 'Late 14–22', s: 14, e: 22 },
  { label: 'Night 22–06', s: 22, e: 6 },
  { label: '9–5', s: 9, e: 17 },
  { label: '12h day 07–19', s: 7, e: 19 },
  { label: '12h night 19–07', s: 19, e: 7 },
  { label: '16h 06–22', s: 6, e: 22 },
];

const off = (): Cell => ({ kind: 'off', s: 9, e: 17 });
const early = (): Cell => ({ kind: 'work', s: 6, e: 14 });
const late = (): Cell => ({ kind: 'work', s: 14, e: 22 });
const night = (): Cell => ({ kind: 'work', s: 22, e: 6 });
const KEY: Record<string, () => Cell> = { '-': off, E: early, L: late, N: night };

/** The example week: four crews, seven days. */
export function exampleRota(): Crew[] {
  return [
    ['Crew A', 'EELLNN-'],
    ['Crew B', 'NNNN--E'],
    ['Crew C', 'LLE-NNN'],
    ['Crew D', '--EEEEE'],
  ].map(([name, pattern]) => ({ name, days: pattern.split('').map((c) => KEY[c]()) }));
}

export function blankCrew(name: string): Crew {
  return { name, days: Array.from({ length: 7 }, off) };
}

/** Length of a shift in hours. A shift that ends at or before its start finishes the next day. */
export function length(cell: Cell): number {
  const len = cell.e - cell.s;
  return len > 0 ? len : len + 24;
}

/** "06", or "06:30" when it is not on the hour. */
export function clock(h: number): string {
  const total = Math.round(h * 60) % 1440;
  const hh = String(Math.floor(total / 60)).padStart(2, '0');
  const mm = total % 60;
  return mm ? `${hh}:${String(mm).padStart(2, '0')}` : hh;
}

/** "06–14". */
export function span(cell: Cell): string {
  return `${clock(cell.s)}–${clock(cell.e)}`;
}

/** "8h", "7.5h". */
export function hoursLabel(h: number): string {
  return `${Math.round(h * 10) / 10}h`;
}

/** A shift counts as a night when at least three of its hours fall between 22:00 and 06:00. */
export function isNight(cell: Cell): boolean {
  const start = cell.s;
  const end = cell.s + length(cell);
  return [[-2, 6], [22, 30], [46, 54]].some(([a, b]) => Math.min(end, b) - Math.max(start, a) >= 3);
}

export function look(cell: Cell): Look {
  if (cell.kind === 'off') return 'off';
  if (cell.kind === 'call') return 'call';
  if (isNight(cell)) return 'night';
  return cell.s < 12 ? 'early' : 'late';
}

export function analyse(row: Cell[]): Analysis {
  const flags: string[][] = Array.from({ length: 7 }, () => []);
  let nightsRun = 0;
  let workRun = 0;
  let nights = 0;
  let weekHours = 0;
  let weekFlagged = false;
  for (let d = 0; d < 7; d++) {
    const c = row[d];
    if (c.kind === 'off') {
      nightsRun = 0;
      workRun = 0;
      continue;
    }
    const len = length(c);
    workRun++;
    weekHours += len;
    if (isNight(c)) {
      nightsRun++;
      nights++;
    } else {
      nightsRun = 0;
    }

    const p = d > 0 ? row[d - 1] : null;
    let returned = false;
    if (p && p.kind !== 'off') {
      const gap = d * 24 + c.s - ((d - 1) * 24 + p.s + length(p));
      if (gap < MIN_REST) {
        flags[d].push(`Quick return: ${hoursLabel(Math.max(0, gap))} rest`);
        returned = true;
      }
      if (!returned && p.s - c.s >= 5) flags[d].push('Backward rotation');
    }
    if (len > MAX_SHIFT) flags[d].push(`Long shift: ${hoursLabel(len)}`);
    if (nightsRun > MAX_NIGHTS) flags[d].push(`Night ${nightsRun} in a row`);
    if (workRun > MAX_DAYS) flags[d].push(`${workRun} days without rest`);
    if (!weekFlagged && weekHours >= WEEK_HOURS) {
      flags[d].push(`${hoursLabel(weekHours)} this week`);
      weekFlagged = true;
    }
  }
  const flagged = flags.reduce((n, f) => n + f.length, 0);
  return { flags, score: Math.min(10, flagged * 2.5 + nights * 0.6), hours: weekHours };
}

export function levelFor(score: number): Level {
  return score >= 6 ? 'High' : score >= 3 ? 'Watch' : 'Low';
}

export function analyseRota(rota: Crew[]): RowState[] {
  return rota.map((crew) => {
    const a = analyse(crew.days);
    return { ...a, level: levelFor(a.score), pct: Math.round(a.score * 10) };
  });
}

/** Every flag in the rota, as "Crew A, Sat" plus its message, in rota order. */
export function findingsFor(rota: Crew[], analysed: RowState[] = analyseRota(rota)): Finding[] {
  const findings: Finding[] = [];
  analysed.forEach((state, ri) => {
    state.flags.forEach((day, d) => {
      day.forEach((what) => findings.push({ who: `${rota[ri].name || `Crew ${ri + 1}`}, ${DAYS[d]}`, what }));
    });
  });
  return findings;
}

export function flagCountLabel(total: number): string {
  return `${total} ${total === 1 ? 'flag' : 'flags'}`;
}

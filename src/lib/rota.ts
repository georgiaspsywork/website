// Rota fatigue builder: data and rules. Imported by RotaBuilder.astro at build time (initial HTML)
// and by its <script> in the browser, so both always agree.

export type Shift = 'E' | 'L' | 'N' | '-';
export type Row = Shift[];
export type Level = 'High' | 'Watch' | 'Low';

export interface Analysis {
  /** One message per day ('' when nothing is flagged on that day). */
  flags: string[];
  /** 0 to 10. */
  score: number;
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

export interface FindingsSummary {
  /** Total number of flags across the whole rota. */
  total: number;
  /** The first MAX_FINDINGS, in rota order. */
  shown: Finding[];
}

export const MAX_FINDINGS = 6;

export const CREW = ['Crew A', 'Crew B', 'Crew C', 'Crew D'];
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** The example week: four crews, seven days. */
export const ROTA0: Row[] = ['EELLNN-', 'NNNN--E', 'LLE-NNN', '--EEEEE'].map((s) => s.split('') as Row);

/** Click order: Off > E > L > N > Off. */
export const NEXT: Record<Shift, Shift> = { '-': 'E', E: 'L', L: 'N', N: '-' };

/** Start hour and label for each working shift. */
export const SHIFT: Record<Exclude<Shift, '-'>, { s: number; h: string }> = {
  E: { s: 6, h: '06–14' },
  L: { s: 14, h: '14–22' },
  N: { s: 22, h: '22–06' },
};

export function cloneRota(rota: Row[]): Row[] {
  return rota.map((row) => row.slice());
}

export function nextShift(shift: Shift): Shift {
  return NEXT[shift];
}

/** Button text for a cell: "Off" or the shift letter. */
export function shiftName(shift: Shift): string {
  return shift === '-' ? 'Off' : shift;
}

/** Hours line under the shift letter: "06–14" etc, empty for Off. */
export function shiftHours(shift: Shift): string {
  return shift === '-' ? '' : SHIFT[shift].h;
}

export function analyse(row: Row): Analysis {
  const flags: string[] = Array(7).fill('');
  let nightsRun = 0;
  let workRun = 0;
  let nights = 0;
  for (let d = 0; d < 7; d++) {
    const c = row[d];
    const p: Shift = d ? row[d - 1] : '-';
    if (c === '-') {
      nightsRun = 0;
      workRun = 0;
      continue;
    }
    workRun++;
    if (c === 'N') {
      nightsRun++;
      nights++;
    } else {
      nightsRun = 0;
    }
    if (p !== '-') {
      // Hours from the end of the previous shift (06:00 for nights) to the start of this one.
      const endPrev = p === 'N' ? 6 : SHIFT[p].s + 8 - 24;
      const gap = SHIFT[c].s - endPrev;
      if (p === 'N' && c !== 'N') flags[d] = 'Quick return after nights';
      else if (gap < 11 && p !== c) flags[d] = `Quick return: ${Math.max(0, gap)}h rest`;
    }
    if (!flags[d] && p !== '-' && ((p === 'L' && c === 'E') || (p === 'N' && c === 'L'))) {
      flags[d] = 'Backward rotation';
    }
    if (nightsRun > 3) flags[d] = `Night ${nightsRun} in a row`;
    if (workRun > 5) flags[d] = `${workRun} days without rest`;
  }
  const flagged = flags.filter(Boolean).length;
  return { flags, score: Math.min(10, flagged * 2.5 + nights * 0.6) };
}

export function levelFor(score: number): Level {
  return score >= 6 ? 'High' : score >= 3 ? 'Watch' : 'Low';
}

/** Per-crew analysis, with the level and load bar width derived from the score. */
export function analyseRota(rota: Row[]): RowState[] {
  return rota.map((row) => {
    const { flags, score } = analyse(row);
    return { flags, score, level: levelFor(score), pct: Math.round(score * 10) };
  });
}

/** Every flag in the rota, as "Crew A, Sat" plus its message, in rota order. */
export function findingsFor(rota: Row[], analysed: RowState[] = analyseRota(rota)): Finding[] {
  const findings: Finding[] = [];
  analysed.forEach((state, ri) => {
    state.flags.forEach((flag, d) => {
      if (flag) findings.push({ who: `${CREW[ri]}, ${DAYS[d]}`, what: flag });
    });
  });
  return findings;
}

export function summariseFindings(rota: Row[], analysed?: RowState[]): FindingsSummary {
  const all = findingsFor(rota, analysed);
  return { total: all.length, shown: all.slice(0, MAX_FINDINGS) };
}

/** "1 flag" or "3 flags". */
export function flagCountLabel(total: number): string {
  return `${total} ${total === 1 ? 'flag' : 'flags'}`;
}

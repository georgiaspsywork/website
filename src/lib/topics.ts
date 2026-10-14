/** Article topics in the order the filter chips appear. Topics not listed here follow, alphabetically. */
const PREFERRED = ['Fatigue', 'Retention', 'Change', 'AI'];

export function orderedTopics(used: string[]): string[] {
  const unique = [...new Set(used)];
  const known = PREFERRED.filter((t) => unique.includes(t));
  const extra = unique.filter((t) => !PREFERRED.includes(t)).sort();
  return [...known, ...extra];
}

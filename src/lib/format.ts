const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** "22 Sep 2026" (always three-letter months, whatever the browser's locale data says) */
export const shortDate = (d: Date) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()].slice(0, 3)} ${d.getUTCFullYear()}`;
/** "6 October 2026" */
export const longDate = (d: Date) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

/** Turn *emphasis* into <em> for headlines. The input is our own content, never user input. */
export const withEm = (text: string) => text.replace(/\*(.+?)\*/g, '<em>$1</em>');
/** Plain text version for <title> and aria labels. */
export const plain = (text: string) => text.replace(/\*(.+?)\*/g, '$1');

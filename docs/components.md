# Component kit

Everything a page is built from lives in `src/components/` (and `src/layouts/`). Use these instead of writing raw
markup; they carry the design (colours, type scale, spacing) so every page stays consistent. Colours, type sizes and
spacing come from the theme tokens at the top of `src/styles/global.css` (`bg-brand`, `text-mint`, `text-lg`,
`px-gutter`, `py-section`...). Never use raw hex colours or pixel font sizes in a class: `npm run check` fails on them.

## Page structure
| Component | What it is | Main props |
| --- | --- | --- |
| `layouts/BaseLayout` | Wraps every page: head, header, `<main>`, footer. | `title`, `description?`, `footer?: { heading?, ctaLabel?, ctaHref? }` |
| `layouts/ArticleLayout` | Article page (built from an article entry). | `article`, `headings`, `related` |
| `layouts/ResourceLayout` | Standard resource page (built from a resource entry). `<Fragment slot="tool">` puts a bespoke tool in the middle. | `resource` |
| `SiteHeader`, `SiteFooter` | Navigation and footer. Links and contact details come from `src/data/site.ts`. | |

## Building blocks
| Component | Use for | Props |
| --- | --- | --- |
| `PageHero` | Opening block: eyebrow, big headline (wrap a word in `<em>` for italics), intro. | `eyebrow`, `title`, `intro?` |
| `Section` | A full-width band. Colour, spacing and gutters live here. Layout inside is passed as `class`. | `tone: ground\|deep\|brand`, `size: default\|sm\|none`, `gutter: default\|reading`, `class?`, `id?` |
| `SectionHeader` | Small label + heading at the top of a section. | `eyebrow?`, `title`, `tone: mint\|amber`, `size: lg\|md` (optional intro in the slot) |
| `MarginSection` | Reading layout: short label in the left margin, content to its right. Stacks on phones. | `label`, `tone`, `labelTone`, `size` |
| `Eyebrow` | The small uppercase label. | `tone: mint\|amber\|subtle\|soft`, `size: sm\|xs\|2xs` |
| `Button` | Link styled as a button. | `href`, `variant: primary\|amber\|brand\|outline\|underline\|underline-white` |
| `RuledList` + `RuledRow` | Rows separated by hairlines: timelines, credentials, "what's inside". | `RuledRow`: `lead`, `title?`, `leadWidth: sm\|md`, `leadTone` |
| `StepGrid` + `Step` | Columns of time-stamped or numbered steps. | `Step`: `stamp`, `title`, `variant: time\|number`, `tone: dark\|brand` |
| `ImagePlaceholder` | Labelled stand-in for a photo not yet supplied. | `label`, `ratio` |
| `Photo` | A real photo (resized, served as WebP). See "Images" below. | `src`, `alt`, `ratio?` |
| `PencilCircle` | Wraps a word in an amber circle that a pencil draws on page load and again on hover. Use sparingly (the home headline). | word in the slot |
| `Arrow` | Arrow glyph that matches the system font. | `dir: right\|up-right` |

## Interactive pieces (script included, no setup needed)
| Component | What it does |
| --- | --- |
| `Checklist` | "Which of these sound like your operation?" tick-list with count and verdict. Content passed as props. |
| `HoursAwake` | Hours-awake slider with the blood-alcohol comparison. |
| `FilterGroup` | Filter chips + count around a list of items (`ArticleRow`, `ResourceCard`). |
| `ContactForm` | Contact form with topic chips. **Does not send anything yet.** |
| `NewsletterBand` | Email sign-up band. **Does not send anything yet.** |
| `RotaBuilder` | The interactive rota fatigue builder (logic in `src/lib/rota.ts`). |
| `Chip` | Pill toggle used by the filters and the contact form. |

## Content cards and article extras
`ArticleRow`, `ResourceCard` (library and "use it alongside"), `Callout`, `PullQuote`, `ResourceLink` (the last three are
used inside MDX articles).

## Images
1. Put the original anywhere, then run `node scripts/optimise-images.mjs path/to/photo.jpg --name=short-name`. It resizes
   to at most 2000px and saves a WebP of roughly 500 KB or less in `src/assets/images/`. Originals are never committed.
2. In a page: `import pic from '../assets/images/short-name.webp';` then `<Photo src={pic} alt="What the picture shows" ratio="4/5" />`.
   Astro creates smaller copies for phones automatically.
3. Alt text is required and should describe the picture (the build checks it exists).

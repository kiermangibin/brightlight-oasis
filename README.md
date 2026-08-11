# Brightlight Oasis - homepage

A static, responsive one-page site built with Tailwind CSS. The **layout** follows
the ClinicMaster "Dentist" template structure; the **brand and content** come from
[brightlightoasis.com](https://www.brightlightoasis.com/en-us).

## Brand

Sampled from the real logo artwork and their Webflow stylesheet:

| Token | Value | Where it came from |
| --- | --- | --- |
| Purple (primary) | `#6F397E` | logo "oasis"; their `.primarybutton` background |
| Teal (accent) | `#06DBB8` | logo "Brightlight" wordmark |
| Teal deep | `#089EAC` | middle stop of the logo ring gradient |
| Peach | `#F0C090` | outer stop of the logo ring gradient |
| Green | `#185157` | their section accent |
| Indigo (dark) | `#160042` | their `gray-900` |
| Body / light | `#6B7094` / `#F3F5FB` | their `gray-500` / `gray-200` |

Type: **Montserrat** for body and UI, a **Times New Roman / Georgia serif** stack
for display headings - the same pairing their site uses. Buttons are full pills
(55px radius), matching their CTA style.

Brand assets are in [assets/img/](assets/img/), pulled from their CDN: `logo.png`
plus `well1`-`well6.png`, the six illustrated icons used on the service cards.

## Run it

No build step. Open the file directly:

```
start index.html
```

or serve it (nicer for the map iframe and caching):

```
npx serve .
# or
python -m http.server 8080
```

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole homepage - header, 14 sections, footer |
| `assets/css/custom.css` | Brand tokens, button/form recipes, animations, mobile nav, accordion |
| `assets/js/main.js` | Mobile nav, sticky header, scroll reveals, counters, skill bars, accordion, pricing toggle, Swiper sliders, back-to-top |
| `assets/img/` | Brightlight Oasis logo and service illustrations |

## Sections, in order

1. **Header** - top bar (phone / email / service area / socials) + navy pill nav with dropdowns and a *Book Appointment* CTA
2. **Hero** - headline with hand-drawn underline, quote strip, provider avatars, rating, floating cards and an *Available Providers* selector, curved SVG divider
3. **About + stats** - "Empowering Journeys to Mental Wellness", animated counters, video/checklist band, three numbered hover cards
4. **Team** - Swiper slider of providers + photo with a "Licensed in" badge
5. **Appointment** - dark band with a 6-field booking form
6. **Services** - six service cards (Psychiatry, Psychotherapy, IOP, Addiction, ADHD Testing, Spravato®) + the Brock Chisholm quote band
7. **Why choose us** - accordion + staggered image collage with a floating stat
8. **Conditions we treat** - six condition cards
9. **Medical director** - portrait with floating badges + animated skill bars
10. **Pricing** - Per Visit / Yearly toggle across three plans
11. **Insurance** - infinite marquee of accepted carriers
12. **Blog** - Swiper carousel of four posts
13. **Testimonials** - Swiper with pagination and arrows
14. **Contact** - OpenStreetMap embed, opening hours, service area, free-consultation form
15. **Footer** - brand, four link columns, newsletter, legal row, back-to-top button

## Before going live

- **Design tokens** live in two places, keep them in sync: the `@theme` block in
  `index.html` (Tailwind utilities) and `:root` in `assets/css/custom.css`
  (plain-CSS components).
- **Cascade gotcha:** everything in `custom.css` sits inside `@layer base` /
  `@layer components` deliberately. Tailwind v4 emits utilities into
  `@layer utilities`, and *unlayered* CSS outranks every layered rule regardless
  of specificity - an unlayered `h2 { color }` would silently beat `text-white`
  on the dark sections. Keep new rules inside a layer.
- **The footer uses an HTML wordmark, not the logo PNG**, because the artwork's
  tagline is black and would vanish on the dark ground. If you get a light/reversed
  logo from the brand, swap it in there.
- **Tailwind is loaded from the browser CDN.** That compiles on every page load -
  fine for review, slow for production. Install `tailwindcss`, move the `@theme`
  block into an input stylesheet, and ship a compiled `.css` file.
- **Images are placeholders** (`picsum.photos` / `pravatar.cc`). Swap in real
  photography and provider headshots - every `<img>` already has width/height
  and `loading="lazy"` set.
- **Contact details are placeholders.** The phone number uses the reserved
  `555` fictional range and the address block only names the service area.
  Replace both, plus the social links which currently point at `#`.
- **Forms have no backend.** They carry `data-demo` and are intercepted in
  `main.js`; point the `action` at your booking system and remove that handler.
- **Prices** are taken from brightlightoasis.com and will drift. The "Yearly"
  psychotherapy figure is illustrative - confirm it before publishing.
- **Inner pages** (About, Services detail, Team, Blog, Pricing, Contact) are not
  built; every nav item currently anchors to a homepage section.

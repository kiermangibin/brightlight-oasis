# Webflow Migration Plan

## Purpose

This document plans the conversion of the current static Brightlight Oasis HTML/CSS/JS website into a native Webflow build. It is a planning document only. The existing project should remain unchanged until implementation is approved.

## 1. Current Website Structure

### Project Type

- Static website with no build step.
- Primary files:
  - `index.html`: main homepage with all primary marketing sections.
  - `booking.html`: appointment category page.
  - `talk-to-a-professional.html`: dynamic provider selection page.
  - `assets/css/custom.css`: custom design system, components, section styles, responsive rules, animations.
  - `assets/js/main.js`: mobile nav, scroll behavior, counters, pricing toggle, sliders, demo forms.
  - `assets/img/`: local logos, textures, icons, favicon, and Dr. Gidion cutout.

### Current State Notes

- The repository has uncommitted changes in `index.html` and `assets/css/custom.css`.
- `booking.html` and `talk-to-a-professional.html` are currently untracked files.
- This migration should treat the current working tree as the visual/source-of-truth state unless the client requests reverting to the last committed state.

### External Dependencies

- Tailwind browser build: `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`
- Font Awesome 6.5.2 CDN
- Google Fonts: Montserrat weights 300-800
- Swiper 11 CSS/JS for videos, blog, testimonials, and optional team slider code
- OpenStreetMap embed iframe
- YouTube thumbnail images and outbound YouTube links
- Brightlight Oasis / Webflow CDN image URLs
- OptiMantra booking links

## 2. Pages And Sections

### Homepage: `index.html`

Recommended Webflow page slug: `/`

Current sections in order:

1. Header
   - Top contact banner.
   - Pill-shaped navigation bar.
   - Desktop dropdown navigation.
   - Mobile drawer navigation.
   - Book Appointment CTA.

2. Hero
   - Large heading: "Timely Mental Health Care at Your Fingertips".
   - Same-day/no-waitlist copy block.
   - Provider avatars and licensed provider CTA.
   - Rating row.
   - Appointment/services CTAs.
   - Large provider visual with floating cards.
   - Curved divider and hero texture.

3. About / Empowering Journeys
   - Image composition.
   - Heading and brand copy.
   - Watch video CTA.
   - Stat tiles.
   - Six wellness cards:
     - Medication Management
     - Complementary and Alternative Interventions
     - One-on-One Sessions
     - Family Therapy
     - Lifestyle Coaching
     - Cognitive Behavioral Therapy (CBT)

4. Services
   - Six service cards:
     - Psychiatry & Medication Management
     - Psychotherapy / Counseling
     - Spravato Treatment
     - Addiction & Suboxone Treatment
     - ADHD Testing
     - Weightloss Program
   - Quote band.

5. Free Consultation
   - Heading: "Unlock Your Path to Mental Wellness".
   - Two-column icon/bullet list.
   - Image collage.

6. Team
   - Desktop: Dr. Gidion showcase on left, team cards on right.
   - Mobile: heading, Dr. Gidion showcase, then team cards.
   - Four team cards:
     - Ayisha Sanda
     - Juliet Anyanwu
     - Alexia Antoine
     - Sajid Ali

7. Conditions We Treat
   - Six condition cards:
     - Major Depressive Disorder
     - Anxiety Disorders
     - ADHD
     - Bipolar Disorder
     - PTSD
     - Schizophrenia

8. Hidden Medical Director Section
   - Exists in markup with `hidden`.
   - Should be rebuilt as a hidden/draft Webflow section or omitted from published pages until approved.

9. Pricing
   - Three pricing cards:
     - Psychiatry & Medication Management
     - Psychotherapy / Counseling
     - ADHD Testing
   - Per Visit / Yearly Plan toggle.
   - Mobile-specific pricing row spacing rules.

10. Videos
   - Carousel with five video cards.
   - YouTube thumbnails and outbound links.

11. Insurance
   - Four logo cards:
     - Aetna
     - Anthem
     - Cigna
     - UnitedHealthcare

12. Blog
   - Carousel with four article cards.

13. Social Updates
   - Six social cards:
     - Facebook
     - TikTok
     - Instagram
     - LinkedIn
     - X
     - YouTube

14. Testimonials
   - Swiper carousel with four testimonials.

15. Contact / Locations
   - OpenStreetMap iframe.
   - Opening time card.
   - Practice area card.
   - Free consultation form.

16. Footer
   - Logo and brand description.
   - Social links.
   - Four link columns.
   - Newsletter form.
   - Legal row.
   - Back-to-top button.

### Booking Page: `booking.html`

Recommended Webflow page slug: `/booking`

Sections:

1. Simplified header
2. Booking hero / service-category grid
3. Six service booking cards
4. Simplified footer

Current booking destinations:

- Psychiatry / Medication Management: `talk-to-a-professional.html`
- Psychotherapy / Counseling: `talk-to-a-professional.html?service=psychotherapy`
- Addiction / Suboxone Treatment: `talk-to-a-professional.html`
- ADHD Testing: official Brightlight ADHD testing URL
- Weightloss Program: OptiMantra link
- Spravato Treatment: official Brightlight booking categories URL

### Provider Page: `talk-to-a-professional.html`

Recommended Webflow page slug: `/talk-to-a-professional`

Current behavior:

- Default state shows two anonymous psychiatry provider cards.
- `?service=psychotherapy` state shows four anonymous psychotherapy provider cards.
- Cards are generated by inline JavaScript.
- Provider cards link to OptiMantra scheduler URLs.

Webflow migration recommendation:

- Avoid inline DOM-generation where possible.
- Use one of these native-friendly approaches:
  - Option A: two static Webflow pages:
    - `/talk-to-a-professional`
    - `/talk-to-a-professional-psychotherapy`
  - Option B: one page with Webflow custom code reading the query string and toggling provider groups.
  - Option C: one CMS-powered providers page with filter parameter support.
- Best maintainability: Option A unless a single URL with dynamic query is required by the client.

## 3. Webflow Page Structure

### Recommended Pages

1. Home
   - Slug: `/`
   - Template: static page with CMS-powered repeated collections where useful.

2. Booking Categories
   - Slug: `/booking`
   - Static category cards or CMS-powered services list.

3. Psychiatry Providers
   - Slug: `/talk-to-a-professional`
   - Provider options filtered to psychiatry.

4. Psychotherapy Providers
   - Slug: `/talk-to-a-professional-psychotherapy`
   - Provider options filtered to psychotherapy.
   - If the exact current query URL is required, add custom code or redirect logic.

5. Optional Future Pages
   - Service detail template: `/services/{slug}`
   - Condition detail template: `/conditions/{slug}`
   - Blog post template: `/blog/{slug}`
   - Team member template: `/team/{slug}`
   - Insurance page: `/insurance`
   - Contact page: `/contact`

### Webflow Navigator Structure

Use section wrappers consistently:

- `page-wrapper`
- `global-styles`
- `navbar`
- `main-wrapper`
- `section-hero`
- `section-about`
- `section-services`
- `section-consultation`
- `section-team`
- `section-conditions`
- `section-pricing`
- `section-videos`
- `section-insurance`
- `section-blog`
- `section-social`
- `section-testimonials`
- `section-contact`
- `footer`

Use a reusable container class:

- `container-large`: max width approximately 1320px.
- `padding-global`: left/right page padding.
- `padding-section-large`: desktop vertical rhythm.
- `padding-section-medium`: tablet/mobile rhythm.

## 4. Design System

### Colors

Create Webflow color variables:

- `primary-purple`: `#6F397E`
- `primary-purple-dark`: `#572D64`
- `primary-purple-light`: `#F0E7F3`
- `teal`: `#06DBB8`
- `teal-deep`: `#089EAC`
- `peach`: `#F0C090`
- `green`: `#185157`
- `secondary`: `#160042`
- `secondary-light`: `#282556`
- `body`: `#6B7094`
- `light`: `#F3F5FB`
- `page-pink`: `#fbf7fa`
- `footer-green`: `#004D49`
- `white`: `#ffffff`

### Typography

Current site:

- Body/UI: Montserrat.
- Display headings: Times New Roman / Georgia serif stack.
- Card titles and small UI headings often override to Montserrat.

Webflow setup:

- Add Montserrat via Webflow Fonts or Google Fonts.
- Define heading styles:
  - `heading-style-h1`
  - `heading-style-h2`
  - `heading-style-h3`
  - `heading-style-card`
- Define body styles:
  - `text-size-large`
  - `text-size-regular`
  - `text-size-small`
  - `text-color-body`

Important: Several user-requested adjustments moved card titles away from Times New Roman. Preserve the distinction:

- Large editorial section headings can use serif.
- Card headings, footer headings, video/blog card headings, provider cards, service cards, and pricing UI should use Montserrat.

### Spacing

Current patterns:

- Max container width: about 1320px.
- Section padding: `py-16 md:py-24`.
- Card radius ranges from 1rem to 1.55rem.
- Buttons are pill-shaped.
- Service/condition cards use icon cutout spacing at corners.

Webflow variables:

- `spacing-xxs`: 0.25rem
- `spacing-xs`: 0.5rem
- `spacing-sm`: 0.75rem
- `spacing-md`: 1rem
- `spacing-lg`: 1.5rem
- `spacing-xl`: 2rem
- `spacing-2xl`: 3rem
- `spacing-section`: 4rem mobile, 6rem desktop

### Buttons

Create components:

- `button`
- `button is-primary`
- `button is-secondary`
- `button is-teal`
- `button is-white`
- `button is-outline`
- `button is-square`

Button design:

- Pill radius.
- Montserrat 700.
- Icon gap.
- Hover color shift.

### Cards

Create base card classes:

- `card`
- `card-service`
- `card-condition`
- `card-wellness`
- `card-team`
- `card-pricing`
- `card-video`
- `card-blog`
- `card-social`
- `card-testimonial`
- `card-insurance`
- `card-provider`

## 5. Reusable Components

### Global Components

1. Navbar
   - Top banner.
   - Desktop dropdown menu.
   - Mobile drawer menu.
   - Book Appointment CTA.

2. Footer
   - Logo.
   - Link groups.
   - Social icons.
   - Newsletter form.
   - Legal links.
   - Footer texture background.

3. Section Header
   - Eyebrow/sub-title with teal line.
   - Heading.
   - Optional paragraph.
   - Optional CTA area.

4. CTA Button Group
   - Primary/secondary pair.
   - Icon support.

5. Icon Corner Card
   - Used by services, conditions, booking category cards, and wellness cards.

6. Carousel Controls
   - Shared arrow buttons for videos, blog, testimonials.

7. Provider Card
   - Anonymous placeholder/icon visual.
   - Service label.
   - Book Provider CTA.

### Section Components

- Hero visual cluster.
- Stat tile.
- Wellness card.
- Service card.
- Free consultation list item.
- Team showcase.
- Team member card.
- Condition card.
- Pricing plan card.
- Video card.
- Insurance logo card.
- Blog card.
- Social card.
- Testimonial card.
- Contact info card.

## 6. CMS Collections

### Recommended CMS Collections

#### Services

Fields:

- Name
- Slug
- Short description
- Long description
- Icon
- Image
- Booking URL
- Sort order
- Featured toggle
- CTA label

Initial items:

- Psychiatry & Medication Management
- Psychotherapy / Counseling
- Spravato Treatment
- Addiction & Suboxone Treatment
- ADHD Testing
- Weightloss Program

#### Conditions

Fields:

- Name
- Slug
- Short description
- Icon
- Sort order

Initial items:

- Major Depressive Disorder
- Anxiety Disorders
- ADHD
- Bipolar Disorder
- PTSD
- Schizophrenia

#### Team Members

Fields:

- Name
- Role / credentials
- Photo
- Bio excerpt
- Featured toggle
- Sort order
- Social links
- Visibility status

Initial items:

- Dr. Gidion Buma
- Ayisha Sanda
- Juliet Anyanwu
- Alexia Antoine
- Sajid Ali

#### Anonymous Providers

Fields:

- Display label
- Provider type: Psychiatry or Psychotherapy
- Anonymous visual type
- Booking URL
- Sort order
- Active toggle

Initial items:

- Psychiatry Provider 1
- Psychiatry Provider 2
- Psychotherapy Provider 1
- Psychotherapy Provider 2
- Psychotherapy Provider 3
- Psychotherapy Provider 4

Note: The current psychotherapy providers all use the same scheduler URL. Confirm whether each should have a separate OptiMantra URL before launch.

#### Pricing Plans

Fields:

- Plan name
- Category / eyebrow
- Is featured
- Visit price rows
- Yearly price rows
- Included items
- Promo text
- CTA label
- CTA URL

Initial items:

- Psychiatry & Medication Management
- Psychotherapy / Counseling
- ADHD Testing

#### Videos

Fields:

- Title
- Description
- YouTube URL
- YouTube ID
- Thumbnail image
- Sort order

Initial current YouTube IDs:

- `MN6uUYW7Z_Q`
- `kSxGyIysQpc`
- `as50NTT2eyc`
- `iPVGSSgo5rU`
- `C5540TWwucw`

#### Blog Posts

Fields:

- Title
- Slug
- Category
- Summary
- Main image
- Author
- Author initials/photo
- Publish date
- Body
- Sort order

Initial homepage cards:

- Five signs it's time to talk to a psychiatric provider
- What to expect from your first Spravato session
- Is Spravato treatment right for you?
- Adult ADHD: why so many diagnoses come late

#### Testimonials

Fields:

- Quote title
- Quote body
- Name
- Initials
- Location
- Rating
- Sort order

#### Insurance Logos

Fields:

- Carrier name
- Logo
- Sort order
- Accepted toggle

Initial items:

- Aetna
- Anthem
- Cigna
- UnitedHealthcare

#### Social Links

Fields:

- Network
- URL
- Icon
- CTA copy
- Sort order

## 7. Assets To Migrate

### Local Assets

Move to Webflow Assets:

- `assets/img/logo.png`
- `assets/img/logo-footer.png`
- `assets/img/favicon.png`
- `assets/img/apple-touch-icon.png`
- `assets/img/bg2.webp`
- `assets/img/bg3.webp`
- `assets/img/footer-texture.webp`
- `assets/img/hero-pattern.webp`
- `assets/img/dr-gidion-cutout-cropped.png`
- `assets/img/well1.png`
- `assets/img/well2.png`
- `assets/img/well3.png`
- `assets/img/well4.png`
- `assets/img/well5.png`
- `assets/img/well6.png`
- Small decorative PNGs:
  - `front.png`
  - `front-green.png`
  - `group1745.png`
  - `group21.png`
  - `hero.png`
  - `i.png`
  - `svg1.png`

### Remote Assets To Download And Rehost

For Webflow stability, download and re-upload remote CDN images rather than hotlinking:

- Provider/headshot images from `cdn.prod.website-files.com`
- Service card images
- Consultation collage images
- Blog images
- Insurance logo images
- YouTube thumbnails, if static images are desired

### Asset Naming Convention

Use clean Webflow asset names:

- `logo-brightlight-oasis.png`
- `logo-brightlight-oasis-footer.png`
- `texture-hero-pattern.webp`
- `texture-services-bg.webp`
- `texture-team-bg.webp`
- `texture-footer-bg.webp`
- `provider-gidion-cutout.png`
- `icon-wellness-medication.png`
- `service-psychiatry.jpg`
- `insurance-aetna.png`

## 8. Responsive Behavior

### Current Breakpoints

The current site uses Tailwind-like breakpoints:

- Small: around 576px / 640px
- Medium: 768px
- Large: 1024px
- XL: 1200px / 1280px

### Webflow Breakpoints

Map behavior to:

- Desktop
- Tablet
- Mobile landscape
- Mobile portrait

### Key Responsive Requirements

1. Header
   - Desktop: top banner and pill nav.
   - Mobile/tablet: hamburger drawer.
   - Sticky state after scroll.

2. Hero
   - Mobile: copy first, visual below.
   - Buttons stack naturally.
   - Floating provider/rating cards must not overlap text.

3. About
   - Image and copy stack on mobile.
   - Stat tiles stack or form a clean 2/1 layout.
   - Wellness cards become one column on mobile.

4. Services
   - Desktop: four-card first row style may appear depending on width.
   - Tablet: two columns.
   - Mobile: one column.
   - Icon cutout spacing should match background.

5. Team
   - Desktop: Dr. Gidion showcase left, team cards right.
   - Mobile: heading first, Dr. Gidion showcase next, small cards below.
   - Remove `team-showcase__badge` from final layout because current markup has removed it.
   - Keep social icons aligned in orbit without excessive spacing.

6. Pricing
   - Mobile pricing rows need constrained label/price widths.
   - Ensure price notes never overlap pills.
   - Avoid card heading serif font inside pricing cards.

7. Videos / Blog / Testimonials
   - Desktop: carousel with multiple visible slides.
   - Mobile: one card per view.
   - Equal card heights.
   - Video arrow icon must be centered and angled upper-right.

8. Footer
   - Desktop multi-column.
   - Mobile stacked columns.
   - Text must be high contrast against `#004D49`.

## 9. JavaScript And Interactions

### Current JS Behaviors

From `assets/js/main.js`:

- Mobile navigation drawer.
- Sticky header class toggle after scroll.
- Scroll reveal using IntersectionObserver.
- Animated counters using `data-count`.
- Skill bar animations for hidden doctor section.
- Hover-active service boxes.
- Accordion behavior.
- Pricing toggle between visit/yearly.
- Swiper sliders:
  - Testimonials
  - Blog
  - Videos
  - Team slider support, though current team section is card-based.
- Back-to-top button.
- Demo form interception with fake success message.
- Dynamic current year.

From `talk-to-a-professional.html` inline script:

- Reads query parameter `service=psychotherapy`.
- Changes page title, eyebrow, heading, and intro.
- Generates provider cards dynamically.
- Uses OptiMantra URLs.

### Webflow Native Replacements

- Mobile nav: Webflow Navbar component or custom dropdown/drawer interaction.
- Sticky header: Webflow interactions or position sticky.
- Scroll reveal: Webflow interactions with "while scrolling into view".
- Counters: custom code still needed unless static stats are acceptable.
- Pricing toggle: Webflow tabs or custom code.
- Carousels: Webflow Slider, Splide, Swiper custom embed, or CMS slider workaround.
- Back-to-top: Webflow link to page top plus interaction.
- Forms: Webflow Forms, webhook integration, HubSpot, or booking platform integration.
- Provider query behavior: preferably replace with separate pages or CMS-filtered templates.

### Custom Code Still Recommended

- Pricing toggle if Webflow Tabs cannot match desired card layout.
- Count-up animation if animated counters must remain.
- Provider query handling if one URL must dynamically switch provider groups.
- Advanced carousel behavior if Webflow Slider is not flexible enough.

## 10. SEO And Accessibility

### Current SEO

- Each page has a title and description.
- Favicon and apple touch icon included.
- Most images include `alt` text.
- Some decorative images use empty alt text.
- Anchor-heavy one-page structure.

### Webflow SEO Tasks

- Set unique SEO title and meta description for every page.
- Add Open Graph title/image/description.
- Add canonical URLs.
- Use clean slugs:
  - `/`
  - `/booking`
  - `/talk-to-a-professional`
  - `/talk-to-a-professional-psychotherapy`
- Add 301 redirects from old/static URLs if needed:
  - `/index.html` to `/`
  - `/booking.html` to `/booking`
  - `/talk-to-a-professional.html` to `/talk-to-a-professional`
  - Query-state psychotherapy URL to new psychotherapy provider page if separate page is used.

### Accessibility Tasks

- Maintain semantic heading order.
- Ensure dropdown menus are keyboard accessible.
- Ensure all buttons have accessible names.
- Add aria labels for icon-only buttons.
- Keep high contrast in footer and banner.
- Ensure focus states are visible.
- Do not use placeholder-only labels for forms; use real labels, visually hidden where needed.
- Validate provider cards and booking category cards are meaningful links.
- Ensure carousel controls are keyboard operable and screen-reader labeled.
- Avoid auto-advancing sliders or provide pause behavior if needed.

## 11. Migration Risks

### Visual Fidelity Risks

- The current build mixes Tailwind utility classes and custom CSS. Webflow will need careful class planning to match spacing and responsive behavior.
- Several sections rely on complex absolute-positioned decorative elements.
- Team showcase mobile behavior has been heavily tuned and must be recreated carefully.
- Service and condition card icon cutout effects require nested wrapper structure or custom CSS in Webflow.
- Pricing mobile rows are sensitive to text length and pill widths.

### Technical Risks

- Current Tailwind browser CDN compiles styles at runtime. Webflow will not use Tailwind, so all utility behavior must be translated into Webflow classes.
- Swiper behavior may not map perfectly to Webflow Slider.
- Query-param provider switching is not native Webflow behavior.
- Demo forms currently do not submit anywhere.
- External OptiMantra URLs are long and should be centrally managed in CMS fields.
- Some remote images may change or disappear if hotlinked.

### Content Risks

- Phone number and some social links may be placeholders.
- Pricing and provider links should be re-confirmed before launch.
- Some sections reference older/hidden content, such as the medical director section.
- The README is out of date compared with the current site state.

### Webflow CMS Risks

- CMS limits may matter if many future service, blog, or provider entries are planned.
- CMS sliders require either Webflow collection lists with custom slider code or careful native slider workarounds.

## 12. Recommended Build Order

### Phase 1: Preparation

1. Freeze the approved current design state.
2. Export/download all remote images that should be owned by the Webflow project.
3. Confirm final content:
   - Services list.
   - Provider counts and booking URLs.
   - Pricing.
   - Social URLs.
   - Phone/email/contact details.
4. Confirm whether provider pages should be separate pages or query-based.

### Phase 2: Webflow Design System

1. Create color variables.
2. Add Montserrat.
3. Define typography classes.
4. Create global spacing/container classes.
5. Build button classes.
6. Build base card classes.
7. Upload logos, textures, icons, and favicon.

### Phase 3: Global Components

1. Build desktop/mobile navbar.
2. Build footer.
3. Build reusable section header.
4. Build forms and form success/error states.

### Phase 4: Homepage Sections

Recommended order:

1. Hero
2. About / Empowering Journeys
3. Services
4. Free Consultation
5. Team
6. Conditions
7. Pricing
8. Videos
9. Insurance
10. Blog
11. Social Updates
12. Testimonials
13. Contact
14. Back-to-top interaction

### Phase 5: Booking Flow Pages

1. Build `/booking`.
2. Build provider page or pages.
3. Add all OptiMantra outbound links.
4. Test service routing.
5. Add redirects from old static URLs if applicable.

### Phase 6: CMS Build

1. Create CMS collections.
2. Populate services.
3. Populate providers.
4. Populate team.
5. Populate blog.
6. Populate testimonials.
7. Populate insurance logos.
8. Bind collection lists to homepage sections.

### Phase 7: Interactions

1. Navbar dropdown/drawer behavior.
2. Sticky header.
3. Reveal animations.
4. Pricing toggle.
5. Counters.
6. Carousels.
7. Back-to-top.

### Phase 8: QA And Launch Prep

1. Full responsive QA.
2. Accessibility QA.
3. SEO QA.
4. Link and booking flow QA.
5. Form submission QA.
6. Performance check.
7. Publish to staging.
8. Client approval.
9. Domain/DNS launch.

## 13. Final QA Checklist

### Visual QA

- Header matches desktop and mobile layouts.
- Top banner uses `#004D49`.
- Footer uses `#004D49` with visible contrast.
- Hero texture is visible but not overpowering.
- Hero buttons use brand colors.
- No unwanted Times New Roman inside cards or footer UI.
- Service cards match current hover/default design.
- Condition cards match service-card-inspired layout.
- Team section matches desktop and mobile ordering.
- Dr. Gidion showcase has no excessive mobile whitespace.
- Pricing cards do not overlap on mobile.
- Video cards have equal heights and centered arrow icons.
- Blog cards have equal heights.
- Insurance logos are real logos.
- Back-to-top button does not cover important content.

### Responsive QA

- Test desktop wide: 1440px and 1920px.
- Test laptop: 1280px.
- Test tablet: 768px.
- Test mobile landscape.
- Test mobile portrait: 390px and 360px.
- Confirm no horizontal overflow.
- Confirm all text fits inside cards/buttons.
- Confirm mobile nav opens, closes, and dropdowns work.

### Content QA

- Verify all services are present except IOP.
- Verify Spravato replaces IOP where required.
- Verify provider counts:
  - Psychiatry: 2 anonymous provider options.
  - Psychotherapy: 4 anonymous provider options.
- Verify no provider names/faces appear on anonymous provider booking cards.
- Verify team section can still show named team members where intended.
- Verify pricing copy and values.
- Verify footer service links.
- Verify social URLs.

### Booking QA

- Book Appointment CTA leads to booking categories.
- Psychiatry category leads to psychiatry provider options.
- Psychotherapy category leads to psychotherapy provider options.
- Addiction/Suboxone routing is confirmed.
- ADHD Testing routes correctly.
- Weightloss Program routes to OptiMantra.
- Spravato route is confirmed before launch.
- All outbound booking links open safely and correctly.

### Interaction QA

- Sticky header works.
- Dropdown menus work on desktop.
- Mobile drawer works.
- Scroll reveals do not hide content permanently.
- Pricing toggle works.
- Carousels work and controls are accessible.
- Back-to-top works.
- Forms show success/error states.

### SEO QA

- Page titles and descriptions are unique.
- OG image set.
- Favicon and apple touch icon set.
- Semantic heading order is valid.
- Images have useful alt text or empty alt for decorative images.
- Sitemap generated.
- 301 redirects configured.

### Performance QA

- Images compressed and sized correctly.
- No unnecessary remote hotlinks.
- No unused scripts.
- Lazy loading for below-fold images.
- Webflow interactions kept lightweight.
- Lighthouse mobile score checked.

## Summary Recommendation

Build the Webflow version as a native Webflow project with a strong component system and CMS collections for repeatable content. Preserve the existing visual language, but avoid recreating the Tailwind utility structure one-to-one. The most important migration decision is the provider flow: the cleanest Webflow structure is separate provider pages for psychiatry and psychotherapy, while a single query-driven page will require custom code.

Do not begin implementation until the final current design state, provider URLs, pricing, social links, and booking flow decisions are approved.

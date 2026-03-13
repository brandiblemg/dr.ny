# Dr. Nader Youssef — Project Roadmap

Prioritized list of tasks to continue developing the website. Based on README, Feb 23 meeting notes, and current homepage state.

---

## 1. Immediate / Short-term

- [ ] **Wire “Choose Your Path” cards to real destinations**  
  Patient / Pharma / Provider cards currently link nowhere. Add `href` to Services sub-pages or to anchor IDs for an in-page experience until Services page exists.

- [ ] **Add expandable elements for ACE Framework**  
  Meeting notes and README call for “expandable elements for framework explanations.” Add simple accordions or “Learn more” expand/collapse for each pillar (Advocacy, Compassion, Education).

- [ ] **Make hero video placeholder functional**  
  Connect the hero play button to a real video (e.g. YouTube/Vimeo embed or hosted file) when the 60-second intro is ready; or keep overlay but open a modal/embed on click.

- [ ] **Triple E visibility**  
  Triple E (“Empathetic Engagement Through Education”) is in the ACE section but could be called out more clearly—e.g. short line in hero or a small badge near ACE.

- [ ] **Navigation links**  
  Point Services, Case Studies, Resources, About, Contact to real pages or temporary anchors (e.g. `#ace-framework`, `#thought-leadership`) until those pages exist.

---

## 2. Content & Visuals

- [ ] **Biopsychosocial pyramid infographic**  
  Meeting: “Biopsychosocial model (pyramid structure): Base = coping, Middle = modifiable factors, Top = medication.” Create a simple graphic (e.g. SVG or illustration) and add it to the Patient Engagement Practice block in “How It Works.”

- [ ] **Replace “Dr. Youssef in Action” placeholders with real video**  
  Three cards (15s, 12s, 18s) are placeholders. Swap for real clips and wire play buttons to embed or modal.

- [ ] **Featured testimonial**  
  Current quote is generic. Replace with an approved patient/focus-group quote and, if possible, a short testimonial video or headshot.

- [ ] **Thought leadership cards**  
  White paper / case study / toolkit cards use placeholders. Add real titles, short descriptions, and links to PDFs or pages when available.

- [ ] **Optional: “Eight Pillars”**  
  Meeting mentioned “Eight Pillars” (education through advocacy and compassion). Decide if they appear on homepage (e.g. under ACE or in a compact list) or only on a future Services/Resources page.

---

## 3. Interactive Services & New Pages

- [ ] **Define Services page structure**  
  Plan an “Interactive Services” page: audience-based entry (Patient / Pharma / Provider) and scenario-based click-through (per meeting notes).

- [ ] **Build Services page (or first version)**  
  Either: (a) one Services page with three pathways and simple “next step” flows, or (b) three sub-pages (Patient Engagement Practice, Pharmaceutical Consulting, Provider Training) with clear CTAs. Ensure “Choose Your Path” on homepage links here.

- [ ] **Scenario-based flows (Phase 2)**  
  If custom app-style flows are desired (e.g. “Answer a few questions → see your path”), scope and implement after basic Services page is live.

- [ ] **Case Studies / White Papers page**  
  Dedicated page for publications; link from Thought Leadership section and nav. Support “monthly” or regular updates if that’s the plan.

- [ ] **Resources page**  
  Central place for toolkits, downloads, and methodology resources. Link from Thought Leadership and nav.

- [ ] **About page**  
  Bio, positioning, “old-school doctoring” / human connection narrative—without making the site a “demographic bio page.”

- [ ] **Contact page**  
  Contact form and/or clear CTA; later integrate scheduling (e.g. Zoom).

---

## 4. Technical & Integration

- [ ] **Request Consultation / scheduling**  
  Integrate scheduling (e.g. Calendly, Cal.com, or auto-scheduled Zoom) for “Request Consultation” so it books real slots.

- [ ] **Analytics and optional tracking**  
  Add analytics (e.g. GA4 or Plausible) for traffic and key actions (CTA clicks, path selection, video plays), respecting privacy.

- [ ] **SEO basics**  
  Meta titles and descriptions per page; optional Open Graph/Twitter cards for sharing.

- [ ] **Performance**  
  When real video and images are in place: optimize assets, consider lazy-loading for below-the-fold media.

- [ ] **Mobile and QA**  
  Test nav, forms, video, and path links on small screens; fix any layout or tap-target issues.

---

## 5. Polish & Brand

- [ ] **Copy pass**  
  One full pass on headlines and body copy to ensure tone matches “keynote-level,” “thought leadership,” “human-centered authority.”

- [ ] **Accessibility**  
  Check focus order, contrast, and keyboard use; add `aria` where needed for expandables and video controls.

- [ ] **Footer and legal**  
  Add or finalize Privacy Policy and Terms of Service pages and link from footer.

- [ ] **Post-launch: social**  
  Per meeting, Instagram/TikTok as secondary marketing after site launch; no build task now, just note for strategy.

---

## Quick reference

| Priority   | Focus                          |
|-----------|----------------------------------|
| **P0**    | Path links, ACE expandables, hero video, nav links |
| **P1**    | Biopsychosocial graphic, real videos, testimonial, Thought Leadership content |
| **P2**    | Services page (structure + build), Case Studies, Resources, About, Contact |
| **P3**    | Scheduling, analytics, SEO, performance, accessibility, copy, legal |

Use this as a living list: check off items and add new ones as the game plan (Feb 26 deliverables) and design/video resources are confirmed.

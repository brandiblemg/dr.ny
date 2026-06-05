# Legal disclaimers — client handoff (May 2026)

**Status:** Draft language implemented on the website — **pending review and approval by counsel** before launch.

---

## Domains & canonical URL

| Role | Domain |
|------|--------|
| **Primary (canonical)** | `https://consultdrnader.com` |
| **Aliases** | `consultdryoussef.com`, `www.*` (redirect to primary) |
| **Netlify subdomain** | `drny.netlify.app` (redirects to primary via `_redirects`) |

SEO assets use the primary domain: `robots.txt`, `sitemap.xml`, canonical tags, and Open Graph URLs on every page. Reference constant: `assets/site-config.js`.

**Launch ops (Section B):** See **`LAUNCH-OPS-B.md`** for Netlify/Cloudflare, Chatbase, Calendly, Search Console, and GA4 steps. Run `./scripts/verify-launch.sh` after deploy.

---

## What is live on the website

| Item | Location |
|------|----------|
| **Full Professional Services Disclaimer** | `professional-services-disclaimer.html` (linked from every page footer) |
| **Terms of Service** (health disclaimers, liability, IP, governing law) | `terms-of-service.html` |
| **Privacy Policy** (not for medical treatment; links to disclaimer) | `privacy-policy.html` |
| **Site-wide footer notice** | All HTML pages: *Educational and consulting services only—not medical advice, diagnosis, or treatment.* |
| **Home hero** | Short disclaimer + metaphor footnote on “Medicine” headline |
| **Patient Advocacy** | Prominent services disclaimer box; softened clinical phrasing |
| **BioPharma Consultation & Leadership Coaching** | Services disclaimer in Overview |
| **Schedule & Contact** | Subtle disclaimer copy; closable popup on high-intent pages |
| **Home + service + schedule + contact** | Bottom-left “Professional services only” popup (closable) |
| **Resources** | Page-level educational-resources-only notice |
| **About** | Non-clinical consulting practice line + link |
| **Navigation / primary CTAs** | “Schedule a Conversation” (replacing “Schedule Consultation” where applicable) |

---

## What is NOT on the website (client / counsel action)

These items were specified by counsel and must be handled **off-site**:

1. **Written engagement letter** for every client  
2. **Statement of work (SOW)** for every engagement  
3. **Separate, prominent disclaimer** that the client **initials or signs** (e.g., DocuSign, intake packet—not a website checkbox unless counsel approves)

The website **references** this process on the disclaimer page, schedule page, and contact page. It does not collect signatures.

---

## Copy marked as draft

The following pages include an explicit note: *Draft language—pending review and approval by counsel.*

- `professional-services-disclaimer.html`
- `terms-of-service.html`
- `privacy-policy.html`

**Next step for client:** Send these three URLs (or exported PDFs) to the lawyer for final wording, then replace draft text before public launch.

---

## Suggested message to Dr. Youssef / counsel

> We updated the website with educational/consulting disclaimers throughout, a dedicated disclaimer page, revised Terms and Privacy, and softened language that could imply medical treatment. All legal copy is marked draft pending your lawyer’s approval. Engagement letters, SOWs, and the signed client disclaimer remain separate documents outside the website.

---

## QA checklist (completed in development)

- [x] Footer disclaimer + “Full disclaimer” link on all pages  
- [x] Footer links: Privacy | Terms | Disclaimer  
- [x] No remaining “Schedule Consultation” in navigation  
- [x] Terms/Privacy placeholders replaced  
- [x] Patient Advocacy + Schedule highest-visibility notices  

---

## Files changed (summary)

- **New:** `professional-services-disclaimer.html`, `LEGAL-DISCLAIMERS-HANDOFF.md`, `robots.txt`, `sitemap.xml`, `_redirects`, `assets/site-config.js`
- **Updated:** All `*.html` pages (SEO meta, canonical URLs), `assets/css/styles.css`, `assets/js/main.js`

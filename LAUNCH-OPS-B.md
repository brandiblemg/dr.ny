# Launch ops — Section B checklist

Operational steps for domains, SSL, third-party tools, and analytics.  
**Canonical site:** `https://consultdrnader.com`

Repo items already in place: `_redirects`, `netlify.toml`, `robots.txt`, `sitemap.xml`, `assets/site-config.js`.

---

## 15–18 · Netlify & Cloudflare (dashboard)

### Netlify → Site → Domain management

- [ ] **Primary domain** is `consultdrnader.com` (HTTPS, green check)
- [ ] **Aliases attached:** `www.consultdrnader.com`, `consultdryoussef.com`, `www.consultdryoussef.com`
- [ ] **HTTPS** enabled for all domains (Netlify provisions Let’s Encrypt)
- [ ] After deploy, run: `./scripts/verify-launch.sh` (or see commands below)

### Cloudflare (DNS for custom domains)

- [ ] DNS records point to Netlify (A/CNAME per Netlify instructions)
- [ ] **SSL/TLS mode:** **Full (strict)** — not “Flexible” (avoids redirect/SSL loops with Netlify)
- [ ] Proxy status: orange cloud OK; if issues, try DNS-only (grey) temporarily to debug

### Redirects (in repo — deploy to activate)

`_redirects` sends alias domains and `drny.netlify.app` → `https://consultdrnader.com`.  
Verify after deploy:

```bash
curl -sI https://consultdryoussef.com/ | grep -i location
curl -sI https://drny.netlify.app/ | grep -i location
curl -sI https://www.consultdrnader.com/ | grep -i location
```

Expected: `location: https://consultdrnader.com/` (301).

---

## 19 · Chatbase allowlist

Widget ID in `assets/js/main.js`: `TMOu-Vsbt3FrIw11bhSL2`

In **Chatbase dashboard** → your bot → **Settings / Domains** (or embed restrictions), add:

- `consultdrnader.com`
- `www.consultdrnader.com`
- `consultdryoussef.com`
- `www.consultdryoussef.com`
- `drny.netlify.app` (optional, for staging)

Reference list: `assets/site-config.js` → `chatbaseAllowedHosts`

---

## 20 · Calendly

- [ ] Open `https://consultdrnader.com/schedule.html` on production
- [ ] Confirm Calendly widget loads and booking flow works
- [ ] Update Calendly event URL in `schedule.html` if switching from demo account (`mike-brandiblemg`)

No code change required if embed already works on production.

---

## 21 · Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. **Add property:** URL prefix `https://consultdrnader.com`
3. **Verify** using one of:
   - **HTML tag:** copy `content="..."` value → paste into `assets/site-config.js` → `googleSiteVerification: "YOUR_CODE"` → deploy
   - **HTML file upload:** add file Google provides at site root
4. **Submit sitemap:** `https://consultdrnader.com/sitemap.xml`
5. Optional: add `consultdryoussef.com` only if you want separate monitoring (canonical still points to primary)

---

## 22 · Analytics (GA4)

1. Create GA4 property for `consultdrnader.com`
2. Copy **Measurement ID** (`G-XXXXXXXX`)
3. Set in `assets/site-config.js`:

   ```javascript
   gaMeasurementId: "G-XXXXXXXX",
   ```

4. Deploy — tracking loads automatically via `main.js` (disabled while string is empty)

**Privacy note:** Update `privacy-policy.html` when GA4 is enabled (cookies, data collected).

---

## Post-deploy verification

```bash
cd "/Users/michaelnakhla/Documents/Wesites/Dr. Nader Yousef"
./scripts/verify-launch.sh
```

**If `dig @1.1.1.1 consultdrnader.com` works but `curl https://consultdrnader.com` fails:** your Mac/router DNS cache is stale. Set DNS to `1.1.1.1` in System Settings → Network → Wi‑Fi → DNS, or wait for propagation. The verify script falls back to Cloudflare DNS automatically.

Or manually:

| Check | URL |
|-------|-----|
| Homepage | https://consultdrnader.com/ |
| robots.txt | https://consultdrnader.com/robots.txt |
| sitemap.xml | https://consultdrnader.com/sitemap.xml |
| Canonical meta | View source → `link rel="canonical"` |
| Schedule + Calendly | https://consultdrnader.com/schedule.html |

---

## Status log

| Item | Repo | Dashboard / manual |
|------|------|-------------------|
| Domain redirects | `_redirects` ✓ | Netlify primary domain |
| robots + sitemap | ✓ | Deploy required |
| netlify.toml headers | ✓ | — |
| GA4 scaffold | `site-config.js` + `main.js` ✓ | Paste Measurement ID |
| Search Console | `googleSiteVerification` in config ✓ | Verify + submit sitemap |
| Chatbase | domains documented ✓ | Allowlist in Chatbase UI |
| Calendly | — | Test on production |

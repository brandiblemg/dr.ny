/**
 * Site-wide config — update values here before launch.
 * Loaded before main.js on every page.
 */
window.SITE_CONFIG = {
  siteUrl: "https://consultdrnader.com",
  siteName: "Dr. Nader Youssef",
  ogImage: "https://consultdrnader.com/assets/Logo/1.png",

  // B-22: Google Analytics 4 — paste Measurement ID (e.g. G-XXXXXXXX) when ready; leave "" to disable
  gaMeasurementId: "",

  // B-21: Google Search Console — paste verification content string when Google provides it; leave "" to skip
  googleSiteVerification: "",

  // B-19: Add these hosts in Chatbase dashboard → bot settings → allowed domains
  chatbaseAllowedHosts: [
    "consultdrnader.com",
    "www.consultdrnader.com",
    "consultdryoussef.com",
    "www.consultdryoussef.com",
    "drny.netlify.app",
    "localhost",
  ],
};

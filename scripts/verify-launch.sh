#!/usr/bin/env bash
# Post-deploy checks for Section B (domains, SEO files, redirects)
set -euo pipefail

PRIMARY="https://consultdrnader.com"
PASS=0
FAIL=0

check() {
  local label="$1"
  shift
  if "$@"; then
    echo "✓ $label"
    PASS=$((PASS + 1))
  else
    echo "✗ $label"
    FAIL=$((FAIL + 1))
  fi
}

http_ok() {
  local url="$1"
  local code
  code=$(curl -sS -o /dev/null -w "%{http_code}" "$url" || echo "000")
  [[ "$code" == "200" ]]
}

redirects_to_primary() {
  local url="$1"
  local loc
  loc=$(curl -sSI "$url" | tr -d '\r' | awk -F': ' 'tolower($1)=="location"{print $2; exit}')
  [[ "$loc" == "${PRIMARY}/" || "$loc" == "$PRIMARY" ]]
}

body_contains() {
  local url="$1"
  local needle="$2"
  curl -sS "$url" | grep -q "$needle"
}

echo "Verifying launch ops for $PRIMARY"
echo "---"

check "Homepage returns 200" http_ok "${PRIMARY}/"
check "robots.txt returns 200" http_ok "${PRIMARY}/robots.txt"
check "sitemap.xml returns 200" http_ok "${PRIMARY}/sitemap.xml"
check "robots.txt references sitemap" body_contains "${PRIMARY}/robots.txt" "sitemap.xml"
check "Homepage has canonical to primary" body_contains "${PRIMARY}/" 'rel="canonical" href="https://consultdrnader.com/'
check "consultdryoussef.com redirects to primary" redirects_to_primary "https://consultdryoussef.com/"
check "www.consultdrnader.com redirects to primary" redirects_to_primary "https://www.consultdrnader.com/"
check "drny.netlify.app redirects to primary" redirects_to_primary "https://drny.netlify.app/"

echo "---"
echo "Passed: $PASS  Failed: $FAIL"

if [[ "$FAIL" -gt 0 ]]; then
  echo "Some checks failed — deploy latest main, confirm Netlify DNS/SSL, then re-run."
  exit 1
fi

echo "All checks passed."

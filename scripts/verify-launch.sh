#!/usr/bin/env bash
# Post-deploy checks for Section B (domains, SEO files, redirects)
set -euo pipefail

PRIMARY="https://consultdrnader.com"
PRIMARY_HOST="consultdrnader.com"
AUTH_DNS="1.1.1.1"
PASS=0
FAIL=0
WARN=0

CURL_RESOLVE_ARGS=()

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

warn() {
  echo "⚠ $1"
  WARN=$((WARN + 1))
}

auth_ips() {
  local host="$1"
  dig @"$AUTH_DNS" "$host" A +short 2>/dev/null | grep -E '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$' || true
}

system_resolves() {
  local host="$1"
  dig +short "$host" A 2>/dev/null | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$'
}

set_resolve_for_host() {
  local host="$1"
  local ip
  CURL_RESOLVE_ARGS=()

  if system_resolves "$host"; then
    return 0
  fi

  while IFS= read -r ip; do
    if [[ -n "$ip" ]]; then
      CURL_RESOLVE_ARGS+=(--resolve "${host}:443:${ip}")
    fi
  done < <(auth_ips "$host")
}

curl_cmd() {
  local url="$1"
  shift
  if ((${#CURL_RESOLVE_ARGS[@]} > 0)); then
    curl -sS "${CURL_RESOLVE_ARGS[@]}" "$url" "$@"
  else
    curl -sS "$url" "$@"
  fi
}

http_ok() {
  local url="$1"
  local host="$2"
  local code
  set_resolve_for_host "$host"
  code=$(curl_cmd "$url" -o /dev/null -w "%{http_code}" --connect-timeout 15 2>/dev/null || echo "000")
  [[ "$code" == "200" ]]
}

redirects_to_primary() {
  local url="$1"
  local host="$2"
  local insecure="${3:-}"
  local loc

  set_resolve_for_host "$host"
  if [[ "$insecure" == "insecure" ]]; then
    loc=$(
      curl_cmd "$url" -sSI -k --connect-timeout 15 2>/dev/null \
        | tr -d '\r' \
        | awk -F': ' 'tolower($1)=="location"{print $2; exit}'
    )
  else
    loc=$(
      curl_cmd "$url" -sSI --connect-timeout 15 2>/dev/null \
        | tr -d '\r' \
        | awk -F': ' 'tolower($1)=="location"{print $2; exit}'
    )
  fi
  [[ "$loc" == "${PRIMARY}/" || "$loc" == "$PRIMARY" ]]
}

body_contains() {
  local url="$1"
  local host="$2"
  local needle="$3"
  local body
  set_resolve_for_host "$host"
  body=$(curl_cmd "$url" --connect-timeout 15 2>/dev/null) || return 1
  printf '%s' "$body" | grep -qF "$needle"
}

ssl_covers_host() {
  local host="$1"
  set_resolve_for_host "$host"
  if ((${#CURL_RESOLVE_ARGS[@]} == 0)); then
    set_resolve_for_host "$host"
  fi
  curl_cmd "https://${host}/" -o /dev/null --connect-timeout 15 2>/dev/null
}

echo "Verifying launch ops for $PRIMARY"
echo "---"

if system_resolves "$PRIMARY_HOST"; then
  echo "DNS: system resolver OK for $PRIMARY_HOST"
else
  auth=$(auth_ips "$PRIMARY_HOST" | tr '\n' ' ')
  if [[ -n "$auth" ]]; then
    warn "System DNS cannot resolve $PRIMARY_HOST (router cache may be stale)."
    echo "    Cloudflare DNS ($AUTH_DNS) returns: $auth"
    echo "    Tests use curl --resolve via $AUTH_DNS. Fix Mac DNS: System Settings → Network → DNS → 1.1.1.1"
  else
    echo "✗ DNS: $PRIMARY_HOST not found via system or $AUTH_DNS"
    FAIL=$((FAIL + 1))
  fi
fi
echo "---"

check "Homepage returns 200" http_ok "${PRIMARY}/" "$PRIMARY_HOST"
check "robots.txt returns 200" http_ok "${PRIMARY}/robots.txt" "$PRIMARY_HOST"
check "sitemap.xml returns 200" http_ok "${PRIMARY}/sitemap.xml" "$PRIMARY_HOST"
check "robots.txt references sitemap" body_contains "${PRIMARY}/robots.txt" "$PRIMARY_HOST" "sitemap.xml"
check "Homepage has canonical to primary" body_contains "${PRIMARY}/" "$PRIMARY_HOST" "rel=\"canonical\" href=\"${PRIMARY}/\""

if ssl_covers_host "consultdryoussef.com"; then
  check "consultdryoussef.com redirects to primary" redirects_to_primary "https://consultdryoussef.com/" "consultdryoussef.com"
else
  warn "consultdryoussef.com SSL cert not ready — checking redirect with -k (Netlify → Domain management → HTTPS)"
  check "consultdryoussef.com redirects to primary (SSL pending)" redirects_to_primary "https://consultdryoussef.com/" "consultdryoussef.com" "insecure"
fi

check "www.consultdrnader.com redirects to primary" redirects_to_primary "https://www.consultdrnader.com/" "www.consultdrnader.com"
check "drny.netlify.app redirects to primary" redirects_to_primary "https://drny.netlify.app/" "drny.netlify.app"

echo "---"
echo "Passed: $PASS  Failed: $FAIL  Warnings: $WARN"

if [[ "$FAIL" -gt 0 ]]; then
  echo "Some checks failed — see messages above."
  exit 1
fi

if [[ "$WARN" -gt 0 ]]; then
  echo "All required checks passed with warnings (DNS cache or alias SSL)."
  exit 0
fi

echo "All checks passed."

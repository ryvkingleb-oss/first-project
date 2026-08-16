#!/usr/bin/env bash
# Xiaomi TV Box S 3rd Gen (Google TV) — ADB toolkit
# Run this on a Mac/PC on the SAME Wi-Fi as the box. A cloud agent cannot
# reach the private address 192.168.10.139.
#
# Usage:
#   ./tvbox.sh connect [ip:port]
#   ./tvbox.sh pair <ip:pair_port> <code>
#   ./tvbox.sh status
#   ./tvbox.sh customize
#   ./tvbox.sh revert
#
# Defaults come from a previous pairing session on Air-Gleb:
#   IP 192.168.10.139  connect port 45811
# Wireless debugging ports CHANGE after reboot — re-read them on the TV:
#   Settings → System → Developer options → Wireless debugging

set -eu

DEFAULT_TARGET="${TVBOX_TARGET:-192.168.10.139:45811}"
PROJECTIVY_PKG="com.spocky.projengmenu"
PROJECTIVY_ACTIVITY="${PROJECTIVY_PKG}/com.spocky.projengmenu.ui.home.MainActivity"
LAUNCHERX="com.google.android.apps.tv.launcherx"
SETUPWRAITH="com.google.android.tungsten.setupwraith"
APK_CACHE_DIR="${TMPDIR:-/tmp}/xiaomi-tv-box"

cmd="${1:-}"
shift || true

die() {
  echo "ERROR: $*" >&2
  exit 1
}

need_adb() {
  if command -v adb >/dev/null 2>&1; then
    return 0
  fi
  for candidate in \
    /opt/homebrew/bin/adb \
    /usr/local/bin/adb \
    "$HOME/Library/Android/sdk/platform-tools/adb" \
    "$HOME/Android/Sdk/platform-tools/adb"; do
    if [ -x "$candidate" ]; then
      PATH="$(dirname "$candidate"):$PATH"
      export PATH
      return 0
    fi
  done
  die "adb not found. On Mac: brew install android-platform-tools"
}

target() {
  if [ -n "${1:-}" ]; then
    echo "$1"
  else
    echo "$DEFAULT_TARGET"
  fi
}

ensure_connected() {
  need_adb
  local t
  t="$(target "${1:-}")"
  adb start-server >/dev/null 2>&1 || true
  if ! adb devices | awk 'NR>1 && $2=="device" {print $1}' | grep -Fqx "$t"; then
    echo "Connecting to $t ..."
    if ! adb connect "$t"; then
      echo ""
      echo "Could not connect. Pairing may have expired, or the connect port changed."
      echo "On the TV: Developer options → Wireless debugging"
      echo "  1) Read IP and connect port, then:  $0 connect IP:PORT"
      echo "  2) If it says unauthorized / failed: Pair device with pairing code"
      echo "     then:  $0 pair IP:PAIR_PORT CODE"
      exit 1
    fi
  fi
  local state
  state="$(adb -s "$t" get-state 2>/dev/null || true)"
  [ "$state" = "device" ] || die "Device $t is not ready (state: ${state:-unknown}). Pair again if needed."
  echo "Connected: $t"
}

pkg_installed() {
  local t="$1" pkg="$2"
  adb -s "$t" shell pm path "$pkg" >/dev/null 2>&1
}

download_projectivy_apk() {
  mkdir -p "$APK_CACHE_DIR"
  local apk="$APK_CACHE_DIR/ProjectivyLauncher.apk"
  echo "Resolving latest Projectivy APK from GitHub..."
  local url
  url="$(
    python3 - <<'PY'
import json, urllib.request
req = urllib.request.Request(
    "https://api.github.com/repos/spocky/miproja1/releases/latest",
    headers={"User-Agent": "xiaomi-tv-box-toolkit"},
)
with urllib.request.urlopen(req, timeout=30) as resp:
    data = json.load(resp)
for asset in data.get("assets", []):
    name = asset.get("name") or ""
    if name.endswith(".apk"):
        print(asset["browser_download_url"])
        break
else:
    raise SystemExit("no apk asset in latest release")
PY
  )"
  [ -n "$url" ] || die "Could not find Projectivy APK on GitHub releases"
  echo "Downloading $url"
  curl -fL --retry 3 -o "$apk" "$url"
  echo "$apk"
}

do_connect() {
  ensure_connected "$(target "${1:-}")"
  adb devices -l
}

do_pair() {
  need_adb
  local pair_target="${1:-}"
  local code="${2:-}"
  [ -n "$pair_target" ] && [ -n "$code" ] || die "Usage: $0 pair IP:PAIR_PORT CODE"
  echo "Pairing $pair_target ..."
  adb pair "$pair_target" "$code"
  echo "Paired. Now connect with the *connect* port from Wireless debugging (not the pairing port):"
  echo "  $0 connect ${TVBOX_TARGET:-$DEFAULT_TARGET}"
}

do_status() {
  local t
  t="$(target "${1:-}")"
  ensure_connected "$t"
  echo "---- device ----"
  adb -s "$t" shell getprop ro.product.model
  adb -s "$t" shell getprop ro.product.manufacturer
  adb -s "$t" shell getprop ro.build.version.release
  echo "---- default launcher ----"
  adb -s "$t" shell cmd shortcut get-default-launcher || true
  echo "---- Projectivy ----"
  if pkg_installed "$t" "$PROJECTIVY_PKG"; then
    adb -s "$t" shell dumpsys package "$PROJECTIVY_PKG" | awk '/versionName=/{print; exit}'
    echo "installed: yes"
  else
    echo "installed: no"
  fi
  echo "---- launcher packages ----"
  adb -s "$t" shell pm list packages -d | grep -E 'launcherx|setupwraith|projeng' || true
  adb -s "$t" shell pm list packages | grep -E 'launcherx|setupwraith|projeng' || true
}

do_customize() {
  local t
  t="$(target "${1:-}")"
  ensure_connected "$t"

  echo "---- before ----"
  adb -s "$t" shell cmd shortcut get-default-launcher || true

  if ! pkg_installed "$t" "$PROJECTIVY_PKG"; then
    echo "Projectivy is not installed. Sideloading official GitHub APK..."
    local apk
    apk="$(download_projectivy_apk)"
    adb -s "$t" install -r "$apk"
    pkg_installed "$t" "$PROJECTIVY_PKG" || die "Projectivy install failed"
  else
    echo "Projectivy already installed"
  fi

  echo "Launching Projectivy once to verify it starts..."
  adb -s "$t" shell am start -n "$PROJECTIVY_ACTIVITY" >/dev/null
  sleep 2

  echo "Setting Projectivy as home..."
  adb -s "$t" shell cmd package set-home-activity "$PROJECTIVY_ACTIVITY"

  echo "Disabling stock Google TV launcher..."
  adb -s "$t" shell pm disable-user --user 0 "$LAUNCHERX" || true
  adb -s "$t" shell pm disable-user --user 0 "$SETUPWRAITH" || true

  echo "---- after ----"
  adb -s "$t" shell cmd shortcut get-default-launcher || true
  adb -s "$t" shell pm list packages -d | grep -E 'launcherx|setupwraith' || true
  echo ""
  echo "Done. Press Home on the remote — Projectivy should open, not Google TV ads."
  echo "To restore stock launcher:  $0 revert"
}

do_revert() {
  local t
  t="$(target "${1:-}")"
  ensure_connected "$t"
  echo "Re-enabling stock Google TV launcher..."
  adb -s "$t" shell pm enable --user 0 "$LAUNCHERX" || adb -s "$t" shell pm enable "$LAUNCHERX"
  adb -s "$t" shell pm enable --user 0 "$SETUPWRAITH" || adb -s "$t" shell pm enable "$SETUPWRAITH"
  echo "Reboot the box if Home still opens Projectivy:"
  echo "  adb -s $t reboot"
}

case "$cmd" in
  connect) do_connect "${1:-}" ;;
  pair) do_pair "${1:-}" "${2:-}" ;;
  status) do_status "${1:-}" ;;
  customize) do_customize "${1:-}" ;;
  revert) do_revert "${1:-}" ;;
  *)
    echo "Usage: $0 {connect|pair|status|customize|revert} [args]"
    echo "  connect [ip:port]           default $DEFAULT_TARGET"
    echo "  pair IP:PAIR_PORT CODE"
    echo "  status [ip:port]"
    echo "  customize [ip:port]         install Projectivy, set home, disable Google TV launcher"
    echo "  revert [ip:port]            restore Google TV launcher"
    exit 1
    ;;
esac

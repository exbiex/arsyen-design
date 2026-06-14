# Rendering Model

Universal Canvas Schema

Render Targets:
- Web Runtime
- Native Runtime

Renderer owns:
- layout
- interactions
- accessibility
- responsive rules
- performance rules

## Decision — E5: how Canvas renders inside the Flutter app (2026-06-14)

**Resolved: WebView-embed of the TS web renderer** (`@arsyen/canvas-renderer`) inside the Flutter
macOS app (WKWebView). The web renderer is the single source of truth for the look; a native
renderer is **not** built now.

**Why** (decision criteria — performance, design, look quality):
- The whole aesthetic (cinematic CSS motion, advanced web typography, the five design packs) is
  authored for the web renderer. A parallel native renderer would struggle to match it and would
  **drift** — *lower* fidelity for *double* the work.
- WebView gives **pixel-identical** output on the open web and in-app. One renderer to evolve.
- Modern WKWebView is GPU-accelerated; with motion driven imperatively (WAAPI, outside React's
  render loop — see `@arsyen/motion-engine`) scroll-narrative stays at 60fps.

**Kept open (the escape hatch):** the Canvas Schema is renderer-agnostic and the renderer is a
separable package, so a **native renderer remains possible later** if a specific experience needs
raw native perf. Revisit only with evidence.

**Implications for Phase 2 (E9, Canvas-in-Work):**
- Build a thin Flutter ↔ WebView bridge (asset-token handoff, navigation, the native Arsyen Bar
  stays native chrome around the embedded canvas).
- Publishing already serves the same renderer on the web (`@arsyen/publishing-engine`, E4), so
  web + app parity is free.

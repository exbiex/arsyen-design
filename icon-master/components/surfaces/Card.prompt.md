The base surface. `card` for content tiles, `panel` for the floating OS panels (darker, larger radius).

```jsx
<Card>…</Card>
<Card as="panel">…floating panel…</Card>
<Card interactive>…hover-lifts…</Card>
<Card glow>…selected…</Card>
```

Compose everything else inside it. `interactive` adds the hover lift used by project/artist cards; `glow` marks a selected/emphasised surface.

Data-display primitives: monospace `Tag`, semantic `StatusPill`, `Badge`, gradient-mesh `Avatar`, and the project `ProgressMeter`.

```jsx
<Tag>script</Tag>
<Tag onRemove={() => {}}>camera</Tag>

<StatusPill tone="planning">PLANNING</StatusPill>
<StatusPill tone="high">High</StatusPill>
<StatusPill tone="done">Done</StatusPill>

<Badge tone="accent">96% MATCH</Badge>

<Avatar mesh="azure" ring presence size={48} />
<Avatar src="/me.jpg" size={40} />

<ProgressMeter value={11} />
```

`StatusPill` tones: planning · medium · high · urgent · low · review · done. `Avatar` falls back to a gradient mesh (`mesh` hue) when `src` is absent; `ring` marks "you".

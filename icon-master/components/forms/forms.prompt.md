Form controls: `Input`, `Switch`, `FilterChip`, `SegmentedControl`.

```jsx
<Input label="Username or email" placeholder="renn or you@studio.com" />
<Input label="Search" icon={<SearchIcon />} placeholder="Search artists…" />

<Switch checked={on} onChange={setOn} />

<FilterChip selected>Open to crew</FilterChip>
<FilterChip>Location</FilterChip>

<SegmentedControl options={["Pure black","Living"]} value={v} onChange={setV} />
<SegmentedControl chips options={["To do","In progress","Review","Done"]} value={col} onChange={setCol} />
```

`SegmentedControl` default is an enclosed track (coral-tinted active segment); `chips` renders the ticket-field row where the active option is coral text + coral border.

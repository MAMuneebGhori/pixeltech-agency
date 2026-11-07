// WAI-ARIA tabs keyboard model: arrows move (and wrap), Home and End jump. Returns the next index, or null for other keys.
export function nextTabIndex(key, index, count) {
  const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[key];
  if (step) return (index + step + count) % count;
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  return null;
}

// onKeyDown for a role="tab" button: selects the next tab and moves focus to it (roving tabindex).
export function onTabKey(e, index, count, select) {
  const next = nextTabIndex(e.key, index, count);
  if (next === null) return;
  e.preventDefault();
  select(next);
  e.currentTarget.parentElement?.querySelectorAll('[role="tab"]')[next]?.focus();
}

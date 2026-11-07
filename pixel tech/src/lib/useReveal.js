import { useEffect, useRef } from 'react';

// Marks the element data-shown once it scrolls into view, which settles its [data-reveal] children (index.css).
// No IntersectionObserver (old browsers): shown at once, so content is never stuck hidden.
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.setAttribute('data-shown', ''); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.setAttribute('data-shown', ''); io.disconnect(); }
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

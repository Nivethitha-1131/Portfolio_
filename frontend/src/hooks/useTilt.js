import { useRef, useCallback } from 'react';

/**
 * useTilt — returns event handlers and a ref that apply a smooth
 * CSS 3-D tilt effect based on where the cursor is within the element.
 *
 * @param {{ max?: number, perspective?: number, scale?: number }} options
 *   max         — max tilt angle in degrees (default 12)
 *   perspective — CSS perspective in px   (default 800)
 *   scale       — scale on hover          (default 1.02)
 */
export function useTilt({ max = 12, perspective = 800, scale = 1.02 } = {}) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;   // cursor X relative to card
    const y = e.clientY - rect.top;    // cursor Y relative to card
    const cx = rect.width  / 2;
    const cy = rect.height / 2;

    // Normalise to -1 … +1
    const nx = (x - cx) / cx;
    const ny = (y - cy) / cy;

    // rotateY tilts left/right; rotateX tilts up/down (inverted)
    const rotateY =  nx * max;
    const rotateX = -ny * max;

    el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale},${scale},${scale})`;
  }, [max, perspective, scale]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)';
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    // Reset transition so the live tilt feels instant again
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 500);
  }, []);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.15s ease-out';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 150);
  }, []);

  return {
    ref,
    onMouseMove:  handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
  };
}

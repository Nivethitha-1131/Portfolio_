import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Returns a ref and a boolean indicating whether the element is in view.
 * Triggers once — never resets after the element has been seen.
 *
 * @param {{ margin?: string }} options
 * @returns {{ ref: React.RefObject, inView: boolean }}
 */
export function useScrollReveal({ margin = '0px 0px -80px 0px' } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return { ref, inView };
}

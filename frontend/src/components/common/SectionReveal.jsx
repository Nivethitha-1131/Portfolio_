import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
      delay: i * 0.08,
    },
  }),
};

/**
 * SectionReveal — wraps children with a scroll-triggered stagger reveal.
 *
 * @param {{ children: React.ReactNode, className?: string }} props
 */
export default function SectionReveal({ children, className = '' }) {
  const { ref, inView } = useScrollReveal();

  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={ITEM_VARIANTS}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

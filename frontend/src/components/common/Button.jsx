/**
 * Button — reusable CTA button.
 *
 * Variants:
 *   primary — gold hairline border, subtle gold glow on hover
 *   ghost   — no border, underline hover
 *
 * @param {{
 *   children: React.ReactNode,
 *   variant?: 'primary' | 'ghost',
 *   size?: 'sm' | 'md',
 *   href?: string,
 *   onClick?: () => void,
 *   className?: string,
 *   type?: string,
 * }} props
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
}) {
  const base =
    'inline-flex items-center justify-center font-sans font-medium tracking-widest uppercase transition-all duration-250 ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-3';

  const sizes = {
    sm: 'text-[10px] px-5 py-2.5',
    md: 'text-[11px] px-7 py-3.5',
  };

  const variants = {
    primary: `
      border border-gold text-gold bg-transparent
      hover:bg-gold/5
      hover:shadow-[0_0_16px_0_rgba(201,162,75,0.25)]
    `,
    ghost: `
      border border-transparent text-cream
      hover:text-gold hover:border-hairline
    `,
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

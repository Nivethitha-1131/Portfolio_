import { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * SkillPill — minimal pill with an optional icon + label for the Skills section.
 * Automatically adapts the icon color to the current light/dark theme.
 * If the icon fails to load, it's hidden gracefully (no broken placeholder).
 *
 * @param {{ label: string, icon?: string }} props
 */
export default function SkillPill({ label, icon }) {
  const [iconVisible, setIconVisible] = useState(true);
  const { theme } = useTheme();

  // Reset visibility when theme changes
  useEffect(() => {
    setIconVisible(true);
  }, [theme, icon]);

  // Adapt icon color dynamically: dark burgundy for light theme, warm cream for dark theme
  const iconColor = theme === 'light' ? '24191A' : 'F7F1E8';
  let iconSrc = null;
  if (icon) {
    iconSrc = icon.startsWith('http')
      ? icon.replace(/\/[a-fA-F0-9]{3,6}$/, `/${iconColor}`)
      : `https://cdn.simpleicons.org/${icon}/${iconColor}`;
  }

  return (
    <span
      className="
        group inline-flex items-center gap-1.5 sm:gap-2
        text-[10px] sm:text-[11px] font-medium tracking-wide text-slate
        border border-hairline rounded-sm px-3 py-1.5 sm:px-4 sm:py-2
        transition-all duration-200
        hover:border-gold/60 hover:text-gold cursor-default
        select-none
      "
    >
      {iconSrc && iconVisible && (
        <img
          key={iconSrc}
          src={iconSrc}
          alt=""
          aria-hidden="true"
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200"
          loading="lazy"
          onError={() => setIconVisible(false)}
        />
      )}
      {label}
    </span>
  );
}

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Consumes ThemeContext.
 * @returns {{ theme: 'dark' | 'light', toggle: () => void }}
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

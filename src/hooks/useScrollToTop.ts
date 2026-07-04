import { useEffect } from 'react';

/**
 * Scroll to top of page smoothly when dependency changes
 * Works on: desktop browsers, mobile browsers, Capacitor Android
 */
export function useScrollToTop(dependencies: any[] = []) {
  useEffect(() => {
    const scrollToTop = () => {
      // Try multiple scroll targets for compatibility
      const targets = [
        document.documentElement, // Most browsers
        document.body,            // Fallback
        window,                   // Capacitor apps
      ];

      targets.forEach(target => {
        // Use scrollIntoView for better mobile support
        if (target === window) {
          target.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        } else if (target.scrollTo) {
          target.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      });

      // Instant scroll as backup for non-supporting browsers
      if (typeof window !== 'undefined') {
        try {
          window.scrollTo(0, 0);
        } catch (e) {
          // Silent fail on restricted contexts
        }
      }
    };

    // Small delay to ensure DOM is painted
    const timeout = setTimeout(scrollToTop, 0);
    return () => clearTimeout(timeout);
  }, dependencies);
}

/**
 * Alternative: ScrollToTop component (place at top of your page content)
 */
export function ScrollToTop() {
  useScrollToTop();
  return null;
}

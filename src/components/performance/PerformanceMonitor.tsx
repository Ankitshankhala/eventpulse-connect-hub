
import { useEffect } from 'react';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Web Vitals monitoring
    const observePerformance = () => {
      // Core Web Vitals
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            // Cast to PerformanceEventTiming to access processingStart
            const eventEntry = entry as PerformanceEventTiming;
            console.log('FID:', eventEntry.processingStart - eventEntry.startTime);
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          console.log('CLS:', clsValue);
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      }

      // Navigation timing
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart);
          console.log('DOMContentLoaded:', navigation.domContentLoadedEventEnd - navigation.fetchStart);
          console.log('Time to Interactive:', navigation.domInteractive - navigation.fetchStart);
        }
      }
    };

    // Run performance monitoring after page load
    if (document.readyState === 'complete') {
      observePerformance();
    } else {
      window.addEventListener('load', observePerformance);
    }

    return () => {
      window.removeEventListener('load', observePerformance);
    };
  }, []);

  return null;
};

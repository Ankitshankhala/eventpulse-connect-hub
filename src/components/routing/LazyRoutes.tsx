
import { lazy, Suspense } from 'react';
import { PageLoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

// Lazy load pages with better chunking
export const LazyDiscover = lazy(() => 
  import('@/pages/Discover').then(module => ({ default: module.default }))
);
export const LazyAnalytics = lazy(() => 
  import('@/pages/Analytics').then(module => ({ default: module.default }))
);
export const LazyAbout = lazy(() => 
  import('@/pages/About').then(module => ({ default: module.default }))
);
export const LazyTerms = lazy(() => 
  import('@/pages/Terms').then(module => ({ default: module.default }))
);
export const LazyPrivacy = lazy(() => 
  import('@/pages/Privacy').then(module => ({ default: module.default }))
);
export const LazyContact = lazy(() => 
  import('@/pages/Contact').then(module => ({ default: module.default }))
);
export const LazyNotFound = lazy(() => 
  import('@/pages/NotFound').then(module => ({ default: module.default }))
);

// Enhanced wrapper component with error boundary
interface LazyRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazyRoute = ({ children, fallback }: LazyRouteProps) => (
  <ErrorBoundary>
    <Suspense fallback={fallback || <PageLoadingSpinner />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

// Preload utility for better UX
export const preloadRoute = (routeImport: () => Promise<any>) => {
  // Preload on hover or focus for better perceived performance
  const link = document.createElement('link');
  link.rel = 'modulepreload';
  link.href = routeImport.toString();
  document.head.appendChild(link);
};

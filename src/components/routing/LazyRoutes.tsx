
import { lazy, Suspense } from 'react';
import { PageLoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy load pages
export const LazyDiscover = lazy(() => import('@/pages/Discover'));
export const LazyAnalytics = lazy(() => import('@/pages/Analytics'));
export const LazyAbout = lazy(() => import('@/pages/About'));
export const LazyTerms = lazy(() => import('@/pages/Terms'));
export const LazyPrivacy = lazy(() => import('@/pages/Privacy'));
export const LazyContact = lazy(() => import('@/pages/Contact'));
export const LazyNotFound = lazy(() => import('@/pages/NotFound'));

// Wrapper component for lazy routes
interface LazyRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazyRoute = ({ children, fallback }: LazyRouteProps) => (
  <Suspense fallback={fallback || <PageLoadingSpinner />}>
    {children}
  </Suspense>
);

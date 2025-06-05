
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/navigation/NavBar";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import { PerformanceMonitor } from "./components/performance/PerformanceMonitor";
import { SEOHead } from "./components/seo/SEOHead";
import { LazyRoute, LazyDiscover, LazyAnalytics, LazyAbout, LazyTerms, LazyPrivacy, LazyContact, LazyNotFound } from "./components/routing/LazyRoutes";
import { useAuth } from "./hooks/useAuth";
import Index from "./pages/Index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && 'status' in error && typeof error.status === 'number') {
          return error.status >= 500 && failureCount < 2;
        }
        return failureCount < 2;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false, // Reduce unnecessary requests
    },
    mutations: {
      retry: 1,
    },
  },
});

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Only show NavBar when user is not logged in */}
      {!user && (
        <ErrorBoundary>
          <NavBar />
        </ErrorBoundary>
      )}
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={
            <LazyRoute>
              <LazyDiscover />
            </LazyRoute>
          } />
          <Route path="/analytics" element={
            <LazyRoute>
              <LazyAnalytics />
            </LazyRoute>
          } />
          <Route path="/about" element={
            <LazyRoute>
              <LazyAbout />
            </LazyRoute>
          } />
          <Route path="/terms" element={
            <LazyRoute>
              <LazyTerms />
            </LazyRoute>
          } />
          <Route path="/privacy" element={
            <LazyRoute>
              <LazyPrivacy />
            </LazyRoute>
          } />
          <Route path="/contact" element={
            <LazyRoute>
              <LazyContact />
            </LazyRoute>
          } />
          <Route path="*" element={
            <LazyRoute>
              <LazyNotFound />
            </LazyRoute>
          } />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <PerformanceMonitor />
          <SEOHead />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

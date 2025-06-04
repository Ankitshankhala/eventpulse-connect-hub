
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseErrorHandlerReturn {
  error: Error | null;
  isError: boolean;
  handleError: (error: Error, customMessage?: string) => void;
  clearError: () => void;
  retry: () => void;
}

export const useErrorHandler = (onRetry?: () => void): UseErrorHandlerReturn => {
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const handleError = useCallback((error: Error, customMessage?: string) => {
    console.error('Error caught by useErrorHandler:', error);
    setError(error);
    
    const message = customMessage || getErrorMessage(error);
    toast({
      title: "Something went wrong",
      description: message,
      variant: "destructive"
    });
  }, [toast]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const retry = useCallback(() => {
    clearError();
    if (onRetry) {
      onRetry();
    }
  }, [clearError, onRetry]);

  return {
    error,
    isError: !!error,
    handleError,
    clearError,
    retry
  };
};

const getErrorMessage = (error: Error): string => {
  if (error.message.includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  }
  if (error.message.includes('auth')) {
    return 'Authentication error. Please log in again.';
  }
  if (error.message.includes('permission')) {
    return 'You don\'t have permission to perform this action.';
  }
  return error.message || 'An unexpected error occurred.';
};

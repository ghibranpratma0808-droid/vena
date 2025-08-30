import { useState, useCallback } from 'react';
import { crudOperations } from '../lib/crud-operations';

export const useDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    onSuccess?: (result: T) => void,
    onError?: (error: Error) => void
  ): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await operation();
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error.message);
      
      if (onError) {
        onError(error);
      } else {
        console.error('Database operation failed:', error);
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Generic CRUD operations
  const create = useCallback((entity: string, data: any) => {
    return executeOperation(() => (crudOperations as any)[entity].create(data));
  }, [executeOperation]);

  const update = useCallback((entity: string, id: string, data: any) => {
    return executeOperation(() => (crudOperations as any)[entity].update(id, data));
  }, [executeOperation]);

  const remove = useCallback((entity: string, id: string) => {
    return executeOperation(() => (crudOperations as any)[entity].delete(id));
  }, [executeOperation]);

  return {
    isLoading,
    error,
    create,
    update,
    remove,
    executeOperation,
    clearError: () => setError(null),
  };
};
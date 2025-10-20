import { useCallback, useState } from 'react';
import type { DefenseSubmissionRequest, DefenseSubmissionResponse } from '../../shared/types/api';

export const useDefenseSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitDefense = useCallback(async (caseId: string, defenseText: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const request: DefenseSubmissionRequest = {
        caseId,
        defenseText,
      };

      const res = await fetch('/api/submit-defense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data: DefenseSubmissionResponse = await res.json();
      
      if (data.type !== 'defense_submitted') {
        throw new Error('Unexpected response type');
      }

      return data.success;
    } catch (err) {
      console.error('Failed to submit defense', err);
      setError(err instanceof Error ? err.message : 'Failed to submit defense');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    submitDefense,
    loading,
    error,
  } as const;
};

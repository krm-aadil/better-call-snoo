import { useCallback, useEffect, useState } from 'react';

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error';

type RealTimeUpdatesHook = {
  connectionStatus: ConnectionStatus;
  lastUpdateTime: number | null;
  isPolling: boolean;
  startPolling: () => void;
  stopPolling: () => void;
  forceUpdate: () => Promise<void>;
};

export const useRealTimeUpdates = (
  updateFunction: () => Promise<void>,
  intervalMs: number = 2000
): RealTimeUpdatesHook => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const [lastUpdateTime, setLastUpdateTime] = useState<number | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const executeUpdate = useCallback(async () => {
    try {
      setConnectionStatus('connecting');
      await updateFunction();
      setConnectionStatus('connected');
      setLastUpdateTime(Date.now());
    } catch (error) {
      console.warn('Real-time update failed:', error);
      setConnectionStatus('error');
    }
  }, [updateFunction]);

  const startPolling = useCallback(() => {
    if (intervalId) return; // Already polling

    setIsPolling(true);
    
    // Execute immediately
    executeUpdate();

    // Set up interval
    const id = setInterval(executeUpdate, intervalMs);
    setIntervalId(id);
  }, [executeUpdate, intervalMs, intervalId]);

  const stopPolling = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsPolling(false);
    setConnectionStatus('disconnected');
  }, [intervalId]);

  const forceUpdate = useCallback(async () => {
    await executeUpdate();
  }, [executeUpdate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return {
    connectionStatus,
    lastUpdateTime,
    isPolling,
    startPolling,
    stopPolling,
    forceUpdate,
  };
};

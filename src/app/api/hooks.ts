import { useState, useEffect } from 'react';
import { apiClient } from './client';
import { useSettings } from '../context/SettingsContext';

export function useData(endpoint: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { settings } = useSettings();
  const realTimeUpdates = settings["Real-time Updates"];

  const fetchData = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const result = await apiClient.get(endpoint);
      setData(result);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    let intervalId: any;
    if (realTimeUpdates) {
      intervalId = setInterval(() => {
        fetchData(false); // background fetch, don't set loading to true
      }, 30000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [endpoint, realTimeUpdates]);

  return { data, loading, error, refetch: fetchData };
}

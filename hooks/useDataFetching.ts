import { useEffect, useState } from 'react';

export const useFetchData = <T>(
  path: string | null,
  summary: string,
  options?: RequestInit
): { data: T | null; loading: boolean; error: string | null } => {

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!path) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
            'accept': 'application/json',
          },
          ...options,
        });

        if (!res.ok) {
          console.error(`Failed to fetch ${summary} data: ${res.statusText}`);
          setError(`Error fetching ${summary}: ${res.statusText}`);
          return;
        }

        const result: T = await res.json();
        setData(result);

      } catch (err) {
        console.error(`Error while fetching ${summary} data:`, err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [path, summary, options]);

  return { data, loading, error };
}

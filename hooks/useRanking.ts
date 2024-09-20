import { useEffect, useState } from 'react';

import { RankType, RankListType } from '@/types/home/rank';

export const useRanking = ({ seasonID, mode }: { seasonID: number, mode: number }) => {
  const [ranking, setRanking] = useState<RankType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      if (seasonID === 0) {
        setError("Invalid season ID");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/rank/top/${seasonID}/${mode}`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
            'accept': 'application/json',
          }
        });

        if (!res.ok) {
          console.error('Failed to fetch Ranking data');
          setError(`Error: ${res.statusText}`);
          return;
        }

        const data: RankListType = await res.json();

        if (!data.topRanks || data.topRanks.length === 0) {
          setError("No ranking data available");
          return;
        }

        setRanking(data.topRanks.slice(0, 10));
      } catch (err) {
        console.error(err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
        setError(null);
      }
    };

    fetchRanking();
  }, [mode, seasonID]);

  return { ranking, loading, error };
};

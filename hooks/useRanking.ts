import { useEffect, useState } from 'react';

export interface RankType {
  userNum: number;
  nickname: string;
  rank: number;
  mmr: number;

}
export interface RankingType {
  topRanks: RankType[];
}

export const useRanking = ({ seasonID, mode }: { seasonID: number, mode: number }) => {
  const [ranking, setRanking] = useState<RankType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/rank/top/${seasonID}/${mode}`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
            'accept': 'application/json'
          }
        });

        if (!res.ok) {
          console.error('Failed to fetch Ranking data');
          return null;
        }

        const data: RankingType = await res.json();

        setRanking(data.topRanks.slice(0, 10));
      } catch (err) {
        console.error(err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, [mode, seasonID]);

  return { ranking, loading, error };
}
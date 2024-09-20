'use client';

import { useSeason } from '@/app/(home)/components/context/SeasonContext';
import { UserNumState } from '@/types/user/info';
import type { UserStat } from '@/types/user/stat';
import { useEffect, useState } from 'react';

interface UserStatProps {
  userNumState: UserNumState;
}

export default function UserStat({ userNumState }: UserStatProps) {
  const { season } = useSeason();
  const [userStat, setUserStat] = useState<UserStat | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserStat = async () => {
      setLoading(true);
      try {
        console.log(season, userNumState.userNum)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/stats/${userNumState.userNum?.userNum}/${season?.seasonID}`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
            'accept': 'application/json',
          }
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        setUserStat(data.userStats[0]); // typo fixed

      } catch (err) {
        console.error(err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (userNumState.userNum?.userNum) {
      fetchUserStat();
    }
  }, [season, userNumState.userNum]);

  if (loading) return <p>Loading User Stats...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User Stats for {userStat?.nickname}</h2>
      {/* UserStat 정보를 적절하게 렌더링 */}
      <pre>{JSON.stringify(userStat, null, 2)}</pre>
    </div>
  );
}

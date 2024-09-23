
import { useEffect, useState } from 'react';
import { UserNum, UserNumState } from '@/types/user/info';

export const useUserNum = (nickname: string): UserNumState => {
  const [userNum, setUserNum] = useState<UserNum | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/nickname?query=${nickname}`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
            'accept': 'application/json',
          }
        });

        if (!res.ok) {
          setError(`Error: ${res.statusText}`);
          return;
        }
        const data = await res.json();

        if (data && data.user) {
          setUserNum({ user: { userNum: data.user.userNum, nickname: data.user.nickname } });
        } else {
          setError('유저 데이터를 찾을 수 없습니다.');
        }

      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [nickname]);

  return { userNum, loading, error };
};
import { useEffect, useState } from 'react';

export const useCharacterInfo = (characterCode: number) => {
  const [characterInfo, setCharacterInfo] = useState<{ code: number; name: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/data/Character`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
            'accept': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Error fetching character data: ${res.statusText}`);
        }

        const data = await res.json();

        // 캐릭터 코드에 맞는 캐릭터 정보 찾기
        const character = data.data.find((char: { code: number; name: string }) => char.code === characterCode);

        if (character) {
          setCharacterInfo({ code: character.code, name: character.name }); // 캐릭터 코드와 이름 저장
        } else {
          setCharacterInfo(null); // 캐릭터가 없을 경우 null
        }

      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterData();
  }, [characterCode]);

  return { characterInfo, loading, error };
};

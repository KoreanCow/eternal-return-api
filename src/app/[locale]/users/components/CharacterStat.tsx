import type { CharacterStat } from '@/types/user/stat';
import styles from '../[nickname]/nickname.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CharacterInfo {
  code: number;
  name: string;
}

interface CharacterStatProps {
  characterStat: CharacterStat[];
}

export default function CharacterStat({ characterStat }: CharacterStatProps) {
  const [characterInfos, setCharacterInfos] = useState<(CharacterInfo | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/data/Character`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
            'accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching character data: ${response.statusText}`);
        }

        const data = await response.json();
        const infos = characterStat.map(stat => {
          const character = data.data.find((char: CharacterInfo) => char.code === stat.characterCode);
          return character ? { code: character.code, name: character.name } : null;
        });

        setCharacterInfos(infos);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterData();
  }, [characterStat]);

  if (loading) return <p>Loading character stats...</p>;
  if (error) return <p>Error fetching character stats: {error}</p>;

  return (
    <div className={styles.character}>
      {characterStat.map((stat, index) => {
        const characterInfo = characterInfos[index];

        return (
          <div key={stat.characterCode} className={styles.character_item}>
            {characterInfo && characterInfo.name && (
              <Image
                src={`/images/characters/${characterInfo.name}.png`}
                alt='character img'
                width={100}
                height={100}
              />
            )}
            <p>Character Code: {stat.characterCode}</p>
            <p>{characterInfo?.name}</p>
            <p>Total Games: {stat.totalGames}</p>
            <p>Usages: {stat.usages}</p>
            <p>Max Killings: {stat.maxKillings}</p>
            <p>Top 3: {stat.top3}</p>
            <p>Wins: {stat.wins}</p>
            <p>Top 3 Rate: {stat.top3Rate}</p>
            <p>Average Rank: {stat.averageRank}</p>
          </div>
        );
      })}
    </div>
  );
}

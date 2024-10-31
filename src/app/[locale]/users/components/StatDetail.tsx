import React from 'react'
import type { CharacterStat } from '@/types/user/stat'
import { useTranslations } from 'next-intl';
import { useCharacter } from '../../../../../hooks/useCharacter';
import Image from 'next/image';

interface StatDetailProps {
  stat: CharacterStat;
}

export default function StatDetail({ stat }: StatDetailProps) {
  const t = useTranslations('UserPage');
  const { characterInfo, loading, error } = useCharacter(stat.characterCode);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading character info: {error}</p>;

  return (
    <>
      <Image
        src={`/images/characters/${characterInfo?.name}.png`}
        alt='character img'
        width={80}
        height={80}
      />
      <p>{characterInfo?.name}</p>
      <p>{t('Top3')}: {stat.top3}</p>
      <p>{t('CharacterCode')}: {stat.characterCode}</p>
      <p>{t('Usages')}: {stat.usages}</p>
      <p>{t('MaxKillings')}: {stat.maxKillings}</p>
      <p>{t('CharacterWins')}: {stat.wins}</p>
    </>
  )
}

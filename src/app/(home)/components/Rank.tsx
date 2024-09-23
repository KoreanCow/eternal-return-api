'use client';
import styles from '@/app/page.module.scss';
import { useRouter } from 'next/navigation';

import { RankListType } from '@/types/home/rank';

import { useSeason } from './context/SeasonContext';
import { useFetchData } from '../../../../hooks/useDataFetching';

export default function Rank() {
  const { season } = useSeason();
  const { data: ranking, loading, error } = useFetchData<RankListType>(
    `v1/rank/top/${season?.seasonID || 0}/3`,
    'Ranking'
  );

  const router = useRouter();

  if (!season) {
    return <p className={styles.season}>Loading...</p>;
  }
  const onRankerClick = async (nickname: string) => {
    const trimNickname = nickname.trim();
    if (trimNickname !== '') {
      router.push(`/users/${trimNickname}`);
    }
  };

  return (
    <div className={styles.season}>
      <div className={styles.seasonInfo}>
        <h1>Current Season: {season.seasonName}</h1>
        <h2>{season.seasonStart} - {season.seasonEnd}</h2>
        <h3>Season ID: {season.seasonID}</h3>
      </div>
      <div className={styles.rank}>
        {loading && <p>Loading rankings...</p>}
        {error && <p>Error loading rankings: {error}</p>}
        {ranking?.topRanks?.length === 0 && !loading && <p>No rankings available</p>}
        {ranking?.topRanks?.map((rank) => (
          <div key={rank.userNum} className={styles.rankItem}>
            <h4>Rank: {rank.rank}</h4>
            <p onClick={() => onRankerClick(rank.nickname)}>Nickname: {rank.nickname}</p>
            <p>MMR: {rank.mmr}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
'use client';
import styles from '@/app/page.module.scss';

import { useSeason } from './context/SeasonContext';
import { useRanking } from '../../../../hooks/useRanking';

export default function Rank() {
  const { season } = useSeason();
  const { ranking, loading, error } = useRanking({ seasonID: season?.seasonID || 0, mode: 3 });

  if (!season) {
    return <p className={styles.season}>Loading...</p>;
  }

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
        {ranking.length === 0 && !loading && <p>No rankings available</p>}
        {ranking.map((rank) => (
          <div key={rank.userNum} className={styles.rankItem}>
            <h4>Rank: {rank.rank}</h4>
            <p>Nickname: {rank.nickname}</p>
            <p>MMR: {rank.mmr}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

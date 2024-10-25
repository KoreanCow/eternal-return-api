import styles from '../[nickname]/nickname.module.scss'

import { UserNum } from '@/types/user/info';
import { useFetchData } from '../../../../../hooks/useDataFetching';
import { UserStats } from '@/types/user/stat';
import { userTier } from '../../../../../utils/userTier';
import CharacterStat from './CharacterStat';
import { useTranslations } from 'next-intl';

interface UserStatProps {
  userNum: UserNum | null;
  seasonID: number | null;
}

export default function UserStat({ userNum, seasonID }: UserStatProps) {
  const t = useTranslations('UserPage');
  const fetchPath = userNum && seasonID ? `v1/user/stats/${userNum.user.userNum}/${seasonID}` : '';

  const { data: userStat, loading, error } = useFetchData<UserStats>(
    fetchPath,
    'userStat'
  )
  const stats = userStat?.userStats[0];
  const { tier, grade, rp } = userTier(stats?.mmr || 0, stats?.rank || 0);

  const statValues = [
    {
      label: t('Tier'), value: stats ? (<>{`${tier} ${grade} ${rp}RP`}<br />{`${stats.rank}th (${((stats.rank / stats.rankSize) * 100).toFixed(2)}%)`}</>) : "Can't Find Tiers"
    },
    { label: t('TotalGames'), value: stats?.totalGames },
    { label: t('TotalWins'), value: stats?.totalWins },
    { label: t('WinningPercentage'), value: stats?.totalGames ? (stats.totalWins / stats.totalGames * 100).toFixed(2) + '%' : '0%' },
    { label: t('Top2'), value: stats?.top2 },
    { label: t('Top3'), value: stats?.top3 },
    { label: t('AverageRank'), value: stats?.averageRank },
    { label: t('AverageKills'), value: stats?.averageKills },
    { label: t('AverageAssistants'), value: stats?.averageAssistants },

  ];
  if (loading) return <p>Loading User Info...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!userStat) {
    return <p>No user data available.</p>
  }
  // 
  return (
    <div className={styles.stat}>
      <h1 className={styles.summary}>{t('UserAverage')}</h1>
      <div className={styles.average}>
        {statValues.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <p>{stat.label}</p>
            <span>{stat.value}</span>
          </div>
        ))}
      </div>
      <h1 className={styles.summary}>{t('CharacterStat')}</h1>
      <CharacterStat characterStat={stats!.characterStats} />
    </div>
  )
}

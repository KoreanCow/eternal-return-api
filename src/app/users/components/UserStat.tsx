import styles from '../[nickname]/nickname.module.scss'

import { UserNum } from '@/types/user/info';
import { useFetchData } from '../../../../hooks/useDataFetching';
import { UserStats } from '@/types/user/stat';
import { userTier } from '../../../../utils/userTier';
import CharacterStat from './CharacterStat';

interface UserStatProps {
  userNum: UserNum | null;
  seasonID: number | null;
}

export default function UserStat({ userNum, seasonID }: UserStatProps) {
  const fetchPath = userNum && seasonID ? `v1/user/stats/${userNum.user.userNum}/${seasonID}` : '';

  const { data: userStat, loading, error } = useFetchData<UserStats>(
    fetchPath,
    'userStat'
  )
  const stats = userStat?.userStats[0];
  const { tier, grade, rp } = userTier(stats?.mmr || 0, stats?.rank || 0);

  const statValues = [
    {
      label: 'Tier', value: stats ? (<>{`${tier} ${grade} ${rp}RP`}<br />{`${stats.rank}th (${((stats.rank / stats.rankSize) * 100).toFixed(2)}%)`}</>) : "Can't Find Tiers"
    },
    { label: 'Total Games', value: stats?.totalGames },
    { label: 'Total Wins', value: stats?.totalWins },
    { label: 'Winning Percentage', value: stats?.totalGames ? (stats.totalWins / stats.totalGames * 100).toFixed(2) + '%' : '0%' },
    { label: 'Top 2', value: stats?.top2 },
    { label: 'Top 3', value: stats?.top3 },
    { label: 'Average Rank', value: stats?.averageRank },
    { label: 'Average Kills', value: stats?.averageKills },
    { label: 'Average Assistants', value: stats?.averageAssistants },

  ];
  if (loading) return <p>Loading User Info...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!userStat) {
    return <p>No user data available.</p>
  }
  // 
  return (
    <div className={styles.stat}>
      <h1 className={styles.summary}>User Average</h1>
      <div className={styles.average}>
        {statValues.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <p>{stat.label}</p>
            <span>{stat.value}</span>
          </div>
        ))}
      </div>
      <h1 className={styles.summary}>Character Stat</h1>
      <CharacterStat characterStat={stats!.characterStats} />
    </div>
  )
}

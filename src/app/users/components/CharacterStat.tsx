import type { CharacterStat } from '@/types/user/stat';
import styles from '../[nickname]/nickname.module.scss'

interface CharacterStatProps {
  characterStat: CharacterStat[];
}

export default function CharacterStat({ characterStat }: CharacterStatProps) {

  console.log(characterStat);
  return (
    <div className={styles.character}>
      {characterStat.map(stat => (
        <div key={stat.characterCode}>
          <p>Character Code: {stat.characterCode}</p>
          <p>Total Games: {stat.totalGames}</p>
          <p>Usages: {stat.usages}</p>
          <p>Max Killings: {stat.maxKillings}</p>
          <p>Top 3: {stat.top3}</p>
          <p>Wins: {stat.wins}</p>
          <p>Top 3 Rate: {stat.top3Rate}</p>
          <p>Average Rank: {stat.averageRank}</p>
        </div>
      ))}
    </div>
  )
}
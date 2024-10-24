import type { CharacterStat } from '@/types/user/stat';
import styles from '../[nickname]/nickname.module.scss'
import { useCharacterInfo } from '../../../../../hooks/useCharacter';
import Image from 'next/image';
interface CharacterStatProps {
  characterStat: CharacterStat[];
}


export default function CharacterStat({ characterStat }: CharacterStatProps) {

  return (
    <div className={styles.character}>
      {characterStat.map(stat => (
        <div key={stat.characterCode} className={styles.character_item}>
          <Image
            src={`/images/characters/${useCharacterInfo(stat.characterCode).characterInfo?.name}.png`}
            alt='character img'
            width={100}
            height={100}
          />
          <p>Character Code: {stat.characterCode}</p>
          <p>{useCharacterInfo(stat.characterCode).characterInfo?.name}</p>
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
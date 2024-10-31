import type { CharacterStat } from '@/types/user/stat';
import styles from '../[nickname]/nickname.module.scss';
import StatDetail from './StatDetail';

interface CharacterStatProps {
  characterStat: CharacterStat[];
}

export default function CharacterStat({ characterStat }: CharacterStatProps) {
  return (
    <div className={styles.character}>
      {characterStat.map((stat) => {
        return (
          <div key={stat.characterCode} className={styles.character_item}>
            <StatDetail stat={stat} />
          </div>
        );
      })}
    </div>
  );
}

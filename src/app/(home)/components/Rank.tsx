'use client';
import styles from '@/app/page.module.scss'

import { useSeason } from './context/SeasonContext';

export default function Rank() {
  const { season } = useSeason();

  if (!season) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.rank}>
      <h1>Current Season : {season.seasonName}</h1>
      <h2>Season ID : {season.seasonID}</h2>
    </div>
  )
}

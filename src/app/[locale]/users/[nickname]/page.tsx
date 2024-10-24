'use client';
import styles from './nickname.module.scss'

import { useRouter } from 'next/navigation';
import { UserNum } from '@/types/user/info';
import { useFetchData } from '../../../../../hooks/useDataFetching';
import { useSeason } from '@/app/[locale]/(home)/components/context/SeasonContext';

import UserInfo from '../components/UserInfo';
import UserStat from '../components/UserStat';
import { useEffect, useRef, useState } from 'react';
import UserMatchResult from '../components/UserMatchResult';

export default function UserPage({ params }: { params: { nickname: string } }) {
  const { season } = useSeason();
  const [toggleOpen, setToggleOpen] = useState<boolean>(false);

  const router = useRouter();
  const decodedNickname = decodeURI(params.nickname);

  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
        setToggleOpen(false);
      }
    }

    if (toggleOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);

    }
  }, [toggleOpen])

  const { data: userNum, loading, error } = useFetchData<UserNum>(
    `v1/user/nickname?query=${decodedNickname}`,
    'userNum',
  )
  return (
    <div className={styles.body}>
      <div className={styles.toggle}>
        <p className={styles.toggle_btn} onClick={() => router.push('/')}>Back Space</p>
        <p className={styles.toggle_btn} onClick={() => setToggleOpen(!toggleOpen)}>Match Result</p>

      </div>

      <UserInfo userNum={userNum} loading={loading} error={error} />
      <UserStat userNum={userNum} seasonID={season?.seasonID ?? null} />
      <UserMatchResult userNum={userNum} ref={toggleRef} isOpen={toggleOpen} onClose={() => setToggleOpen(false)} />
    </div>
  );
}
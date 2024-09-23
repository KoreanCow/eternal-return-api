'use client';
import styles from './nickname.module.scss'

import { useRouter } from 'next/navigation';
import { UserNum } from '@/types/user/info';
import { useFetchData } from '../../../../hooks/useDataFetching';
import { useSeason } from '@/app/(home)/components/context/SeasonContext';

import UserInfo from '../components/UserInfo';
import UserStat from '../components/UserStat';

export default function UserPage({ params }: { params: { nickname: string } }) {
  const router = useRouter();
  const { season } = useSeason();
  const decodedNickname = decodeURI(params.nickname);
  const { data: userNum, loading, error } = useFetchData<UserNum>(
    `v1/user/nickname?query=${decodedNickname}`,
    'userNum',
  )
  return (
    <div className={styles.body}>
      <p className={styles.home} onClick={() => router.push('/')}>Back Space</p>

      <UserInfo userNum={userNum} loading={loading} error={error} />
      <UserStat userNum={userNum} seasonID={season?.seasonID ?? null} />
    </div>
  );
}
'use client';
import { UserNum } from '@/types/user/info';

import styles from '../[nickname]/nickname.module.scss'
interface UserInfoProps {
  userNum: UserNum | null;
  loading: boolean;
  error: string | null;
}

export default function UserInfo({ userNum, loading, error }: UserInfoProps) {
  if (loading) return <p>Loading User Info...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!userNum || !userNum.user) {
    return <p>No user data available.</p>;
  }

  return (
    <div className={styles.info}>
      <h2>User Page for {userNum.user.nickname}</h2>
      <h2>User Num: {userNum.user.userNum}</h2>
    </div>
  );
}

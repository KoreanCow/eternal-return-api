'use client';

import { useRouter } from 'next/navigation';
import { UserNumState } from '@/types/user/info';
interface UserInfoProps {
  userNumState: UserNumState
}

export default function UserInfo({ userNumState }: UserInfoProps) {
  const router = useRouter();

  const { userNum, loading, error } = userNumState;

  if (loading) return <p>Loading User Info...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <div>
      <p onClick={() => router.push('/')}>Back Space</p>
      <h2>User Page for {userNum?.nickname}</h2>
      <h2>User Num: {userNum?.userNum}</h2>
    </div>
  );
}

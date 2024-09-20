'use client';

import { UserNumState } from '@/types/user/info';
import { useUserNum } from '../../../../hooks/useUserNum';
import UserInfo from '../components/UserInfo';
import UserStat from '../components/UserStat';
export default function UserPage({ params }: { params: { nickname: string } }) {
  const decodedNickname = decodeURI(params.nickname);
  const userNumState: UserNumState = useUserNum(decodedNickname);


  return (
    <>
      <h1>User Info</h1>

      <UserInfo userNumState={userNumState} />
      <UserStat userNumState={userNumState} />
    </>
  );
}
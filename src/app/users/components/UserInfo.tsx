'use client';

import { useRouter } from 'next/navigation';
interface UserInfoProps {
  userInfo: {
    code: number;
    message: string;
    user: {
      userNum: number;
      nickname: string;
    }
  };
}
export default function UserInfo({ userInfo }: UserInfoProps) {
  const router = useRouter();

  return (
    <div>
      <p onClick={() => router.push('/')}>Back Space</p>
      <h1>User Page for {userInfo.user.nickname}</h1>
      <h1>User Num : {userInfo.user.userNum}</h1>
    </div>
  )
}
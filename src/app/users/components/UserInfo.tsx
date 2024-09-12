'use client';

import { useRouter } from 'next/navigation';

interface UserNumProps {
  userNum: {
    userNum: number;
    nickname: string;
  };
}

export default function UserInfo({ userNum }: UserNumProps) {
  const router = useRouter();

  return (
    <div>
      <p onClick={() => router.push('/')}>Back Space</p>
      <h1>User Page for {userNum.nickname}</h1>
      <h1>User Num: {userNum.userNum}</h1>
    </div>
  );
}

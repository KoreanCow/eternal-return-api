'use client';

import { useUserNum } from '../../../../hooks/useUserNum';
import UserInfo from '../components/UserInfo';

export default function UserPage({ params }: { params: { nickname: string } }) {
  const decodedNickname = decodeURI(params.nickname);
  const { userData, loading, error } = useUserNum(decodedNickname);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!userData) return <p>User not found</p>; // userData가 null일 때 처리

  return (
    <>
      <UserInfo userNum={userData} /> {/* userData가 null이 아님을 보장 */}
    </>
  );
}

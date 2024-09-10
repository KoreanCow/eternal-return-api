import UserInfo from '../components/UserInfo';

export default async function UserPage({ params, }: { params: { nickname: string } }) {

  const decodedNickname = decodeURI(params.nickname);



  async function getUserNum(nickname: string) {
    const res = await fetch(`${process.env.API_URL}/v1/user/nickname?query=${nickname}`, {
      headers: {
        'x-api-key': process.env.API_KEY || '',
        'accept': 'application/json',
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch UserInfo:', res.statusText);
      return null;
    }

    const data = await res.json();
    return data;
  }

  const userInfo = await getUserNum(decodedNickname);
  return (
    <>
      <UserInfo userInfo={userInfo} />
    </>

  )
}
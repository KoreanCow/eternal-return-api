export default function UserPage({
  params,
}: {
  params: { nickname: string }
}) {

  const decodedNickname = decodeURI(params.nickname);

  return (

    <h1>
      User Page for {decodedNickname}
    </h1>
  )
}
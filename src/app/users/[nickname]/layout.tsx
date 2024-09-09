import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: { params: { nickname: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const decodedNickname = decodeURI(params.nickname);
  return {
    title: `${decodedNickname}'s Profile`,
    description: `Profile page for user: ${decodedNickname}`
  }
}

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  )
}